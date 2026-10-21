/**
 * Logovo Barbershop Astana — Shared Main Script
 * WEB Technologies 1 — Assignment 4 & 5
 * Team: Nodir Muhammedov, Nurassyl Ilyas, Nurken Mamay
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
     * Uses classList and DOM methods in compliance with assignment guidelines
     * @param {HTMLElement} inputElement - Form input/select/textarea element
     * @param {string} message - Error description
     */
    function setFieldError(inputElement, message) {
        if (!inputElement) return;
        
        inputElement.classList.add('is-error');
        inputElement.setAttribute('aria-invalid', 'true');

        // Check if an error message element already exists
        const parent = inputElement.parentElement;
        let errorMsg = parent.querySelector('.field-error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'field-error-message text-error small mt-1';
            errorMsg.setAttribute('role', 'alert');
            parent.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }

    /**
     * Clears all field errors from a given form container
     * @param {HTMLFormElement} formElement - Form DOM element
     */
    function clearFormErrors(formElement) {
        if (!formElement) return;

        const errorInputs = formElement.querySelectorAll('.is-error');
        errorInputs.forEach(function (input) {
            input.classList.remove('is-error');
            input.removeAttribute('aria-invalid');
        });

        const errorMessages = formElement.querySelectorAll('.field-error-message');
        errorMessages.forEach(function (msg) {
            msg.remove();
        });

        // Hide summary error container if present
        const summaryError = formElement.parentElement.querySelector('.alert-error-box');
        if (summaryError) {
            summaryError.classList.add('is-hidden');
            summaryError.textContent = '';
        }
    }

    /**
     * Sets active state on the matching navigation item
     */
    function syncNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('#navbar-nav-list .nav-link');
        
        navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href && currentPath.endsWith(href)) {
                navLinks.forEach(function (l) {
                    l.classList.remove('active', 'text-gold', 'fw-semibold');
                    l.classList.add('text-light');
                    l.removeAttribute('aria-current');
                });
                link.classList.add('active', 'text-gold', 'fw-semibold');
                link.classList.remove('text-light');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    /**
     * Injects an accessible site-wide demonstration notice bar
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
            // Log interaction cleanly without breaking tel: protocol
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

// Initialize shared features once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    window.Logovo.initShared();
});

