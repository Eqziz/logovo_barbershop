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
        initShared: function () {
            syncNavigation();
            setupDemonstrationNotice();
            setupFloatingCallButton();
        }
    };
})();

// Initialize shared features once DOM is ready using native DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    window.Logovo.initShared();
});
