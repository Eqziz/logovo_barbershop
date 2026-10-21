import os
import re

js_dir = 'js'
files = [f for f in os.listdir(js_dir) if f.endswith('.js')]
print(f"Auditing JS files: {files}")

errors = []
for fname in files:
    path = os.path.join(js_dir, fname)
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    content = "".join(lines)
    if "'use strict';" not in content and '"use strict";' not in content:
        errors.append(f"{fname}: Missing 'use strict';")
    
    for i, line in enumerate(lines, 1):
        clean = re.sub(r'//.*', '', line)
        if re.search(r'\bvar\b', clean):
            errors.append(f"{fname}:{i} Uses 'var': {line.strip()}")
        # Check loose equality
        if re.search(r'[^!=]==[^=]', clean):
            errors.append(f"{fname}:{i} Uses loose '==': {line.strip()}")
        if re.search(r'[^!]!=[^=]', clean):
            errors.append(f"{fname}:{i} Uses loose '!=': {line.strip()}")
        if 'document.write' in clean:
            errors.append(f"{fname}:{i} Uses document.write: {line.strip()}")
        if 'innerHTML' in clean:
            errors.append(f"{fname}:{i} Uses innerHTML: {line.strip()}")

print("-" * 50)
if not errors:
    print("SUCCESS: 0 errors found in all JS files!")
else:
    for e in errors:
        print("ERROR:", e)
print("-" * 50)

