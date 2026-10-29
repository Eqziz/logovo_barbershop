/**
 * Logovo Barbershop Astana — Shared Main Script
 * WEB Technologies 1 — Assignment 4 (jQuery Migration)
 * Team: Nodir Muhammedov, Nurassyl Ilyas, Nurken Mamay
 *
 * Using jQuery v3.7.1 (Production Minified CDN).
 * The $(function () { ... }) wrapper (short form of $(document).ready()) ensures
 * that script execution is deferred until the DOM tree is fully parsed and available in memory,
 * preventing runtime errors caused by querying elements before they are rendered.
 */
'use strict';

// Shared Global Namespace for Logovo Utilities
window.Logovo = (function ($) {
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
     * Trims and sanitizes input strings safely using $.trim()
     * @param {string} text - User input string
     * @returns {string} Trimmed text
     */
    function sanitize(text) {
        if (typeof text !== 'string') {
            return '';
        }
        return $.trim(text);
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
     * Sets specific field-level error state with accessible inline message via jQuery
     * Demonstrates traversal (.siblings), DOM creation ($('<div ...>')), and chaining
     * @param {jQuery|HTMLElement} input - Form input/select/textarea element
     * @param {string} message - Error description
     */
    function setFieldError(input, message) {
        const $input = $(input);
        if (!$input.length) return;

        // Chaining: add error visual class and set accessibility attribute
        $input.addClass('is-error').attr('aria-invalid', 'true');

        // Traversal: locate or create dedicated error message sibling
        let $errorMsg = $input.siblings('.field-error-message');
        if (!$errorMsg.length) {
            $errorMsg = $('<div class="field-error-message text-error small mt-1" role="alert"></div>');
            $input.after($errorMsg);
        }
        // Using .text() safely ensures user-provided or dynamic text is escaped against XSS
        $errorMsg.text(message).hide().fadeIn(250);
    }

    /**
     * Clears all field errors from a given form container using jQuery traversal & animation
     * @param {jQuery|HTMLFormElement} form - Form DOM or jQuery element
     */
    function clearFormErrors(form) {
        const $form = $(form);
        if (!$form.length) return;

        // Traversal with .find() and method chaining to clean input states
        $form.find('.is-error')
            .removeClass('is-error')
            .removeAttr('aria-invalid');

        // Effect with callback: fade out existing error text and cleanly remove from DOM
        $form.find('.field-error-message').fadeOut(200, function () {
            $(this).remove();
        });

        // Hide summary error alert box if present in parent container
        $form.parent().find('.alert-error-box').addClass('is-hidden').empty();
    }

    /**
     * Sets active state on the matching navigation item
     * Uses attribute selector, traversal with .each(), and chaining
     */
    function syncNavigation() {
        const currentPath = window.location.pathname;
        const $navLinks = $('#navbar-nav-list .nav-link');

        $navLinks.each(function () {
            const $link = $(this);
            const href = $link.attr('href');
            if (href && currentPath.endsWith(href)) {
                // Chain 1: Reset siblings to default inactive styling
                $navLinks
                    .removeClass('active text-gold fw-semibold')
                    .addClass('text-light')
                    .removeAttr('aria-current');

                // Chain 2: Activate matching item with gold brand styling and ARIA state
                $link
                    .addClass('active text-gold fw-semibold')
                    .removeClass('text-light')
                    .attr('aria-current', 'page');
            }
        });
    }

    /**
     * Injects an accessible site-wide demonstration notice bar using jQuery DOM creation & .prependTo()
     */
    function setupDemonstrationNotice() {
        const $container = $('#site-footer .container');
        if (!$container.length) return;

        // Construct notice banner element tree using jQuery
        const $notice = $('<div class="demo-site-notice bg-dark border border-secondary border-opacity-25 rounded p-2 mb-3 text-center small text-secondary"></div>');
        const $badge = $('<span class="badge bg-gold text-dark me-2 text-uppercase">Academic Demo</span>');
        const $text = $('<span>Logovo Barbershop is a student front-end simulation with jQuery 3.7.1. No real bookings or financial transactions are processed.</span>');

        // Chaining assembly and insertion to the top of footer container
        $notice.append($badge).append($text).prependTo($container);
    }

    /**
     * Enhances floating call button with jQuery event handler (.on)
     */
    function setupFloatingCallButton() {
        // Event binding with .on() on id selector
        $('#btn-floating-call').on('click', function (event) {
            // Using $(this) to access the clicked button
            const phone = $(this).attr('href');
            console.log('[Logovo jQuery Interaction] Floating phone trigger engaged:', phone);
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
})(jQuery);

// $(document).ready lifecycle initialization via $(function () { ... })
// Required by Assignment 4: ensures DOM is ready before manipulating elements.
$(function () {
    window.Logovo.initShared();
});
