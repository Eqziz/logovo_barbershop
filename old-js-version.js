/**
 * Logovo Barbershop Astana — Preserved Plain-JavaScript Baseline
 * WEB Technologies 1 — Assignment 4 (jQuery Migration)
 * 
 * NOTICE:
 * This file contains the three features originally authored in pure vanilla JavaScript (ES6+ / DOM API).
 * It is NOT linked to any HTML document and serves solely as an archival reference for side-by-side
 * comparison against the rewritten jQuery implementations in js/services.js and js/barbers.js.
 * 
 * Features archived:
 * 1. Feature 1: Form Validation & Field-Level Error Display (from services.js)
 * 2. Feature 2: Dynamic Card & DOM Generation from Array (from barbers.js)
 * 3. Feature 3: Show/Hide & Element State Toggling (from services.js)
 */

/* ==========================================================================
   FEATURE 1 (Plain JS): Form Validation & Field-Level Error Handling
   Origin: js/services.js (Midterm / Assignment 5 version)
   ========================================================================== */

function plainJsSetFieldError(inputElement, message) {
    if (!inputElement) return;

    inputElement.classList.add('is-error');
    inputElement.setAttribute('aria-invalid', 'true');

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

function plainJsClearFormErrors(formElement) {
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

    const summaryError = formElement.parentElement.querySelector('.alert-error-box');
    if (summaryError) {
        summaryError.classList.add('is-hidden');
        summaryError.textContent = '';
    }
}

function plainJsValidateBookingForm(form) {
    plainJsClearFormErrors(form);

    let isFormValid = true;
    let firstInvalidField = null;
    const errorList = [];

    // Service Selection
    const serviceSelect = document.getElementById('booking-service-select');
    if (!serviceSelect || serviceSelect.value.trim() === '') {
        plainJsSetFieldError(serviceSelect, 'Please select a grooming service.');
        errorList.push('Service selection is required.');
        isFormValid = false;
        firstInvalidField = firstInvalidField || serviceSelect;
    }

    // Branch Selection
    const branchSelect = document.getElementById('booking-branch-select');
    if (!branchSelect || branchSelect.value.trim() === '') {
        plainJsSetFieldError(branchSelect, 'Please select a club branch.');
        errorList.push('Branch selection is required.');
        isFormValid = false;
        firstInvalidField = firstInvalidField || branchSelect;
    }

    // Name input validation
    const nameInput = document.getElementById('booking-name-input');
    const trimmedName = nameInput ? nameInput.value.trim() : '';
    if (trimmedName.length < 3) {
        plainJsSetFieldError(nameInput, 'Full name must contain at least 3 characters.');
        errorList.push('Full name must contain at least 3 characters.');
        isFormValid = false;
        firstInvalidField = firstInvalidField || nameInput;
    }

    // Agreement checkbox
    const agreeCheck = document.getElementById('booking-agree-check');
    if (!agreeCheck || !agreeCheck.checked) {
        plainJsSetFieldError(agreeCheck, 'You must confirm appointment authorization.');
        errorList.push('Authorization confirmation is required.');
        isFormValid = false;
        firstInvalidField = firstInvalidField || agreeCheck;
    }

    // Summary alert container handling
    const errorContainer = document.getElementById('booking-error-container');
    if (errorContainer) {
        if (!isFormValid) {
            errorContainer.classList.remove('is-hidden');
            errorContainer.textContent = '';

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


/* ==========================================================================
   FEATURE 2 (Plain JS): Dynamic Card & DOM Generation from Array
   Origin: js/barbers.js (Midterm / Assignment 5 version)
   ========================================================================== */

function plainJsCreateBarberCard(barber) {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.id = 'barber-' + barber.id;

    const card = document.createElement('div');
    card.className = 'card card-dark h-100 p-4 border border-secondary border-opacity-25 shadow-sm d-flex flex-column justify-content-between';

    const contentDiv = document.createElement('div');

    const badge = document.createElement('span');
    badge.className = barber.tier === 'chief'
        ? 'badge bg-gold mb-2 text-uppercase fw-bold'
        : 'badge bg-secondary mb-2 text-uppercase fw-bold text-light';
    badge.textContent = barber.tierLabel;

    const nameHeading = document.createElement('h2');
    nameHeading.className = 'h4 text-gold mb-1';
    nameHeading.textContent = barber.name;

    const locationP = document.createElement('p');
    locationP.className = 'text-secondary small mb-2';
    locationP.textContent = 'Floor: ' + barber.branchLabel;

    const expP = document.createElement('p');
    expP.className = 'text-light small mb-3';
    const expStrong = document.createElement('strong');
    expStrong.textContent = 'Experience: ';
    expP.appendChild(expStrong);
    expP.appendChild(document.createTextNode(barber.experienceYears + ' Years Professional Mastery'));

    const specP = document.createElement('p');
    specP.className = 'text-secondary small mb-3';
    const specStrong = document.createElement('strong');
    specStrong.textContent = 'Specialties: ';
    specP.appendChild(specStrong);
    specP.appendChild(document.createTextNode(barber.specialties));

    const bioP = document.createElement('p');
    bioP.className = 'text-secondary small mb-0';
    bioP.textContent = barber.bio;

    contentDiv.appendChild(badge);
    contentDiv.appendChild(nameHeading);
    contentDiv.appendChild(locationP);
    contentDiv.appendChild(expP);
    contentDiv.appendChild(specP);
    contentDiv.appendChild(bioP);

    const actionDiv = document.createElement('div');
    actionDiv.className = 'mt-4';

    const bookBtn = document.createElement('a');
    bookBtn.href = 'services.html#booking-section';
    bookBtn.className = 'btn btn-gold w-100';
    bookBtn.textContent = 'Book Chair with ' + barber.name.split(' ')[0];

    actionDiv.appendChild(bookBtn);

    card.appendChild(contentDiv);
    card.appendChild(actionDiv);
    col.appendChild(card);

    return col;
}

function plainJsRenderBarbersRoster(list) {
    const container = document.getElementById('barbers-roster-container');
    if (!container) return;

    container.textContent = '';

    for (let i = 0; i < list.length; i++) {
        const cardElement = plainJsCreateBarberCard(list[i]);
        container.appendChild(cardElement);
    }
}


/* ==========================================================================
   FEATURE 3 (Plain JS): Show/Hide & Element State Toggling
   Origin: js/services.js (Midterm / Assignment 5 version)
   ========================================================================== */

function plainJsRenderConfirmationVoucher(details) {
    const voucherCard = document.getElementById('booking-confirmation-card');
    const voucherWrapper = document.getElementById('booking-confirmation-wrapper');
    if (!voucherCard || !voucherWrapper) return;

    const voucherCode = document.getElementById('booking-voucher-code');
    const voucherService = document.getElementById('booking-voucher-service');
    const voucherBarber = document.getElementById('booking-voucher-barber');
    const voucherBranch = document.getElementById('booking-voucher-branch');
    const voucherDatetime = document.getElementById('booking-voucher-datetime');
    const voucherAmount = document.getElementById('booking-voucher-amount');
    const voucherStatus = document.getElementById('booking-voucher-status');
    const voucherNotice = document.getElementById('booking-voucher-notice');

    if (voucherCode) voucherCode.textContent = 'LGV-2026-BK-492';
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
        voucherNotice.textContent = '';
        const noticeSpan = document.createElement('span');
        noticeSpan.className = 'text-warning d-block fw-semibold mb-1';
        noticeSpan.textContent = '★ Demonstration Notice: No real booking was placed.';
        voucherNotice.appendChild(noticeSpan);
    }

    voucherCard.classList.add('card-dark-highlight');
    voucherWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
