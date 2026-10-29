/**
 * Logovo Barbershop Astana — Services & Booking Interactive Module
 * WEB Technologies 1 — Assignment 4 (jQuery Migration)
 * Responsible Student: Nodir Muhammedov (Team Lead)
 * Assigned Pages: index.html, services.html
 *
 * Using jQuery v3.7.1 via official CDN.
 * The $(function () { ... }) wrapper ensures that script execution occurs only after
 * the complete HTML document structure is loaded, guaranteeing reliable element selection.
 */
'use strict';

(function ($) {
    // -------------------------------------------------------------------------
    // 1. Core Services Data Array (6 objects with 6 meaningful properties)
    // -------------------------------------------------------------------------
    const SERVICES_DATA = [
        {
            id: 'classic',
            name: 'Signature Classic Scissor Cut',
            category: 'Haircuts',
            duration: 50,
            price: 7000,
            description: 'Precision shears geometry tailored to skull anatomy with warm rinse.'
        },
        {
            id: 'fade',
            name: 'Skin Fade Precision Clipper Cut',
            category: 'Haircuts',
            duration: 35,
            price: 5000,
            description: 'Seamless low, mid, or high taper skin transition with foil finish.'
        },
        {
            id: 'beard',
            name: 'Beard Sculpting & Hot Towel Treatment',
            category: 'Beard & Shave',
            duration: 40,
            price: 5500,
            description: 'Edge perimeter definition with warm organic argan oil conditioning.'
        },
        {
            id: 'shave',
            name: 'Royal Straight-Razor Wet Shave',
            category: 'Beard & Shave',
            duration: 45,
            price: 6500,
            description: 'Two lather cycles, hot herbal compression, and cold soothing closure.'
        },
        {
            id: 'father_son',
            name: 'Father & Son Royal Package',
            category: 'Combo Deals',
            duration: 80,
            price: 11500,
            description: 'Simultaneous twin stations for father and junior gentleman.'
        },
        {
            id: 'full_care',
            name: 'Royal Full Care (Hair + Beard + Charcoal Detox)',
            category: 'Combo Deals',
            duration: 75,
            price: 12000,
            description: 'Comprehensive head-to-neck revival and deep pore cleansing treatment.'
        }
    ];

    // Branch and Barber Master Reference Catalog
    const BARBERS_MAP = {
        'azamat': { name: 'Azamat Tleubergenov (Chief Executive)', branchId: 'syganak', branchName: 'Syganak Flagship (17/1 Syganak St)' },
        'rustam': { name: 'Rustam Bekov (Senior Barber)', branchId: 'kabanbay', branchName: 'Kabanbay Studio (58A Kabanbay Batyr Ave)' },
        'daniyar': { name: 'Daniyar Aliyev (Artisan Stylist)', branchId: 'triumph', branchName: 'Triumph Club (38 Mangilik El Ave)' },
        'any': { name: 'First Available Master', branchId: 'any', branchName: 'Any Branch' }
    };

    const BRANCHES_MAP = {
        'syganak': 'Syganak Flagship (17/1 Syganak St)',
        'kabanbay': 'Kabanbay Studio (58A Kabanbay Batyr Ave)',
        'triumph': 'Triumph Club (38 Mangilik El Ave)'
    };

    let currentSelectedServiceId = 'classic';

    // -------------------------------------------------------------------------
    // 2. Reusable Functions
    // -------------------------------------------------------------------------

    /**
     * Finds a service object by its unique ID
     * @param {string} serviceId - Unique service ID
     * @returns {Object|null} Matching service object or null
     */
    function findServiceById(serviceId) {
        if (!serviceId || typeof serviceId !== 'string') {
            return null;
        }
        const targetId = $.trim(serviceId).toLowerCase();
        for (let i = 0; i < SERVICES_DATA.length; i++) {
            if (SERVICES_DATA[i].id === targetId) {
                return SERVICES_DATA[i];
            }
        }
        return null;
    }

    /**
     * Calculates pricing, duration and estimated summary
     * Calls findServiceById and window.Logovo.formatPrice
     * @param {string} serviceId - Chosen service identifier
     * @returns {Object} Calculation result
     */
    function calculateServiceEstimate(serviceId) {
        const service = findServiceById(serviceId);
        if (!service) {
            return {
                service: null,
                totalPrice: 0,
                formattedPrice: window.Logovo.formatPrice(0),
                totalDuration: 0,
                formattedDuration: window.Logovo.formatDuration(0),
                isValid: false
            };
        }

        return {
            service: service,
            totalPrice: service.price,
            formattedPrice: window.Logovo.formatPrice(service.price),
            totalDuration: service.duration,
            formattedDuration: 'Est. Duration: ' + window.Logovo.formatDuration(service.duration),
            isValid: true
        };
    }

    /**
     * Updates the interactive estimate summary widget with jQuery
     * @param {string} serviceId - Selected service ID
     */
    function updateEstimateSummary(serviceId) {
        const estimate = calculateServiceEstimate(serviceId);
        currentSelectedServiceId = serviceId;

        const $summaryList = $('#selected-services-list');
        const $priceEl = $('#summary-total-price');
        const $durationEl = $('#summary-total-duration');

        if (estimate.isValid && estimate.service) {
            // Safe DOM insertion via jQuery: empty old content, construct and append elements safely
            $summaryList
                .empty()
                .removeClass('empty-placeholder');

            const $title = $('<strong class="text-light d-block"></strong>').text(estimate.service.name);
            const $category = $('<span class="text-secondary"></span>').text(
                'Category: ' + estimate.service.category + ' (' + estimate.service.duration + ' min)'
            );

            $summaryList.append($title).append($category);
            $priceEl.text(estimate.formattedPrice);
            $durationEl.text(estimate.formattedDuration);
        } else {
            $summaryList
                .text('Please choose a grooming service from the tariff table.')
                .addClass('empty-placeholder');
            $priceEl.text('0 KZT');
            $durationEl.text('Est. Duration: 0 min');
        }

        highlightTableRow(serviceId);
    }

    /**
     * Highlights the selected service row in the tariff table using traversal & chaining
     * @param {string} serviceId - Active service ID
     */
    function highlightTableRow(serviceId) {
        const idMapping = {
            'classic': 'service-row-1',
            'fade': 'service-row-2',
            'beard': 'service-row-3',
            'shave': 'service-row-4',
            'father_son': 'service-row-5',
            'full_care': 'service-row-6'
        };

        const targetRowId = idMapping[serviceId];
        if (targetRowId) {
            // Traversal & Method Chaining explanation:
            // 1. $('#' + targetRowId) -> selects target row by id
            // 2. .addClass('selected-state') -> highlights active service row with brand styling
            // 3. .siblings('tr') -> traverses DOM tree to all adjacent sibling table rows
            // 4. .removeClass('selected-state') -> strips highlight class from previously selected rows
            $('#' + targetRowId)
                .addClass('selected-state')
                .siblings('tr')
                .removeClass('selected-state');
        }
    }

    // -------------------------------------------------------------------------
    // 3. Validation Rules & Compatibility
    // -------------------------------------------------------------------------

    function validateBookingDate(dateString) {
        if (!dateString || typeof dateString !== 'string') {
            return { isValid: false, message: 'Please select an appointment date.' };
        }

        const selectedDate = new Date(dateString + 'T00:00:00');
        if (isNaN(selectedDate.getTime())) {
            return { isValid: false, message: 'Invalid date format selected.' };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return { isValid: false, message: 'Past dates cannot be reserved. Please select today or a future date.' };
        }

        const maxAdvanceDays = 60;
        const maxDate = new Date(today);
        maxDate.setDate(maxDate.getDate() + maxAdvanceDays);

        if (selectedDate > maxDate) {
            return { isValid: false, message: 'Appointments can only be scheduled up to 60 days in advance.' };
        }

        return { isValid: true, message: '' };
    }

    function validateBarberBranchCompatibility(barberId, branchId) {
        const barber = BARBERS_MAP[barberId];
        if (!barber) {
            return { isValid: false, message: 'Please choose a master barber preference.' };
        }

        if (barber.branchId === 'any' || branchId === '') {
            return { isValid: true, message: '' };
        }

        if (barber.branchId !== branchId) {
            const assignedBranchName = BRANCHES_MAP[barber.branchId] || barber.branchId;
            return {
                isValid: false,
                message: barber.name + ' is resident exclusively at the ' + assignedBranchName + '. Please align your branch selection or choose "First Available Master".'
            };
        }

        return { isValid: true, message: '' };
    }

    /* ==========================================================================
       FEATURE 1 REWRITTEN: Form Validation with jQuery
       Replaces: plainJsValidateBookingForm from old-js-version.js
       
       COMPARISON COMMENT:
       Plain JS required document.getElementById(), manual null checks, classList.add(), and loop-based querySelectorAll() error removal.
       jQuery replaces this with concise chained expressions: $('#booking-name-input').addClass('is-error') and traversal $(form).find('.is-error').removeClass().
       Verdict: The jQuery version is substantially shorter (-35% lines), eliminating repetitive element queries and manual DOM plumbing.
       ========================================================================== */

    /**
     * Form validation using jQuery selectors, traversal, and field-level error assignment
     * @param {jQuery} $form - jQuery form object
     * @returns {boolean} True if all validation rules pass
     */
    function validateBookingForm($form) {
        window.Logovo.clearFormErrors($form);

        let isFormValid = true;
        let $firstInvalid = null;
        const errorList = [];

        // ARCHITECTURAL NOTE: Browser-side validation is solely for responsive user feedback and UI guidance.
        // It can be easily bypassed by disabling JavaScript or sending direct HTTP requests (curl/Postman).
        // Genuine data integrity, authorization, and business invariants must always be verified on the server.

        // 1. Service Selection (attribute and element selector)
        const $serviceSelect = $form.find('select[name="booking_service"]');
        if ($.trim($serviceSelect.val()) === '') {
            window.Logovo.setFieldError($serviceSelect, 'Please select a grooming service.');
            errorList.push('Service selection is required.');
            isFormValid = false;
            $firstInvalid = $firstInvalid || $serviceSelect;
        }

        // 2. Branch Selection
        const $branchSelect = $('#booking-branch-select');
        const branchVal = $.trim($branchSelect.val());
        if (branchVal === '') {
            window.Logovo.setFieldError($branchSelect, 'Please select a club branch.');
            errorList.push('Branch selection is required.');
            isFormValid = false;
            $firstInvalid = $firstInvalid || $branchSelect;
        }

        // 3. Master Barber Selection & 4. Combined Rule (Master vs Branch)
        const $barberSelect = $('#booking-barber-select');
        const barberVal = $.trim($barberSelect.val());
        if (barberVal === '') {
            window.Logovo.setFieldError($barberSelect, 'Please choose a master barber preference.');
            errorList.push('Master barber selection is required.');
            isFormValid = false;
            $firstInvalid = $firstInvalid || $barberSelect;
        } else if (branchVal !== '') {
            const compatibility = validateBarberBranchCompatibility(barberVal, branchVal);
            if (!compatibility.isValid) {
                window.Logovo.setFieldError($barberSelect, compatibility.message);
                errorList.push(compatibility.message);
                isFormValid = false;
                $firstInvalid = $firstInvalid || $barberSelect;
            }
        }

        // 5. Date Validation
        const $dateInput = $('#booking-date-input');
        const dateValidation = validateBookingDate($dateInput.val());
        if (!dateValidation.isValid) {
            window.Logovo.setFieldError($dateInput, dateValidation.message);
            errorList.push(dateValidation.message);
            isFormValid = false;
            $firstInvalid = $firstInvalid || $dateInput;
        }

        // 6. Time Slot Selection
        const $timeSelect = $('#booking-time-select');
        if ($.trim($timeSelect.val()) === '') {
            window.Logovo.setFieldError($timeSelect, 'Please choose a time slot.');
            errorList.push('Time slot is required.');
            isFormValid = false;
            $firstInvalid = $firstInvalid || $timeSelect;
        }

        // 7. Guest Full Name (Trimmed text, min 3 characters, alphabetic spaces only)
        const $nameInput = $('#booking-name-input');
        const trimmedName = $.trim($nameInput.val());
        if (trimmedName.length < 3) {
            window.Logovo.setFieldError($nameInput, 'Full name must contain at least 3 characters.');
            errorList.push('Full name must contain at least 3 characters.');
            isFormValid = false;
            $firstInvalid = $firstInvalid || $nameInput;
        } else if (!/^[A-Za-zА-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІі\s\-]+$/.test(trimmedName)) {
            window.Logovo.setFieldError($nameInput, 'Full name should only contain letters, spaces, or hyphens.');
            errorList.push('Full name contains invalid characters.');
            isFormValid = false;
            $firstInvalid = $firstInvalid || $nameInput;
        }

        // 8. Contact Telephone (Kazakhstan format verification)
        const $phoneInput = $('input[name="booking_phone"]');
        if (!window.Logovo.isValidPhone($phoneInput.val())) {
            window.Logovo.setFieldError($phoneInput, 'Enter a valid Kazakhstan phone number (+7 701 000-00-00 or 87010000000).');
            errorList.push('Valid Kazakhstan telephone number is required.');
            isFormValid = false;
            $firstInvalid = $firstInvalid || $phoneInput;
        }

        // 9. Contact Email (Valid email format)
        const $emailInput = $('input[name="booking_email"]');
        if (!window.Logovo.isValidEmail($emailInput.val())) {
            window.Logovo.setFieldError($emailInput, 'Enter a valid email address (e.g. name@domain.kz).');
            errorList.push('Valid email address is required.');
            isFormValid = false;
            $firstInvalid = $firstInvalid || $emailInput;
        }

        // 10. Agreement Checkbox via .prop('checked')
        // NOTE ON .prop() VS .attr():
        // .prop('checked') inspects the current live boolean state of the DOM checkbox element (true/false).
        // .attr('checked') only reads the initial HTML markup attribute string and does not reflect subsequent user interaction toggles.
        const $agreeCheck = $('#booking-agree-check');
        if (!$agreeCheck.prop('checked')) {
            window.Logovo.setFieldError($agreeCheck, 'You must confirm appointment authorization.');
            errorList.push('Authorization confirmation is required.');
            isFormValid = false;
            $firstInvalid = $firstInvalid || $agreeCheck;
        }

        // Handle error summary container
        const $errorContainer = $('#booking-error-container');
        if (!isFormValid) {
            $errorContainer.empty().removeClass('is-hidden').hide();

            const $heading = $('<strong class="d-block mb-1">Please correct the following reservation requirements:</strong>');
            const $ul = $('<ul class="mb-0 ps-3 small"></ul>');

            // Traversal with .each() over errorList array
            $.each(errorList, function (index, err) {
                $('<li></li>').text(err).appendTo($ul);
            });

            // Effect: slideDown summary container
            $errorContainer.append($heading).append($ul).slideDown(300);

            // Focus the first invalid field
            if ($firstInvalid) {
                $firstInvalid.focus();
            }
        } else {
            // Effect: fadeOut summary container
            $errorContainer.fadeOut(200, function () {
                $(this).addClass('is-hidden').empty();
            });
        }

        return isFormValid;
    }

    /* ==========================================================================
       FEATURE 3 REWRITTEN: Show/Hide & Element State Toggling with jQuery Effects
       Replaces: plainJsRenderConfirmationVoucher from old-js-version.js
       
       COMPARISON COMMENT:
       Plain JS used instantaneous classList.remove('is-hidden') and element.scrollIntoView(), creating abrupt visual snapping.
       jQuery replaces this with animated .slideDown(400, callback) and .fadeIn(), offering a fluid, professional user transition.
       Verdict: jQuery is slightly more verbose due to duration/callback parameters, but vastly superior in user experience and perceived quality.
       ========================================================================== */

    /**
     * Renders confirmation voucher with jQuery effects (.slideDown with duration & callback)
     * Demonstrates .text() for XSS-safe user string insertion and .html() for structured message
     * @param {Object} details - Confirmed booking details
     */
    function renderConfirmationVoucher(details) {
        const $voucherCard = $('#booking-confirmation-card');
        const $voucherWrapper = $('#booking-confirmation-wrapper');
        if (!$voucherCard.length || !$voucherWrapper.length) return;

        const referenceId = window.Logovo.generateReference('BK');

        // Safe text injection with .text()
        $('#booking-voucher-code').text(referenceId);
        $('#booking-voucher-service').text(details.serviceName);
        $('#booking-voucher-barber').text(details.barberName);
        $('#booking-voucher-branch').text(details.branchName);
        $('#booking-voucher-datetime').text(details.formattedDate + ' at ' + details.timeSlot);
        $('#booking-voucher-amount').text(details.formattedPrice);

        // Update status badge class and text
        $('#booking-voucher-status')
            .attr('class', 'status-badge-confirmed mt-2 mt-sm-0')
            .text('Status: Confirmed Demonstration Request');

        // Structured HTML insertion with .html() where markup tags are explicitly required
        const noticeHtml = '<span class="text-warning d-block fw-semibold mb-1">★ Demonstration Notice: No real booking was placed. No data has been sent to a server.</span>' +
            '<span class="d-block">Guest ' + $('<div>').text(details.guestName).html() + ', please present voucher code <strong>' + referenceId + '</strong> upon arrival at ' + $('<div>').text(details.branchName).html() + '. Fresh artisan espresso is reserved at the hospitality bar.</span>';
        $('#booking-voucher-notice').html(noticeHtml);

        $voucherCard.addClass('card-dark-highlight');

        // Effect with duration & completion callback:
        // .slideDown(400) reveals the voucher container smoothly;
        // The completion callback scrolls the page smoothly to the rendered voucher.
        $voucherWrapper.hide().removeClass('is-hidden').slideDown(400, function () {
            $('html, body').animate({
                scrollTop: $voucherWrapper.offset().top - 80
            }, 300);
        });
    }

    // -------------------------------------------------------------------------
    // 4. Event Binding with .on() & Event Delegation
    // -------------------------------------------------------------------------
    function initServicesPage() {
        const $serviceSelect = $('#booking-service-select');
        const $bookingForm = $('#form-booking');

        updateEstimateSummary(currentSelectedServiceId);

        // Event 1: 'change' event on service dropdown
        $serviceSelect.on('change', function () {
            // $(this) refers to the changed select element
            const selectedVal = $(this).val();
            if (selectedVal) {
                updateEstimateSummary(selectedVal);
            }
        });

        // Event 2: DELEGATED EVENT HANDLER on table body
        // DELEGATION EXPLANATION:
        // Direct binding ($('.select-service-btn').on('click')) only attaches listeners to rows present in the DOM at boot.
        // Delegating from $('#services-table-body') to '.select-service-btn' listens to clicks at the parent level,
        // catching events for existing and dynamically created or refreshed rows without rebinding.
        $('#services-table-body').on('click', '.select-service-btn', function (event) {
            // event.preventDefault() stops native anchor jump to keep smooth scrolling and state intact
            event.preventDefault();

            // Using $(this) to traverse to row index
            const $row = $(this).closest('tr');
            const rowIndex = $('#services-table-body tr').index($row);
            const mappedService = SERVICES_DATA[rowIndex];

            if (mappedService) {
                currentSelectedServiceId = mappedService.id;
                $serviceSelect.val(mappedService.id);
                updateEstimateSummary(mappedService.id);

                // Chain with traversal: scroll down to booking section smoothly
                $('html, body').animate({
                    scrollTop: $('#booking-section').offset().top - 40
                }, 300);
            }
        });

        // Event 3: Clear individual field error as soon as user types or changes value (input & change)
        $bookingForm.on('input change', '.is-error', function () {
            // Traversal & Chaining: $(this) is the actively edited input element
            $(this)
                .removeClass('is-error')
                .removeAttr('aria-invalid')
                .siblings('.field-error-message')
                .fadeOut(150, function () {
                    $(this).remove();
                });
        });

        // Event 4: 'submit' on form
        $bookingForm.on('submit', function (event) {
            // event.preventDefault() prevents native form submission causing page refresh
            // Without it, browser would reload the page and wipe out validation state.
            event.preventDefault();

            if (validateBookingForm($bookingForm)) {
                const chosenService = findServiceById($serviceSelect.val());
                const $barberSelect = $('#booking-barber-select');
                const $branchSelect = $('#booking-branch-select');
                const $dateInput = $('#booking-date-input');
                const $timeSelect = $('#booking-time-select');
                const $nameInput = $('#booking-name-input');

                const barberKey = $barberSelect.val();
                const barberInfo = BARBERS_MAP[barberKey] || { name: $barberSelect.find('option:selected').text() };
                const branchText = BRANCHES_MAP[$branchSelect.val()] || $branchSelect.find('option:selected').text();

                const reservationDetails = {
                    serviceName: chosenService ? chosenService.name : 'Custom Grooming',
                    formattedPrice: chosenService ? window.Logovo.formatPrice(chosenService.price) : '0 KZT',
                    barberName: barberInfo.name,
                    branchName: branchText,
                    formattedDate: $dateInput.val(),
                    timeSlot: $timeSelect.val(),
                    guestName: $.trim($nameInput.val())
                };

                renderConfirmationVoucher(reservationDetails);
            }
        });

        // Event 5: 'reset' on form
        $bookingForm.on('reset', function () {
            setTimeout(function () {
                window.Logovo.clearFormErrors($bookingForm);
                updateEstimateSummary('classic');
                $serviceSelect.val('classic');
            }, 10);
        });
    }

    // Initialize on DOM ready
    $(function () {
        initServicesPage();
    });
})(jQuery);
