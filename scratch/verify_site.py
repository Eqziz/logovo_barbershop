import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
print(f"Checking HTML files: {html_files}")

all_ids = {}
for h in html_files:
    with open(h, 'r', encoding='utf-8') as f:
        content = f.read()
    ids = set(re.findall(r'id=["\']([^"\']+)["\']', content))
    all_ids[h] = ids

dead_links = []
hash_links = []
script_errors = []

for h in html_files:
    with open(h, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check script tags
    scripts = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', content)
    for s in scripts:
        if s.startswith('http'):
            continue
        if not os.path.exists(s):
            script_errors.append(f"{h}: Missing script '{s}'")

    # Check links
    links = re.findall(r'<a[^>]+href=["\']([^"\']+)["\']', content)
    for l in links:
        if l == '#':
            hash_links.append(f"{h}: Contains href='#'")
        elif l.startswith('#'):
            target_id = l[1:]
            if target_id not in all_ids[h]:
                dead_links.append(f"{h}: Anchor '{l}' not found in {h}")
        elif not l.startswith('http') and not l.startswith('tel:') and not l.startswith('mailto:'):
            parts = l.split('#')
            target_file = parts[0]
            if not os.path.exists(target_file):
                dead_links.append(f"{h}: Target file '{target_file}' does not exist")
            elif len(parts) > 1 and parts[1]:
                target_id = parts[1]
                if target_id not in all_ids.get(target_file, set()):
                    dead_links.append(f"{h}: Anchor '{parts[1]}' not found in {target_file}")

print(f"Script Errors: {len(script_errors)}")
for s in script_errors:
    print(" ", s)

print(f"Href='#' Placeholders: {len(hash_links)}")
for hl in hash_links:
    print(" ", hl)

print(f"Dead Anchor Links: {len(dead_links)}")
for dl in dead_links:
    print(" ", dl)

if not script_errors and not hash_links and not dead_links:
    print("SITE INTEGRITY VERIFIED: 0 broken links, 0 broken scripts, 0 placeholder hashes!")
