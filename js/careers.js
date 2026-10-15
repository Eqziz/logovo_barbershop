/**
 * Logovo Barbershop Astana — Careers & Candidate Dossier Module
 * WEB Technologies 1 — Assignment 4 & 5
 * Responsible Student: Nurken Mamay (Frontend Developer)
 * Assigned Pages: marketbar.html, careers.html
 */
'use strict';

(function () {
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
        const roleSelect = document.getElementById('cand-role-select');
        const formSection = document.getElementById('careers-form-section');

        const buttonMappings = [
            { btnId: 'btn-apply-barber', roleVal: 'barber', cardId: 'job-barber' },
            { btnId: 'btn-apply-apprentice', roleVal: 'apprentice', cardId: 'job-apprentice' },
            { btnId: 'btn-apply-admin', roleVal: 'admin', cardId: 'job-admin' }
        ];

        buttonMappings.forEach(function (mapping) {
            const btn = document.getElementById(mapping.btnId);
            if (!btn) return;

            btn.addEventListener('click', function () {
                if (roleSelect) {
                    roleSelect.value = mapping.roleVal;
                    // Trigger change to validate/update any UI
                    const event = new Event('change');
                    roleSelect.dispatchEvent(event);
                }

                // Highlight chosen card
                buttonMappings.forEach(function (m) {
                    const c = document.getElementById(m.cardId);
                    if (c) c.classList.remove('selected-state');
                });
                const activeCard = document.getElementById(mapping.cardId);
                if (activeCard) activeCard.classList.add('selected-state');

                if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // -------------------------------------------------------------------------
    // 3. Form Validation Flow (#form-careers)
    // -------------------------------------------------------------------------

    /**
     * Combined business rule: validates candidate experience against chosen track
     * @param {string} roleKey - Selected role identifier
     * @param {number} expYears - Experience in years
     * @returns {Object} { isValid: boolean, message: string }
     */
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

    function validateCareersForm(form) {
        window.Logovo.clearFormErrors(form);

        let isValid = true;
        let firstInvalidField = null;
        const errorList = [];

        // 1. Full Name
        const nameInput = document.getElementById('cand-name-input');
        const trimmedName = window.Logovo.sanitize(nameInput ? nameInput.value : '');
        if (trimmedName.length < 3) {
            window.Logovo.setFieldError(nameInput, 'Full name must contain at least 3 characters.');
            errorList.push('Full name must be at least 3 characters.');
            isValid = false;
            firstInvalidField = firstInvalidField || nameInput;
        }

        // 2. Phone (+7...)
        const phoneInput = document.getElementById('cand-phone-input');
        const phoneVal = phoneInput ? phoneInput.value : '';
        if (!window.Logovo.isValidPhone(phoneVal)) {
            window.Logovo.setFieldError(phoneInput, 'Enter a valid Kazakhstan phone number (+7...).');
            errorList.push('Valid Kazakhstan telephone number is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || phoneInput;
        }

        // 3. Email
        const emailInput = document.getElementById('cand-email-input');
        const emailVal = emailInput ? emailInput.value : '';
        if (!window.Logovo.isValidEmail(emailVal)) {
            window.Logovo.setFieldError(emailInput, 'Enter a valid email address.');
            errorList.push('Valid email address is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || emailInput;
        }

        // 4. Preferred Branch
        const branchSelect = document.getElementById('cand-branch-select');
        if (!branchSelect || branchSelect.value.trim() === '') {
            window.Logovo.setFieldError(branchSelect, 'Please select a preferred club branch.');
            errorList.push('Preferred branch is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || branchSelect;
        }

        // 5. Desired Track
        const roleSelect = document.getElementById('cand-role-select');
        if (!roleSelect || roleSelect.value.trim() === '') {
            window.Logovo.setFieldError(roleSelect, 'Please select a desired career track.');
            errorList.push('Career track is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || roleSelect;
        }

        // 6. Experience & Combined Experience vs Track Rule
        const expInput = document.getElementById('cand-exp-input');
        const expYears = parseInt(expInput ? expInput.value : '0', 10);
        if (isNaN(expYears) || expYears < 0 || expYears > 35) {
            window.Logovo.setFieldError(expInput, 'Please enter a valid number of years of experience (0 to 35).');
            errorList.push('Experience years must be between 0 and 35.');
            isValid = false;
            firstInvalidField = firstInvalidField || expInput;
        } else if (roleSelect && roleSelect.value.trim() !== '') {
            const expValidation = validateExperienceForTrack(roleSelect.value, expYears);
            if (!expValidation.isValid) {
                window.Logovo.setFieldError(expInput, expValidation.message);
                errorList.push(expValidation.message);
                isValid = false;
                firstInvalidField = firstInvalidField || expInput;
            }
        }

        // 7. Earliest Start Date (Not in past)
        const dateInput = document.getElementById('cand-date-input');
        if (dateInput && dateInput.value) {
            const startDate = new Date(dateInput.value + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (startDate < today) {
                window.Logovo.setFieldError(dateInput, 'Start date cannot be in the past.');
                errorList.push('Earliest start date must be today or a future date.');
                isValid = false;
                firstInvalidField = firstInvalidField || dateInput;
            }
        } else {
            window.Logovo.setFieldError(dateInput, 'Please choose your earliest available start date.');
            errorList.push('Earliest start date is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || dateInput;
        }

        // 8. Agreement Checkbox
        const agreeCheck = document.getElementById('cand-agree-check');
        if (!agreeCheck || !agreeCheck.checked) {
            window.Logovo.setFieldError(agreeCheck, 'Please confirm accuracy of disclosed credentials.');
            errorList.push('Accuracy confirmation is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || agreeCheck;
        }

        // Handle error summary container
        const errorContainer = document.getElementById('cand-error-container');
        if (errorContainer) {
            if (!isValid) {
                errorContainer.classList.remove('is-hidden');
                errorContainer.textContent = '';

                const heading = document.createElement('strong');
                heading.className = 'd-block mb-1';
                heading.textContent = 'Please correct the following dossier requirements:';
                errorContainer.appendChild(heading);

                const ul = document.createElement('ul');
                ul.className = 'mb-0 ps-3 small';
                errorList.forEach(function (err) {
                    const li = document.createElement('li');
                    li.textContent = err;
                    ul.appendChild(li);
                });
                errorContainer.appendChild(ul);

                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            } else {
                errorContainer.classList.add('is-hidden');
                errorContainer.textContent = '';
            }
        }

        return isValid;
    }

    /**
     * Renders HR confirmation voucher upon successful submission
     * @param {Object} details - Candidate dossier details
     */
    function renderCareersVoucher(details) {
        const voucherCard = document.getElementById('careers-confirmation-card');
        const voucherWrapper = document.getElementById('careers-confirmation-wrapper');
        if (!voucherCard || !voucherWrapper) return;

        const codeEl = document.getElementById('careers-dossier-code');
        const trackEl = document.getElementById('careers-voucher-track');
        const timelineEl = document.getElementById('careers-voucher-timeline');
        const statusBadge = document.getElementById('careers-status-badge');
        const noticeP = document.getElementById('careers-voucher-notice');

        const referenceCode = window.Logovo.generateReference('HR');
        if (codeEl) codeEl.textContent = referenceCode;
        if (trackEl) trackEl.textContent = details.trackName + ' (' + details.branchName + ')';
        if (timelineEl) timelineEl.textContent = 'Within 3 Business Days';

        if (statusBadge) {
            statusBadge.className = 'status-badge-confirmed mt-2 mt-sm-0';
            statusBadge.textContent = 'Status: Dossier in HR Review (Demo)';
        }

        if (noticeP) {
            noticeP.textContent = '';
            const noticeSpan = document.createElement('span');
            noticeSpan.className = 'text-warning d-block fw-semibold mb-1';
            noticeSpan.textContent = '★ Demonstration Notice: No real employment application was submitted to an HR server.';

            const candSpan = document.createElement('span');
            candSpan.className = 'd-block';
            candSpan.textContent = 'Candidate ' + details.candidateName + ', your credentials for ' + details.trackName + ' have been registered under dossier code ' + referenceCode + '.';

            noticeP.appendChild(noticeSpan);
            noticeP.appendChild(candSpan);
        }

        voucherCard.classList.add('card-dark-highlight');
        voucherWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // -------------------------------------------------------------------------
    // 4. Initialization
    // -------------------------------------------------------------------------
    function initCareersPage() {
        setupVacancyTrackSelectors();

        const form = document.getElementById('form-careers');
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                if (validateCareersForm(form)) {
                    const nameInput = document.getElementById('cand-name-input');
                    const roleSelect = document.getElementById('cand-role-select');
                    const branchSelect = document.getElementById('cand-branch-select');

                    const details = {
                        candidateName: window.Logovo.sanitize(nameInput.value),
                        trackName: roleSelect.options[roleSelect.selectedIndex].text,
                        branchName: branchSelect.options[branchSelect.selectedIndex].text
                    };

                    renderCareersVoucher(details);
                }
            });

            form.addEventListener('reset', function () {
                setTimeout(function () {
                    window.Logovo.clearFormErrors(form);
                }, 10);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCareersPage);
    } else {
        initCareersPage();
    }
})();
