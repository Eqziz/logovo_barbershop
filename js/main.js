/**
 * Logovo Barbershop Astana — Shared Main Script
 * WEB Technologies 1 — Endterm Project (Plain JavaScript Shared Core: Weeks 6–8)
 * Responsible Student: Nodir Muhammedov (Team Lead)
 * Assigned Pages: index.html, services.html
 */
'use strict';

// Shared Global Namespace for Logovo Utilities
window.Logovo = (function () {
    /**
     * Formats an integer amount into localized Kazakhstani Tenge string
     * @param {number} amount - Price amount in KZT
     * @returns {string} Formatted price string (e.g. "7 000 KZT")
     */
    function formatPrice(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '0 KZT';
        }
        return amount.toLocaleString('ru-RU') + ' KZT';
    }

    /**
     * Formats duration in minutes into a clean display string
     * @param {number} minutes - Duration in minutes
     * @returns {string} Formatted duration (e.g. "50 min")
     */
    function formatDuration(minutes) {
        if (typeof minutes !== 'number' || minutes <= 0) {
            return '0 min';
        }
        return minutes + ' min';
    }

    /**
     * Generates a unique demonstration voucher / ticket reference code
     * Uses Math.random() meaningfully for simulated customer tokens
     * @param {string} prefix - 3-letter uppercase prefix (e.g. 'BK', 'RES', 'INQ', 'QA')
     * @returns {string} Reference code (e.g. "LGV-2026-BK-481")
     */
    function generateReference(prefix) {
        const cleanPrefix = typeof prefix === 'string' && prefix.trim().length > 0 ? prefix.trim().toUpperCase() : 'DEMO';
        const randomToken = Math.floor(100 + Math.random() * 900); // 3-digit random number between 100 and 999
        return 'LGV-2026-' + cleanPrefix + '-' + randomToken;
    }

    /**
     * Trims and sanitizes input strings safely
     * @param {string} text - User input string
     * @returns {string} Trimmed text
     */
    function sanitize(text) {
        if (typeof text !== 'string') {
            return '';
        }
        return text.trim();
    }

    /**
     * Validates telephone number format for Kazakhstan (+7...)
     * @param {string} phone - Input phone number
     * @returns {boolean} True if phone format is valid
     */
    function isValidPhone(phone) {
        const cleaned = sanitize(phone).replace(/[\s\-\(\)]/g, '');
        // Must start with +7 or 8 and contain 11 digits
        const phoneRegex = /^(\+7|8|7)7\d{9}$/;
        return phoneRegex.test(cleaned);
    }

    /**
     * Validates email address format
     * @param {string} email - Input email string
     * @returns {boolean} True if email is valid
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(sanitize(email));
    }

    /**
     * Sets specific field-level error state with accessible inline message
     * Supports both native DOM elements and jQuery collections seamlessly
     * @param {HTMLElement|Object} inputElement - Form input/select/textarea element
     * @param {string} message - Error description
     */
    function setFieldError(inputElement, message) {
        const el = inputElement && inputElement.jquery ? inputElement[0] : inputElement;
        if (!el) return;
        
        el.classList.add('is-error');
        el.setAttribute('aria-invalid', 'true');

        // Check if an error message element already exists
        const parent = el.parentElement;
        if (!parent) return;

        let errorMsg = parent.querySelector('.field-error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'field-error-message text-error small mt-1';
            errorMsg.setAttribute('role', 'alert');
            el.after(errorMsg);
        }
        errorMsg.textContent = message;
        errorMsg.classList.remove('is-hidden');
    }

    /**
     * Clears all field errors from a given form container
     * Supports both native HTMLFormElement and jQuery form collections
     * @param {HTMLFormElement|Object} formElement - Form DOM element
     */
    function clearFormErrors(formElement) {
        const formEl = formElement && formElement.jquery ? formElement[0] : formElement;
        if (!formEl) return;

        const errorInputs = formEl.querySelectorAll('.is-error');
        for (let i = 0; i < errorInputs.length; i++) {
            errorInputs[i].classList.remove('is-error');
            errorInputs[i].removeAttribute('aria-invalid');
        }

        const errorMessages = formEl.querySelectorAll('.field-error-message');
        for (let j = 0; j < errorMessages.length; j++) {
            errorMessages[j].remove();
        }

        // Hide summary error container if present
        const summaryError = formEl.parentElement ? formEl.parentElement.querySelector('.alert-error-box') : null;
        if (summaryError) {
            summaryError.classList.add('is-hidden');
            summaryError.textContent = '';
        }
    }

    /**
     * Sets active state on the matching navigation item using pure DOM traversal
     */
    function syncNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('#navbar-nav-list .nav-link');
        
        for (let i = 0; i < navLinks.length; i++) {
            const link = navLinks[i];
            const href = link.getAttribute('href');
            if (href && currentPath.endsWith(href)) {
                for (let j = 0; j < navLinks.length; j++) {
                    navLinks[j].classList.remove('active', 'text-gold', 'fw-semibold');
                    navLinks[j].classList.add('text-light');
                    navLinks[j].removeAttribute('aria-current');
                }
                link.classList.add('active', 'text-gold', 'fw-semibold');
                link.classList.remove('text-light');
                link.setAttribute('aria-current', 'page');
            }
        }
    }

    /**
     * Injects an accessible site-wide demonstration notice bar via DOM construction
     * Reaffirms that this is a simulated academic project
     */
    function setupDemonstrationNotice() {
        const footer = document.getElementById('site-footer');
        if (!footer) return;

        const noticeContainer = document.createElement('div');
        noticeContainer.className = 'demo-site-notice bg-dark border border-secondary border-opacity-25 rounded p-2 mb-3 text-center small text-secondary';
        
        const badge = document.createElement('span');
        badge.className = 'badge bg-gold text-dark me-2 text-uppercase';
        badge.textContent = 'Academic Demo';
        
        const text = document.createElement('span');
        text.textContent = 'Logovo Barbershop is a student front-end simulation. No real bookings or financial transactions are processed.';
        
        noticeContainer.appendChild(badge);
        noticeContainer.appendChild(text);

        const container = footer.querySelector('.container');
        if (container) {
            container.insertBefore(noticeContainer, container.firstChild);
        }
    }

    /**
     * Enhances floating call button with keyboard and feedback interactions
     */
    function setupFloatingCallButton() {
        const callBtn = document.getElementById('btn-floating-call');
        if (!callBtn) return;

        callBtn.addEventListener('click', function (event) {
            console.log('[Logovo Interaction] Direct phone call initiated to +7 (701) 218-19-19');
        });
    }

    // =========================================================================
    // Storage & Session Management
    // =========================================================================
    const STORAGE_KEYS = {
        BOOKINGS: 'logovo_bookings',
        ORDERS: 'logovo_orders',
        PROFILE: 'logovo_user_profile'
    };

    /**
     * Retrieves all saved bookings from localStorage
     * @returns {Array} Array of booking objects
     */
    function getBookings() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
            if (!raw) return [];
            const data = JSON.parse(raw);
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.warn('[Logovo Storage] Failed reading bookings:', e);
            return [];
        }
    }

    /**
     * Persists a booking object into localStorage
     * @param {Object} booking - Booking details object
     * @returns {boolean} True on success
     */
    function saveBooking(booking) {
        try {
            const bookings = getBookings();
            bookings.push(booking);
            localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
            return true;
        } catch (e) {
            console.warn('[Logovo Storage] Failed saving booking:', e);
            return false;
        }
    }

    /**
     * Retrieves all saved orders from localStorage
     * @returns {Array} Array of order objects
     */
    function getOrders() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
            if (!raw) return [];
            const data = JSON.parse(raw);
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.warn('[Logovo Storage] Failed reading orders:', e);
            return [];
        }
    }

    /**
     * Persists an order object into localStorage
     * @param {Object} order - Order details object
     * @returns {boolean} True on success
     */
    function saveOrder(order) {
        try {
            const orders = getOrders();
            orders.push(order);
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
            return true;
        } catch (e) {
            console.warn('[Logovo Storage] Failed saving order:', e);
            return false;
        }
    }

    /**
     * Retrieves active user profile from localStorage
     * @returns {Object|null} User profile or null
     */
    function getUserProfile() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
            if (!raw) return null;
            const data = JSON.parse(raw);
            if (data && typeof data === 'object' && data.loggedIn === true) {
                return data;
            }
            return null;
        } catch (e) {
            console.warn('[Logovo Session] Failed reading user profile:', e);
            return null;
        }
    }

    /**
     * Saves user profile into localStorage and marks loggedIn: true
     * @param {Object} profile - User profile data (name, phone, email)
     * @returns {boolean} True on success
     */
    function setUserProfile(profile) {
        try {
            if (!profile) {
                localStorage.removeItem(STORAGE_KEYS.PROFILE);
                return true;
            }
            const payload = {
                name: sanitize(profile.name || ''),
                phone: sanitize(profile.phone || ''),
                email: sanitize(profile.email || ''),
                loggedIn: true,
                loginTimestamp: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(payload));
            return true;
        } catch (e) {
            console.warn('[Logovo Session] Failed saving user profile:', e);
            return false;
        }
    }

    /**
     * Clears active user profile from localStorage
     * @returns {boolean} True on success
     */
    function clearUserProfile() {
        try {
            localStorage.removeItem(STORAGE_KEYS.PROFILE);
            return true;
        } catch (e) {
            console.warn('[Logovo Session] Failed clearing user profile:', e);
            return false;
        }
    }

    /**
     * Synchronizes header authentication widget UI
     */
    function syncSessionUI() {
        const authContainer = document.getElementById('header-auth-container');
        if (!authContainer) return;

        while (authContainer.firstChild) {
            authContainer.removeChild(authContainer.firstChild);
        }

        const profile = getUserProfile();

        if (profile && profile.loggedIn) {
            // Logged-in profile trigger button
            const profileBtn = document.createElement('button');
            profileBtn.type = 'button';
            profileBtn.className = 'btn btn-outline-gold btn-sm d-inline-flex align-items-center gap-1';
            profileBtn.id = 'btn-header-profile';
            profileBtn.setAttribute('data-bs-toggle', 'modal');
            profileBtn.setAttribute('data-bs-target', '#login-profile-modal');
            profileBtn.setAttribute('title', 'View Member Profile');

            const iconSpan = document.createElement('span');
            iconSpan.textContent = '👤';
            iconSpan.setAttribute('aria-hidden', 'true');
            profileBtn.appendChild(iconSpan);

            const nameSpan = document.createElement('span');
            nameSpan.className = 'd-none d-sm-inline';
            nameSpan.textContent = profile.name;
            profileBtn.appendChild(nameSpan);

            // Log out button
            const logoutBtn = document.createElement('button');
            logoutBtn.type = 'button';
            logoutBtn.className = 'btn btn-outline-secondary btn-sm ms-2';
            logoutBtn.id = 'btn-header-logout';
            logoutBtn.setAttribute('title', 'Log Out of Club Session');
            logoutBtn.textContent = 'Log Out';
            logoutBtn.addEventListener('click', function () {
                clearUserProfile();
                clearAutofilledForms();
                syncSessionUI();
                updateModalViews();
            });

            authContainer.appendChild(profileBtn);
            authContainer.appendChild(logoutBtn);
        } else {
            // Logged-out login trigger button
            const loginBtn = document.createElement('button');
            loginBtn.type = 'button';
            loginBtn.className = 'btn btn-outline-gold btn-sm';
            loginBtn.id = 'btn-header-login';
            loginBtn.setAttribute('data-bs-toggle', 'modal');
            loginBtn.setAttribute('data-bs-target', '#login-profile-modal');
            loginBtn.textContent = 'Log In / Profile';
            authContainer.appendChild(loginBtn);
        }
    }

    /**
     * Updates modal view visibility and values based on current session
     */
    function updateModalViews() {
        const loginView = document.getElementById('modal-view-login');
        const profileView = document.getElementById('modal-view-profile');
        if (!loginView || !profileView) return;

        const profile = getUserProfile();

        if (profile && profile.loggedIn) {
            loginView.classList.add('is-hidden');
            profileView.classList.remove('is-hidden');

            const nameEl = document.getElementById('modal-profile-display-name');
            const phoneEl = document.getElementById('modal-profile-display-phone');
            const emailEl = document.getElementById('modal-profile-display-email');

            if (nameEl) nameEl.textContent = profile.name;
            if (phoneEl) phoneEl.textContent = profile.phone;
            if (emailEl) emailEl.textContent = profile.email;
        } else {
            profileView.classList.add('is-hidden');
            loginView.classList.remove('is-hidden');

            const nameInput = document.getElementById('modal-input-name');
            const phoneInput = document.getElementById('modal-input-phone');
            const emailInput = document.getElementById('modal-input-email');
            const errorBox = document.getElementById('modal-login-error');

            if (nameInput) nameInput.value = '';
            if (phoneInput) phoneInput.value = '';
            if (emailInput) emailInput.value = '';
            if (errorBox) {
                errorBox.classList.add('is-hidden');
                errorBox.textContent = '';
            }
        }
    }

    /**
     * Dismisses the login/profile modal safely
     */
    function closeLoginModal() {
        const modalEl = document.getElementById('login-profile-modal');
        if (!modalEl) return;

        if (window.bootstrap && window.bootstrap.Modal) {
            const instance = window.bootstrap.Modal.getInstance(modalEl);
            if (instance) {
                instance.hide();
                return;
            }
        }
        const closeBtn = modalEl.querySelector('[data-bs-dismiss="modal"]');
        if (closeBtn) {
            closeBtn.click();
        }
    }

    /**
     * Pre-populates customer input fields with stored user profile data
     */
    function autofillForms() {
        const profile = getUserProfile();
        if (!profile || !profile.loggedIn) return;

        // Services booking form
        const bookingName = document.getElementById('booking-name-input');
        const bookingPhone = document.getElementById('booking-phone-input');
        const bookingEmail = document.getElementById('booking-email-input');
        if (bookingName && !bookingName.value) bookingName.value = profile.name;
        if (bookingPhone && !bookingPhone.value) bookingPhone.value = profile.phone;
        if (bookingEmail && !bookingEmail.value) bookingEmail.value = profile.email;

        // MarketBar order form
        const orderName = document.getElementById('order-name-input');
        const orderPhone = document.getElementById('order-phone-input');
        const orderEmail = document.getElementById('order-email-input');
        if (orderName && !orderName.value) orderName.value = profile.name;
        if (orderPhone && !orderPhone.value) orderPhone.value = profile.phone;
        if (orderEmail && !orderEmail.value) orderEmail.value = profile.email;

        // Feedback form (only if anonymous toggle is not checked)
        const fbAnonToggle = document.getElementById('fb-anonymous-toggle');
        const isAnon = fbAnonToggle && fbAnonToggle.checked;
        if (!isAnon) {
            const fbName = document.getElementById('fb-name-input');
            const fbPhone = document.getElementById('fb-phone-input');
            const fbEmail = document.getElementById('fb-email-input');
            if (fbName && !fbName.value) fbName.value = profile.name;
            if (fbPhone && !fbPhone.value) fbPhone.value = profile.phone;
            if (fbEmail && !fbEmail.value) fbEmail.value = profile.email;
        }

        // Careers application form
        const candName = document.getElementById('cand-name-input');
        const candPhone = document.getElementById('cand-phone-input');
        const candEmail = document.getElementById('cand-email-input');
        if (candName && !candName.value) candName.value = profile.name;
        if (candPhone && !candPhone.value) candPhone.value = profile.phone;
        if (candEmail && !candEmail.value) candEmail.value = profile.email;

        // Barbers consultation inquiry form
        const inqName = document.getElementById('inquiry-name-input');
        const inqContact = document.getElementById('inquiry-contact-input');
        if (inqName && !inqName.value) inqName.value = profile.name;
        if (inqContact && !inqContact.value) inqContact.value = profile.phone || profile.email;
    }

    /**
     * Clears autofilled customer input fields upon logout
     */
    function clearAutofilledForms() {
        const fields = [
            'booking-name-input', 'booking-phone-input', 'booking-email-input',
            'order-name-input', 'order-phone-input', 'order-email-input',
            'fb-name-input', 'fb-phone-input', 'fb-email-input',
            'cand-name-input', 'cand-phone-input', 'cand-email-input',
            'inquiry-name-input', 'inquiry-contact-input'
        ];

        for (let i = 0; i < fields.length; i++) {
            const el = document.getElementById(fields[i]);
            if (el) {
                el.value = '';
            }
        }
    }

    /**
     * Initializes session event listeners and modal bindings
     */
    function initSessionModal() {
        const modalEl = document.getElementById('login-profile-modal');
        const loginForm = document.getElementById('form-modal-login');
        const modalLogoutBtn = document.getElementById('btn-modal-action-logout');

        if (modalEl) {
            modalEl.addEventListener('show.bs.modal', function () {
                updateModalViews();
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const nameInput = document.getElementById('modal-input-name');
                const phoneInput = document.getElementById('modal-input-phone');
                const emailInput = document.getElementById('modal-input-email');
                const errorBox = document.getElementById('modal-login-error');

                const nameVal = sanitize(nameInput ? nameInput.value : '');
                const phoneVal = sanitize(phoneInput ? phoneInput.value : '');
                const emailVal = sanitize(emailInput ? emailInput.value : '');

                if (nameVal.length < 3) {
                    if (errorBox) {
                        errorBox.textContent = 'Full name must contain at least 3 characters.';
                        errorBox.classList.remove('is-hidden');
                    }
                    if (nameInput) nameInput.focus();
                    return;
                }

                if (!isValidPhone(phoneVal)) {
                    if (errorBox) {
                        errorBox.textContent = 'Please enter a valid Kazakhstan telephone number (+7...).';
                        errorBox.classList.remove('is-hidden');
                    }
                    if (phoneInput) phoneInput.focus();
                    return;
                }

                if (!isValidEmail(emailVal)) {
                    if (errorBox) {
                        errorBox.textContent = 'Please enter a valid email address.';
                        errorBox.classList.remove('is-hidden');
                    }
                    if (emailInput) emailInput.focus();
                    return;
                }

                if (errorBox) {
                    errorBox.classList.add('is-hidden');
                    errorBox.textContent = '';
                }

                setUserProfile({
                    name: nameVal,
                    phone: phoneVal,
                    email: emailVal
                });

                syncSessionUI();
                updateModalViews();
                autofillForms();
                closeLoginModal();
            });
        }

        if (modalLogoutBtn) {
            modalLogoutBtn.addEventListener('click', function () {
                clearUserProfile();
                clearAutofilledForms();
                syncSessionUI();
                updateModalViews();
                closeLoginModal();
            });
        }
    }

    /**
     * Initializes active reservations and orders badges on index.html (R2)
     */
    function initHomePageActiveBadges() {
        const section = document.getElementById('active-reservations-section');
        if (!section) return;

        const countBadge = document.getElementById('active-items-count-badge');
        const listContainer = document.getElementById('active-reservations-list');
        if (!listContainer) return;

        const bookings = getBookings();
        const orders = getOrders();
        const totalCount = bookings.length + orders.length;

        if (totalCount === 0) {
            section.classList.add('is-hidden');
            return;
        }

        section.classList.remove('is-hidden');
        if (countBadge) {
            countBadge.textContent = totalCount + ' Active Reservation' + (totalCount === 1 ? '' : 's');
        }

        while (listContainer.firstChild) {
            listContainer.removeChild(listContainer.firstChild);
        }

        // Render Active Bookings
        for (let i = 0; i < bookings.length; i++) {
            const b = bookings[i];

            const card = document.createElement('div');
            card.className = 'active-status-badge-card shadow-sm';
            card.id = 'active-booking-badge-' + (b.id || i);

            // Collapsible Header Bar
            const header = document.createElement('div');
            header.className = 'active-badge-header';
            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
            header.setAttribute('aria-expanded', 'false');

            const leftBox = document.createElement('div');
            leftBox.className = 'd-flex align-items-center gap-2 flex-wrap';

            const badge = document.createElement('span');
            badge.className = 'badge bg-gold text-dark';
            badge.textContent = 'Chair Reservation';
            leftBox.appendChild(badge);

            const title = document.createElement('strong');
            title.className = 'text-light';
            title.textContent = (b.id || 'LGV-BK') + ' — ' + (b.serviceName || 'Service');
            leftBox.appendChild(title);

            const meta = document.createElement('span');
            meta.className = 'text-secondary small';
            meta.textContent = '(' + (b.formattedDate || '') + ' at ' + (b.timeSlot || '') + ' • ' + (b.formattedPrice || '') + ')';
            leftBox.appendChild(meta);

            const rightBox = document.createElement('div');
            rightBox.className = 'd-flex align-items-center gap-2';

            const statusSpan = document.createElement('span');
            statusSpan.className = 'status-badge-confirmed d-none d-sm-inline';
            statusSpan.textContent = 'Confirmed';
            rightBox.appendChild(statusSpan);

            const toggleLabel = document.createElement('span');
            toggleLabel.className = 'text-secondary small d-none d-md-inline';
            toggleLabel.textContent = 'View Details';
            rightBox.appendChild(toggleLabel);

            const arrow = document.createElement('span');
            arrow.className = 'voucher-toggle-arrow';
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '▼';
            rightBox.appendChild(arrow);

            header.appendChild(leftBox);
            header.appendChild(rightBox);

            // Details Body Container
            const detailsBody = document.createElement('div');
            detailsBody.className = 'active-badge-details is-hidden';

            const grid = document.createElement('div');
            grid.className = 'row g-3 small mb-3';

            const col1 = document.createElement('div');
            col1.className = 'col-12 col-md-4';
            const s1 = document.createElement('span');
            s1.className = 'text-secondary d-block';
            s1.textContent = 'Service & Master:';
            const d1 = document.createElement('strong');
            d1.className = 'text-light';
            d1.textContent = (b.serviceName || '') + ' (' + (b.barberName || 'Any Master') + ')';
            col1.appendChild(s1);
            col1.appendChild(d1);

            const col2 = document.createElement('div');
            col2.className = 'col-12 col-md-4';
            const s2 = document.createElement('span');
            s2.className = 'text-secondary d-block';
            s2.textContent = 'Branch & Appointment:';
            const d2 = document.createElement('strong');
            d2.className = 'text-light';
            d2.textContent = (b.branchName || '') + ' • ' + (b.formattedDate || '') + ' ' + (b.timeSlot || '');
            col2.appendChild(s2);
            col2.appendChild(d2);

            const col3 = document.createElement('div');
            col3.className = 'col-12 col-md-4';
            const s3 = document.createElement('span');
            s3.className = 'text-secondary d-block';
            s3.textContent = 'Amount Due:';
            const d3 = document.createElement('strong');
            d3.className = 'text-gold fs-6';
            d3.textContent = b.formattedPrice || '0 KZT';
            col3.appendChild(s3);
            col3.appendChild(d3);

            grid.appendChild(col1);
            grid.appendChild(col2);
            grid.appendChild(col3);
            detailsBody.appendChild(grid);

            const notice = document.createElement('div');
            notice.className = 'text-secondary small border-top border-secondary border-opacity-25 pt-2';
            notice.textContent = '* Please present code ' + (b.id || '') + ' at reception. Fresh espresso is reserved in your name.';
            detailsBody.appendChild(notice);

            // Toggle Handler
            function toggleBookingCard() {
                const isCollapsed = detailsBody.classList.contains('is-hidden');
                if (isCollapsed) {
                    detailsBody.classList.remove('is-hidden');
                    arrow.textContent = '▲';
                    toggleLabel.textContent = 'Hide Details';
                    header.setAttribute('aria-expanded', 'true');
                } else {
                    detailsBody.classList.add('is-hidden');
                    arrow.textContent = '▼';
                    toggleLabel.textContent = 'View Details';
                    header.setAttribute('aria-expanded', 'false');
                }
            }

            header.addEventListener('click', toggleBookingCard);
            header.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleBookingCard();
                }
            });

            card.appendChild(header);
            card.appendChild(detailsBody);
            listContainer.appendChild(card);
        }

        // Render Active Market Orders
        for (let j = 0; j < orders.length; j++) {
            const o = orders[j];

            const card = document.createElement('div');
            card.className = 'active-status-badge-card shadow-sm';
            card.id = 'active-order-badge-' + (o.id || j);

            // Collapsible Header Bar
            const header = document.createElement('div');
            header.className = 'active-badge-header';
            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
            header.setAttribute('aria-expanded', 'false');

            const leftBox = document.createElement('div');
            leftBox.className = 'd-flex align-items-center gap-2 flex-wrap';

            const badge = document.createElement('span');
            badge.className = 'badge bg-gold text-dark';
            badge.textContent = 'Dispensary Hold';
            leftBox.appendChild(badge);

            const title = document.createElement('strong');
            title.className = 'text-light';
            title.textContent = (o.id || 'LGV-RES') + ' — ' + (o.itemsSummary || 'Cosmetics');
            leftBox.appendChild(title);

            const meta = document.createElement('span');
            meta.className = 'text-secondary small';
            meta.textContent = '(' + (o.formattedTotal || '0 KZT') + ')';
            leftBox.appendChild(meta);

            const rightBox = document.createElement('div');
            rightBox.className = 'd-flex align-items-center gap-2';

            const statusSpan = document.createElement('span');
            statusSpan.className = 'status-badge-confirmed d-none d-sm-inline';
            statusSpan.textContent = 'Reserved';
            rightBox.appendChild(statusSpan);

            const toggleLabel = document.createElement('span');
            toggleLabel.className = 'text-secondary small d-none d-md-inline';
            toggleLabel.textContent = 'View Details';
            rightBox.appendChild(toggleLabel);

            const arrow = document.createElement('span');
            arrow.className = 'voucher-toggle-arrow';
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '▼';
            rightBox.appendChild(arrow);

            header.appendChild(leftBox);
            header.appendChild(rightBox);

            // Details Body Container
            const detailsBody = document.createElement('div');
            detailsBody.className = 'active-badge-details is-hidden';

            const grid = document.createElement('div');
            grid.className = 'row g-3 small mb-3';

            const col1 = document.createElement('div');
            col1.className = 'col-12 col-md-4';
            const s1 = document.createElement('span');
            s1.className = 'text-secondary d-block';
            s1.textContent = 'Reserved Products:';
            const d1 = document.createElement('strong');
            d1.className = 'text-light';
            d1.textContent = o.itemsSummary || 'Items';
            col1.appendChild(s1);
            col1.appendChild(d1);

            const col2 = document.createElement('div');
            col2.className = 'col-12 col-md-4';
            const s2 = document.createElement('span');
            s2.className = 'text-secondary d-block';
            s2.textContent = 'Pickup Desk:';
            const d2 = document.createElement('strong');
            d2.className = 'text-light';
            d2.textContent = o.branchName || 'Club Flagship';
            col2.appendChild(s2);
            col2.appendChild(d2);

            const col3 = document.createElement('div');
            col3.className = 'col-12 col-md-4';
            const s3 = document.createElement('span');
            s3.className = 'text-secondary d-block';
            s3.textContent = 'Total at Desk:';
            const d3 = document.createElement('strong');
            d3.className = 'text-gold fs-6';
            d3.textContent = o.formattedTotal || '0 KZT';
            col3.appendChild(s3);
            col3.appendChild(d3);

            grid.appendChild(col1);
            grid.appendChild(col2);
            grid.appendChild(col3);
            detailsBody.appendChild(grid);

            const notice = document.createElement('div');
            notice.className = 'text-secondary small border-top border-secondary border-opacity-25 pt-2';
            notice.textContent = '* Present voucher code ' + (o.id || '') + ' to pickup administrator. Reserved for 48 hours.';
            detailsBody.appendChild(notice);

            // Toggle Handler
            function toggleOrderCard() {
                const isCollapsed = detailsBody.classList.contains('is-hidden');
                if (isCollapsed) {
                    detailsBody.classList.remove('is-hidden');
                    arrow.textContent = '▲';
                    toggleLabel.textContent = 'Hide Details';
                    header.setAttribute('aria-expanded', 'true');
                } else {
                    detailsBody.classList.add('is-hidden');
                    arrow.textContent = '▼';
                    toggleLabel.textContent = 'View Details';
                    header.setAttribute('aria-expanded', 'false');
                }
            }

            header.addEventListener('click', toggleOrderCard);
            header.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleOrderCard();
                }
            });

            card.appendChild(header);
            card.appendChild(detailsBody);
            listContainer.appendChild(card);
        }
    }

    // Public API returned by module
    return {
        formatPrice: formatPrice,
        formatDuration: formatDuration,
        generateReference: generateReference,
        sanitize: sanitize,
        isValidPhone: isValidPhone,
        isValidEmail: isValidEmail,
        setFieldError: setFieldError,
        clearFormErrors: clearFormErrors,
        getBookings: getBookings,
        saveBooking: saveBooking,
        getOrders: getOrders,
        saveOrder: saveOrder,
        getUserProfile: getUserProfile,
        setUserProfile: setUserProfile,
        clearUserProfile: clearUserProfile,
        syncSessionUI: syncSessionUI,
        updateModalViews: updateModalViews,
        autofillForms: autofillForms,
        clearAutofilledForms: clearAutofilledForms,
        initHomePageActiveBadges: initHomePageActiveBadges,
        initShared: function () {
            syncNavigation();
            setupDemonstrationNotice();
            setupFloatingCallButton();
            syncSessionUI();
            initSessionModal();
            autofillForms();
            initHomePageActiveBadges();
        }
    };
})();

// Initialize shared features once DOM is ready using native DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    window.Logovo.initShared();
});
