/**
 * Logovo Barbershop Astana — Services & Booking Interactive Module
 * WEB Technologies 1 — Assignment 4 & 5
 * Responsible Student: Nodir Muhammedov (Team Lead)
 * Assigned Pages: index.html, services.html
 */
'use strict';

(function () {
    // -------------------------------------------------------------------------
    // 1. Core Services Data Array (At least 6 objects with 6 meaningful properties)
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

    // State
    let currentSelectedServiceId = 'classic';

    // -------------------------------------------------------------------------
    // 2. Reusable Functions (Parameters, return values, function-calling-function)
    // -------------------------------------------------------------------------

    /**
     * Finds a service object by its unique ID
     * @param {string} serviceId - Unique service ID
     * @returns {Object|null} Matching service object or null
     */
    function findServiceById(serviceId) {
        if (typeof serviceId !== 'string' || serviceId.trim() === '') {
            return null;
        }
        const targetId = serviceId.trim().toLowerCase();
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
     * @returns {Object} Calculation result { service, formattedPrice, formattedDuration, isValid }
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

        const totalPrice = service.price;
        const totalDuration = service.duration;

        return {
            service: service,
            totalPrice: totalPrice,
            formattedPrice: window.Logovo.formatPrice(totalPrice),
            totalDuration: totalDuration,
            formattedDuration: 'Est. Duration: ' + window.Logovo.formatDuration(totalDuration),
            isValid: true
        };
    }

    /**
     * Updates the interactive estimate summary widget with safe DOM manipulation
     * @param {string} serviceId - Selected service ID
     */
    function updateEstimateSummary(serviceId) {
        const estimate = calculateServiceEstimate(serviceId);
        currentSelectedServiceId = serviceId;

        const summaryContainer = document.getElementById('selected-services-list');
        const priceElement = document.getElementById('summary-total-price');
        const durationElement = document.getElementById('summary-total-duration');

        if (!summaryContainer || !priceElement || !durationElement) return;

        if (estimate.isValid && estimate.service) {
            summaryContainer.textContent = ''; // clear safely
            summaryContainer.classList.remove('empty-placeholder');

            const itemTitle = document.createElement('strong');
            itemTitle.className = 'text-light d-block';
            itemTitle.textContent = estimate.service.name;

            const itemCategory = document.createElement('span');
            itemCategory.className = 'text-secondary';
            itemCategory.textContent = 'Category: ' + estimate.service.category + ' (' + estimate.service.duration + ' min)';

            summaryContainer.appendChild(itemTitle);
            summaryContainer.appendChild(itemCategory);

            priceElement.textContent = estimate.formattedPrice;
            durationElement.textContent = estimate.formattedDuration;
        } else {
            summaryContainer.textContent = 'Please choose a grooming service from the tariff table.';
            summaryContainer.classList.add('empty-placeholder');
            priceElement.textContent = '0 KZT';
            durationElement.textContent = 'Est. Duration: 0 min';
        }

        // Highlight active row in tariff table
        highlightTableRow(serviceId);
    }

    /**
     * Highlights the selected service row in the tariff table
     * @param {string} serviceId - Active service ID
     */
    function highlightTableRow(serviceId) {
        const rows = document.querySelectorAll('#services-table-body tr');
        rows.forEach(function (row) {
            row.classList.remove('selected-state');
        });

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
            const targetRow = document.getElementById(targetRowId);
            if (targetRow) {
                targetRow.classList.add('selected-state');
            }
        }
    }

    // -------------------------------------------------------------------------
    // 3. Complete Form Validation Flow (#form-booking)
    // -------------------------------------------------------------------------

    /**
     * Validates date string to ensure it is not in the past and within 60 days
     * @param {string} dateString - Date in YYYY-MM-DD format
     * @returns {Object} { isValid: boolean, message: string }
     */
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

    /**
     * Validates master barber and branch compatibility (Combined field rule)
     * @param {string} barberId - Selected barber key
     * @param {string} branchId - Selected branch key
     * @returns {Object} { isValid: boolean, message: string }
     */
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

    /**
     * Comprehensive form validation for #form-booking
     * Checks trimmed text, telephone, email, date rules, and combined master-branch rule
     * @param {HTMLFormElement} form - Booking form element
     * @returns {boolean} True if all fields are valid
     */
    function validateBookingForm(form) {
        window.Logovo.clearFormErrors(form);

        let isFormValid = true;
        let firstInvalidField = null;
        const errorList = [];

        // 1. Service Selection
        const serviceSelect = document.getElementById('booking-service-select');
        if (!serviceSelect || serviceSelect.value.trim() === '') {
            window.Logovo.setFieldError(serviceSelect, 'Please select a grooming service.');
            errorList.push('Service selection is required.');
            isFormValid = false;
            firstInvalidField = firstInvalidField || serviceSelect;
        }

        // 2. Branch Selection
        const branchSelect = document.getElementById('booking-branch-select');
        if (!branchSelect || branchSelect.value.trim() === '') {
            window.Logovo.setFieldError(branchSelect, 'Please select a club branch.');
            errorList.push('Branch selection is required.');
            isFormValid = false;
            firstInvalidField = firstInvalidField || branchSelect;
        }

        // 3. Master Barber Selection & 4. Combined Rule (Master vs Branch)
        const barberSelect = document.getElementById('booking-barber-select');
        if (!barberSelect || barberSelect.value.trim() === '') {
            window.Logovo.setFieldError(barberSelect, 'Please choose a master barber preference.');
            errorList.push('Master barber selection is required.');
            isFormValid = false;
            firstInvalidField = firstInvalidField || barberSelect;
        } else if (branchSelect && branchSelect.value.trim() !== '') {
            const compatibility = validateBarberBranchCompatibility(barberSelect.value, branchSelect.value);
            if (!compatibility.isValid) {
                window.Logovo.setFieldError(barberSelect, compatibility.message);
                errorList.push(compatibility.message);
                isFormValid = false;
                firstInvalidField = firstInvalidField || barberSelect;
            }
        }

        // 5. Date Validation
        const dateInput = document.getElementById('booking-date-input');
        const dateValidation = validateBookingDate(dateInput ? dateInput.value : '');
        if (!dateValidation.isValid) {
            window.Logovo.setFieldError(dateInput, dateValidation.message);
            errorList.push(dateValidation.message);
            isFormValid = false;
            firstInvalidField = firstInvalidField || dateInput;
        }

        // 6. Time Slot Selection
        const timeSelect = document.getElementById('booking-time-select');
        if (!timeSelect || timeSelect.value.trim() === '') {
            window.Logovo.setFieldError(timeSelect, 'Please choose a time slot.');
            errorList.push('Time slot is required.');
            isFormValid = false;
            firstInvalidField = firstInvalidField || timeSelect;
        }

        // 7. Guest Full Name (Trimmed, min 3 characters, alphabetic spaces only)
        const nameInput = document.getElementById('booking-name-input');
        const trimmedName = window.Logovo.sanitize(nameInput ? nameInput.value : '');
        if (trimmedName.length < 3) {
            window.Logovo.setFieldError(nameInput, 'Full name must contain at least 3 characters.');
            errorList.push('Full name must contain at least 3 characters.');
            isFormValid = false;
            firstInvalidField = firstInvalidField || nameInput;
        } else if (!/^[A-Za-zА-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІі\s\-]+$/.test(trimmedName)) {
            window.Logovo.setFieldError(nameInput, 'Full name should only contain letters, spaces, or hyphens.');
            errorList.push('Full name contains invalid characters.');
            isFormValid = false;
            firstInvalidField = firstInvalidField || nameInput;
        }

        // 8. Contact Telephone (Kazakhstan format verification)
        const phoneInput = document.getElementById('booking-phone-input');
        const rawPhone = phoneInput ? phoneInput.value : '';
        if (!window.Logovo.isValidPhone(rawPhone)) {
            window.Logovo.setFieldError(phoneInput, 'Enter a valid Kazakhstan phone number (+7 701 000-00-00 or 87010000000).');
            errorList.push('Valid Kazakhstan telephone number is required.');
            isFormValid = false;
            firstInvalidField = firstInvalidField || phoneInput;
        }

        // 9. Contact Email (Valid email format)
        const emailInput = document.getElementById('booking-email-input');
        const rawEmail = emailInput ? emailInput.value : '';
        if (!window.Logovo.isValidEmail(rawEmail)) {
            window.Logovo.setFieldError(emailInput, 'Enter a valid email address (e.g. name@domain.kz).');
            errorList.push('Valid email address is required.');
            isFormValid = false;
            firstInvalidField = firstInvalidField || emailInput;
        }

        // 10. Agreement Checkbox
        const agreeCheck = document.getElementById('booking-agree-check');
        if (!agreeCheck || !agreeCheck.checked) {
            window.Logovo.setFieldError(agreeCheck, 'You must confirm appointment authorization.');
            errorList.push('Authorization confirmation is required.');
            isFormValid = false;
            firstInvalidField = firstInvalidField || agreeCheck;
        }

        // Handle error summary container
        const errorContainer = document.getElementById('booking-error-container');
        if (errorContainer) {
            if (!isFormValid) {
                errorContainer.classList.remove('is-hidden');
                errorContainer.textContent = ''; // clear

                const errorHeading = document.createElement('strong');
                errorHeading.className = 'd-block mb-1';
                errorHeading.textContent = 'Please correct the following reservation requirements:';
                errorContainer.appendChild(errorHeading);

                const errorUl = document.createElement('ul');
                errorUl.className = 'mb-0 ps-3 small';
                errorList.forEach(function (err) {
                    const li = document.createElement('li');
                    li.textContent = err;
                    errorUl.appendChild(li);
                });
                errorContainer.appendChild(errorUl);

                // Focus first invalid field
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            } else {
                errorContainer.classList.add('is-hidden');
                errorContainer.textContent = '';
            }
        }

        return isFormValid;
    }

    /**
     * Renders the generated confirmation voucher upon successful validation
     * Uses textContent to securely insert user-provided strings (XSS prevention)
     * @param {Object} details - Reservation details object
     */
    function renderConfirmationVoucher(details) {
        const voucherCard = document.getElementById('booking-confirmation-card');
        const voucherWrapper = document.getElementById('booking-confirmation-wrapper');
        if (!voucherCard || !voucherWrapper) return;

        // Elements
        const voucherCode = document.getElementById('booking-voucher-code');
        const voucherService = document.getElementById('booking-voucher-service');
        const voucherBarber = document.getElementById('booking-voucher-barber');
        const voucherBranch = document.getElementById('booking-voucher-branch');
        const voucherDatetime = document.getElementById('booking-voucher-datetime');
        const voucherAmount = document.getElementById('booking-voucher-amount');
        const voucherStatus = document.getElementById('booking-voucher-status');
        const voucherNotice = document.getElementById('booking-voucher-notice');

        // Populate safely using textContent
        const referenceId = window.Logovo.generateReference('BK');
        if (voucherCode) voucherCode.textContent = referenceId;
        if (voucherService) voucherService.textContent = details.serviceName;
        if (voucherBarber) voucherBarber.textContent = details.barberName;
        if (voucherBranch) voucherBranch.textContent = details.branchName;
        if (voucherDatetime) voucherDatetime.textContent = details.formattedDate + ' at ' + details.timeSlot;
        if (voucherAmount) voucherAmount.textContent = details.formattedPrice;

        if (voucherStatus) {
            voucherStatus.className = 'status-badge-confirmed mt-2 mt-sm-0';
            voucherStatus.textContent = 'Status: Confirmed Demonstration Request';
        }

        if (voucherNotice) {
            voucherNotice.textContent = ''; // clear safely
            const noticeSpan = document.createElement('span');
            noticeSpan.className = 'text-warning d-block fw-semibold mb-1';
            noticeSpan.textContent = '★ Demonstration Notice: No real booking was placed. No data has been sent to a server.';
            
            const arrivalSpan = document.createElement('span');
            arrivalSpan.className = 'd-block';
            arrivalSpan.textContent = 'Guest ' + details.guestName + ', please present voucher code ' + referenceId + ' upon arrival at ' + details.branchName + '. Fresh artisan espresso is reserved at the hospitality bar.';

            voucherNotice.appendChild(noticeSpan);
            voucherNotice.appendChild(arrivalSpan);
        }

        // Highlight voucher card
        voucherCard.classList.add('card-dark-highlight');

        // Smooth scroll to confirmation voucher
        voucherWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // -------------------------------------------------------------------------
    // 4. Event Binding & Initialization
    // -------------------------------------------------------------------------
    function initServicesPage() {
        const serviceSelect = document.getElementById('booking-service-select');
        const bookingForm = document.getElementById('form-booking');

        // Initialize default estimate with "classic"
        updateEstimateSummary(currentSelectedServiceId);

        // Service Select Change Listener
        if (serviceSelect) {
            serviceSelect.addEventListener('change', function () {
                const selectedVal = serviceSelect.value;
                if (selectedVal) {
                    updateEstimateSummary(selectedVal);
                }
            });
        }

        // Table "Book Service" Button Click Listeners
        const tableBookButtons = document.querySelectorAll('.select-service-btn');
        tableBookButtons.forEach(function (button, index) {
            button.addEventListener('click', function (event) {
                // Determine service ID by index or mapping
                const mappedService = SERVICES_DATA[index];
                if (mappedService) {
                    currentSelectedServiceId = mappedService.id;
                    if (serviceSelect) {
                        serviceSelect.value = mappedService.id;
                    }
                    updateEstimateSummary(mappedService.id);
                }
            });
        });

        // Booking Form Submission
        if (bookingForm) {
            bookingForm.addEventListener('submit', function (event) {
                event.preventDefault(); // Never reload in front-end demo

                const isValid = validateBookingForm(bookingForm);
                if (isValid) {
                    const chosenService = findServiceById(serviceSelect.value);
                    const barberSelect = document.getElementById('booking-barber-select');
                    const branchSelect = document.getElementById('booking-branch-select');
                    const dateInput = document.getElementById('booking-date-input');
                    const timeSelect = document.getElementById('booking-time-select');
                    const nameInput = document.getElementById('booking-name-input');

                    const barberInfo = BARBERS_MAP[barberSelect.value] || { name: barberSelect.options[barberSelect.selectedIndex].text };
                    const branchText = BRANCHES_MAP[branchSelect.value] || branchSelect.options[branchSelect.selectedIndex].text;

                    const reservationDetails = {
                        serviceName: chosenService ? chosenService.name : 'Custom Grooming',
                        formattedPrice: chosenService ? window.Logovo.formatPrice(chosenService.price) : '0 KZT',
                        barberName: barberInfo.name,
                        branchName: branchText,
                        formattedDate: dateInput.value,
                        timeSlot: timeSelect.value,
                        guestName: window.Logovo.sanitize(nameInput.value)
                    };

                    renderConfirmationVoucher(reservationDetails);
                }
            });

            // Form Reset Listener
            bookingForm.addEventListener('reset', function () {
                setTimeout(function () {
                    window.Logovo.clearFormErrors(bookingForm);
                    updateEstimateSummary('classic');
                    if (serviceSelect) serviceSelect.value = 'classic';
                }, 10);
            });
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServicesPage);
    } else {
        initServicesPage();
    }
})();
