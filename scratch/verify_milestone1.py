import os
import re
from bs4 import BeautifulSoup

def test_milestone1():
    print("==================================================")
    print("RUNNING COMPREHENSIVE MILESTONE 1 VERIFICATION")
    print("==================================================")

    html_files = ['index.html', 'services.html', 'barbers.html', 'marketbar.html', 'careers.html', 'feedback.html']
    errors = []

    # 1. Check all 6 HTML files for Header Auth Container & Modal
    for f in html_files:
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()
            soup = BeautifulSoup(content, 'html.parser')

            # Header auth container
            auth_container = soup.find(id='header-auth-container')
            if not auth_container:
                errors.append(f"{f}: Missing #header-auth-container")
            
            # Modal
            modal = soup.find(id='login-profile-modal')
            if not modal:
                errors.append(f"{f}: Missing #login-profile-modal")
            else:
                for req_id in ['modal-view-login', 'modal-view-profile', 'form-modal-login', 'modal-input-name', 'modal-input-phone', 'modal-input-email', 'btn-modal-save-login', 'btn-modal-action-logout', 'modal-profile-display-name']:
                    if not modal.find(id=req_id):
                        errors.append(f"{f}: Missing #{req_id} inside #login-profile-modal")

    # 2. Check services.html for collapsible voucher toggle bar
    with open('services.html', 'r', encoding='utf-8') as fp:
        soup = BeautifulSoup(fp.read(), 'html.parser')
        toggle_bar = soup.find(id='booking-voucher-toggle-bar')
        if not toggle_bar:
            errors.append("services.html: Missing #booking-voucher-toggle-bar")
        wrapper = soup.find(id='booking-confirmation-wrapper')
        if not wrapper or not wrapper.find(id='booking-voucher-toggle-bar'):
            errors.append("services.html: #booking-voucher-toggle-bar must be inside #booking-confirmation-wrapper")

    # 3. Check marketbar.html for stacking container
    with open('marketbar.html', 'r', encoding='utf-8') as fp:
        soup = BeautifulSoup(fp.read(), 'html.parser')
        stack = soup.find(id='order-vouchers-stack')
        if not stack:
            errors.append("marketbar.html: Missing #order-vouchers-stack")
        wrapper = soup.find(id='order-confirmation-wrapper')
        if not wrapper or not wrapper.find(id='order-vouchers-stack'):
            errors.append("marketbar.html: #order-vouchers-stack must be inside #order-confirmation-wrapper")

    # 4. Check index.html for active reservations section below hero
    with open('index.html', 'r', encoding='utf-8') as fp:
        content = fp.read()
        soup = BeautifulSoup(content, 'html.parser')
        active_sec = soup.find(id='active-reservations-section')
        if not active_sec:
            errors.append("index.html: Missing #active-reservations-section")
        hero_sec = soup.find(id='hero-section')
        if not hero_sec:
            errors.append("index.html: Missing #hero-section")
        # Ensure active_sec is after hero_sec
        hero_pos = content.find('id="hero-section"')
        active_pos = content.find('id="active-reservations-section"')
        if active_pos < hero_pos:
            errors.append("index.html: #active-reservations-section must be positioned below #hero-section")

    # 5. Check feedback.html for anonymous toggle
    with open('feedback.html', 'r', encoding='utf-8') as fp:
        soup = BeautifulSoup(fp.read(), 'html.parser')
        anon_toggle = soup.find(id='fb-anonymous-toggle')
        if not anon_toggle:
            errors.append("feedback.html: Missing #fb-anonymous-toggle")
        client_fs = soup.find(id='fb-fieldset-client')
        if not client_fs or not client_fs.find(id='fb-anonymous-toggle'):
            errors.append("feedback.html: #fb-anonymous-toggle must be inside #fb-fieldset-client")
        client_row = soup.find(id='fb-client-fields-row')
        if not client_row:
            errors.append("feedback.html: Missing #fb-client-fields-row")

    # 6. Check css/custom.css for required classes
    with open('css/custom.css', 'r', encoding='utf-8') as fp:
        css = fp.read()
        for cls in ['.voucher-toggle-bar', '.voucher-toggle-arrow', '.active-status-badge-card', '.active-badge-header', '.active-badge-details', '.logovo-modal-content']:
            if cls not in css:
                errors.append(f"css/custom.css: Missing style class {cls}")

    # 7. Check plain JS vs jQuery separation
    plain_js_files = ['main.js', 'barbers.js', 'marketbar.js']
    for pjf in plain_js_files:
        with open(os.path.join('js', pjf), 'r', encoding='utf-8') as fp:
            for idx, line in enumerate(fp, 1):
                clean = re.sub(r'//.*', '', line)
                if '$(' in clean or 'jQuery(' in clean:
                    errors.append(f"js/{pjf}:{idx}: Prohibited jQuery usage in Plain JS module")

    # 8. Check js/main.js exports and functions
    with open('js/main.js', 'r', encoding='utf-8') as fp:
        main_js = fp.read()
        for func in ['getBookings', 'saveBooking', 'getOrders', 'saveOrder', 'getUserProfile', 'setUserProfile', 'clearUserProfile', 'syncSessionUI', 'autofillForms', 'clearAutofilledForms', 'initHomePageActiveBadges']:
            if func not in main_js:
                errors.append(f"js/main.js: Missing function {func}")

    # 9. Check js/services.js for saveBooking call
    with open('js/services.js', 'r', encoding='utf-8') as fp:
        serv_js = fp.read()
        if 'saveBooking' not in serv_js:
            errors.append("js/services.js: Missing saveBooking integration")
        if 'booking-voucher-toggle-bar' not in serv_js:
            errors.append("js/services.js: Missing #booking-voucher-toggle-bar handling")

    # 10. Check js/marketbar.js for saveOrder and stacking
    with open('js/marketbar.js', 'r', encoding='utf-8') as fp:
        mkt_js = fp.read()
        if 'saveOrder' not in mkt_js:
            errors.append("js/marketbar.js: Missing saveOrder integration")
        if 'order-vouchers-stack' not in mkt_js:
            errors.append("js/marketbar.js: Missing #order-vouchers-stack handling")

    # 11. Check js/feedback.js for anonymous toggle handling
    with open('js/feedback.js', 'r', encoding='utf-8') as fp:
        fb_js = fp.read()
        if 'fb-anonymous-toggle' not in fb_js:
            errors.append("js/feedback.js: Missing #fb-anonymous-toggle handling")
        if 'Anonymous Guest' not in fb_js:
            errors.append("js/feedback.js: Missing 'Anonymous Guest' author handling")

    if errors:
        print(f"FAILED: {len(errors)} errors found:")
        for e in errors:
            print("  -", e)
        return False
    else:
        print("SUCCESS: All 11 Milestone 1 verification criteria passed flawlessly!")
        return True

if __name__ == '__main__':
    ok = test_milestone1()
    exit(0 if ok else 1)
