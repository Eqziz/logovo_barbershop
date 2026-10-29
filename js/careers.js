/**
 * Logovo Barbershop Astana — Careers & Candidate Dossier Module
 * WEB Technologies 1 — Assignment 4 (jQuery Migration)
 * Responsible Student: Nurken Mamay (Frontend Developer)
 * Assigned Pages: marketbar.html, careers.html
 *
 * Using jQuery v3.7.1 via official CDN.
 * The $(function () { ... }) construct ensures DOM elements are completely parsed
 * before binding listeners, eliminating race conditions during initial page load.
 */
'use strict';

(function ($) {
    // -------------------------------------------------------------------------
    // 1. Vacancies Reference Catalog Array
    // -------------------------------------------------------------------------
    const VACANCIES_DATA = [
        {
            id: 'barber',
            title: 'Senior Floor Barber',
            trackBadge: 'Master Tier',
            minExperience: 3,
            location: 'Syganak Flagship Lounge',
            package: 'Competitive Split + Retail Commission',
            requirements: 'Minimum 3 years certified haircutting experience with master-level scissors geometry.'
        },
        {
            id: 'apprentice',
            title: 'Barber Apprentice',
            trackBadge: 'Academy Track',
            minExperience: 0,
            maxExperience: 1,
            location: 'Logovo Training Studio',
            package: 'Monthly Stipend + Tool Kit',
            requirements: 'Beginner or graduate seeking intensive 6-month mentorship under Head Barber Azamat.'
        },
        {
            id: 'admin',
            title: 'Floor Administrator',
            trackBadge: 'Hospitality',
            minExperience: 1,
            location: 'Triumph Club Lounge',
            package: 'Fixed Salary + Retail Bonus',
            requirements: 'Minimum 1 year hospitality or salon client reception experience with fluent communication.'
        }
    ];

    // -------------------------------------------------------------------------
    // 2. Interactive Vacancy Card Selection
    // -------------------------------------------------------------------------
    function setupVacancyTrackSelectors() {
        const $roleSelect = $('#cand-role-select');
        const $formSection = $('#careers-form-section');

        const buttonMappings = [
            { btnId: 'btn-apply-barber', roleVal: 'barber', cardId: 'job-barber' },
            { btnId: 'btn-apply-apprentice', roleVal: 'apprentice', cardId: 'job-apprentice' },
            { btnId: 'btn-apply-admin', roleVal: 'admin', cardId: 'job-admin' }
        ];

        $.each(buttonMappings, function (index, mapping) {
            $('#' + mapping.btnId).on('click', function (event) {
                event.preventDefault();

                if ($roleSelect.length) {
                    $roleSelect.val(mapping.roleVal).trigger('change');
                }

                // Traversal & Chaining: highlight chosen card and remove highlight from sibling cards
                $('#' + mapping.cardId)
                    .addClass('selected-state')
                    .siblings('.col-12')
                    .find('.card')
                    .removeClass('selected-state');

                if ($formSection.length) {
                    $('html, body').animate({
                        scrollTop: $formSection.offset().top - 40
                    }, 300);
                }
            });
        });
    }

    // -------------------------------------------------------------------------
    // 3. Form Validation Flow (#form-careers)
    // -------------------------------------------------------------------------

    function validateExperienceForTrack(roleKey, expYears) {
        if (roleKey === 'barber') {
            if (expYears < 3) {
                return {
                    isValid: false,
                    message: 'Senior Floor Barber requires at least 3 years of experience. Candidates with less experience are encouraged to apply for the Barber Apprentice track.'
                };
            }
        } else if (roleKey === 'apprentice') {
            if (expYears > 1) {
                return {
                    isValid: false,
                    message: 'The Barber Apprentice academy track is tailored for beginners (0 to 1 year experience). Candidates with extensive experience should select Senior Floor Barber.'
                };
            }
        } else if (roleKey === 'admin') {
            if (expYears < 1) {
                return {
                    isValid: false,
                    message: 'Floor Administrator requires at least 1 year of hospitality or reception experience.'
                };
            }
        }
        return { isValid: true, message: '' };
    }

    function validateCareersForm($form) {
        window.Logovo.clearFormErrors($form);

        let isValid = true;
        let $firstInvalid = null;
        const errorList = [];

        // 1. Full Name
        const $nameInput = $('#cand-name-input');
        const trimmedName = $.trim($nameInput.val());
        if (trimmedName.length < 3) {
            window.Logovo.setFieldError($nameInput, 'Full name must contain at least 3 characters.');
            errorList.push('Full name must be at least 3 characters.');
            isValid = false;
            $firstInvalid = $firstInvalid || $nameInput;
        }

        // 2. Phone
        const $phoneInput = $('#cand-phone-input');
        if (!window.Logovo.isValidPhone($phoneInput.val())) {
            window.Logovo.setFieldError($phoneInput, 'Enter a valid Kazakhstan phone number (+7...).');
            errorList.push('Valid Kazakhstan telephone number is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $phoneInput;
        }

        // 3. Email
        const $emailInput = $('#cand-email-input');
        if (!window.Logovo.isValidEmail($emailInput.val())) {
            window.Logovo.setFieldError($emailInput, 'Enter a valid email address.');
            errorList.push('Valid email address is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $emailInput;
        }

        // 4. Preferred Branch
        const $branchSelect = $('#cand-branch-select');
        if ($.trim($branchSelect.val()) === '') {
            window.Logovo.setFieldError($branchSelect, 'Please select a preferred club branch.');
            errorList.push('Preferred branch is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $branchSelect;
        }

        // 5. Desired Track
        const $roleSelect = $('#cand-role-select');
        const roleVal = $.trim($roleSelect.val());
        if (roleVal === '') {
            window.Logovo.setFieldError($roleSelect, 'Please select a desired career track.');
            errorList.push('Career track is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $roleSelect;
        }

        // 6. Experience & Combined Rule
        const $expInput = $('#cand-exp-input');
        const expYears = parseInt($expInput.val(), 10);
        if (isNaN(expYears) || expYears < 0 || expYears > 35) {
            window.Logovo.setFieldError($expInput, 'Please enter a valid number of years of experience (0 to 35).');
            errorList.push('Experience years must be between 0 and 35.');
            isValid = false;
            $firstInvalid = $firstInvalid || $expInput;
        } else if (roleVal !== '') {
            const expValidation = validateExperienceForTrack(roleVal, expYears);
            if (!expValidation.isValid) {
                window.Logovo.setFieldError($expInput, expValidation.message);
                errorList.push(expValidation.message);
                isValid = false;
                $firstInvalid = $firstInvalid || $expInput;
            }
        }

        // 7. Earliest Start Date (Not in past)
        const $dateInput = $('#cand-date-input');
        const dateVal = $dateInput.val();
        if (dateVal) {
            const startDate = new Date(dateVal + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (startDate < today) {
                window.Logovo.setFieldError($dateInput, 'Start date cannot be in the past.');
                errorList.push('Earliest start date must be today or a future date.');
                isValid = false;
                $firstInvalid = $firstInvalid || $dateInput;
            }
        } else {
            window.Logovo.setFieldError($dateInput, 'Please choose your earliest available start date.');
            errorList.push('Earliest start date is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $dateInput;
        }

        // 8. Agreement Checkbox via .prop('checked')
        const $agreeCheck = $('#cand-agree-check');
        if (!$agreeCheck.prop('checked')) {
            window.Logovo.setFieldError($agreeCheck, 'Please confirm accuracy of disclosed credentials.');
            errorList.push('Accuracy confirmation is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $agreeCheck;
        }

        // Error Container with slideDown effect
        const $errorContainer = $('#cand-error-container');
        if (!isValid) {
            $errorContainer.empty().removeClass('is-hidden').hide();
            const $heading = $('<strong class="d-block mb-1">Please correct the following dossier requirements:</strong>');
            const $ul = $('<ul class="mb-0 ps-3 small"></ul>');

            $.each(errorList, function (i, err) {
                $('<li></li>').text(err).appendTo($ul);
            });

            $errorContainer.append($heading).append($ul).slideDown(300);

            if ($firstInvalid) {
                $firstInvalid.focus();
            }
        } else {
            $errorContainer.fadeOut(200, function () {
                $(this).addClass('is-hidden').empty();
            });
        }

        return isValid;
    }

    function renderCareersVoucher(details) {
        const $card = $('#careers-confirmation-card');
        const $wrapper = $('#careers-confirmation-wrapper');
        if (!$card.length || !$wrapper.length) return;

        const referenceCode = window.Logovo.generateReference('HR');
        $('#careers-dossier-code').text(referenceCode);
        $('#careers-voucher-track').text(details.trackName + ' (' + details.branchName + ')');
        $('#careers-voucher-timeline').text('Within 3 Business Days');

        $('#careers-status-badge')
            .attr('class', 'status-badge-confirmed mt-2 mt-sm-0')
            .text('Status: Dossier in HR Review (Demo)');

        const noticeHtml = '<span class="text-warning d-block fw-semibold mb-1">★ Demonstration Notice: No real employment application was submitted to an HR server.</span>' +
            '<span class="d-block">Candidate ' + $('<div>').text(details.candidateName).html() + ', your credentials for ' + $('<div>').text(details.trackName).html() + ' have been registered under dossier code <strong>' + referenceCode + '</strong>.</span>';
        $('#careers-voucher-notice').html(noticeHtml);

        $card.addClass('card-dark-highlight');

        // Effect: slideDown with duration and callback
        $wrapper.hide().removeClass('is-hidden').slideDown(400, function () {
            $('html, body').animate({
                scrollTop: $wrapper.offset().top - 80
            }, 300);
        });
    }

    // -------------------------------------------------------------------------
    // 4. Initialization
    // -------------------------------------------------------------------------
    function initCareersPage() {
        setupVacancyTrackSelectors();

        const $form = $('#form-careers');

        // Clear error on input
        $form.on('input change', '.is-error', function () {
            $(this)
                .removeClass('is-error')
                .removeAttr('aria-invalid')
                .siblings('.field-error-message')
                .fadeOut(150, function () {
                    $(this).remove();
                });
        });

        $form.on('submit', function (event) {
            event.preventDefault();

            if (validateCareersForm($form)) {
                const $nameInput = $('#cand-name-input');
                const $roleSelect = $('#cand-role-select');
                const $branchSelect = $('#cand-branch-select');

                const details = {
                    candidateName: $.trim($nameInput.val()),
                    trackName: $roleSelect.find('option:selected').text(),
                    branchName: $branchSelect.find('option:selected').text()
                };

                renderCareersVoucher(details);
            }
        });

        $form.on('reset', function () {
            setTimeout(function () {
                window.Logovo.clearFormErrors($form);
            }, 10);
        });
    }

    $(function () {
        initCareersPage();
    });
})(jQuery);
