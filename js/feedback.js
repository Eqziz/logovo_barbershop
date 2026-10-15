/**
 * Logovo Barbershop Astana — Feedback & Quality Audit Module
 * WEB Technologies 1 — Assignment 4 & 5
 * Responsible Student: Nurassyl Ilyas (Frontend Developer)
 * Assigned Pages: barbers.html, feedback.html
 */
'use strict';

(function () {
    // -------------------------------------------------------------------------
    // 1. Initial Verified Reviews Data Array (At least 6 objects)
    // -------------------------------------------------------------------------
    const REVIEWS_DATA = [
        {
            id: 'rev-1',
            author: 'Alikhan S.',
            rating: 5,
            branch: 'Syganak Flagship',
            date: '2026-10-01',
            comment: 'Impeccable scissor work and authentic club atmosphere. Head Barber Azamat executed a crisp anatomical cut that lasted weeks.'
        },
        {
            id: 'rev-2',
            author: 'Marat K.',
            rating: 5,
            branch: 'Kabanbay Studio',
            date: '2026-09-28',
            comment: 'Best hot towel straight razor shave in Astana. The argan beard conditioning oil left zero irritation. Highly recommended.'
        },
        {
            id: 'rev-3',
            author: 'Timur B.',
            rating: 5,
            branch: 'Triumph Club',
            date: '2026-09-24',
            comment: 'Surgical fade accuracy, punctual scheduling, and fresh Colombian espresso served immediately upon entry.'
        },
        {
            id: 'rev-4',
            author: 'Serik M.',
            rating: 4,
            branch: 'Syganak Flagship',
            date: '2026-09-18',
            comment: 'Very professional skin fade by Senior Barber Rustam. The styling clay holds naturally throughout the work day.'
        },
        {
            id: 'rev-5',
            author: 'Arman T.',
            rating: 5,
            branch: 'Kabanbay Studio',
            date: '2026-09-12',
            comment: 'Took the Father & Son package with my 8-year-old. The masters made it a memorable experience. We will be regular visitors.'
        },
        {
            id: 'rev-6',
            author: 'Kairat Z.',
            rating: 5,
            branch: 'Triumph Club',
            date: '2026-09-05',
            comment: 'Great beard perimeter sculpting. Master Daniyar showed genuine attention to hair grain direction. Exceptional hygiene.'
        }
    ];

    const MAX_COMMENT_LENGTH = 500;

    // -------------------------------------------------------------------------
    // 2. Single Unified Card Rendering Function (Used for existing & new reviews)
    // -------------------------------------------------------------------------

    /**
     * Creates a review card element using native DOM methods
     * Uses textContent to safely insert user-generated content
     * @param {Object} review - Review data object
     * @returns {HTMLElement} Card element
     */
    function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'card card-dark p-3 border border-secondary border-opacity-25 shadow-sm';
        card.id = 'review-item-' + review.id;

        const headerDiv = document.createElement('div');
        headerDiv.className = 'd-flex justify-content-between align-items-center mb-2';

        const authorStrong = document.createElement('strong');
        authorStrong.className = 'text-light';
        authorStrong.textContent = review.author;

        const metaSpan = document.createElement('span');
        metaSpan.className = 'text-gold small';
        
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += (i < review.rating) ? '★' : '☆';
        }
        metaSpan.textContent = stars + ' (' + review.branch + ' • ' + review.date + ')';

        headerDiv.appendChild(authorStrong);
        headerDiv.appendChild(metaSpan);

        const commentP = document.createElement('p');
        commentP.className = 'text-secondary small mb-0';
        commentP.textContent = '"' + review.comment + '"';

        card.appendChild(headerDiv);
        card.appendChild(commentP);

        return card;
    }

    /**
     * Renders reviews into the container
     * @param {Array} list - Array of review objects
     */
    function renderReviewsList(list) {
        const container = document.getElementById('reviews-list-container');
        if (!container) return;

        // Clear existing static items safely
        container.textContent = '';

        for (let i = 0; i < list.length; i++) {
            const cardEl = createReviewCard(list[i]);
            container.appendChild(cardEl);
        }
    }

    // -------------------------------------------------------------------------
    // 3. Live Character Counter for Feedback Textarea
    // -------------------------------------------------------------------------
    function setupCharacterCounter() {
        const textarea = document.getElementById('fb-comments-input');
        if (!textarea) return;

        // Create character counter indicator element if not present
        let counterEl = document.getElementById('fb-char-counter');
        if (!counterEl) {
            counterEl = document.createElement('div');
            counterEl.id = 'fb-char-counter';
            counterEl.className = 'text-secondary small text-end mt-1';
            textarea.parentElement.appendChild(counterEl);
        }

        function updateCounter() {
            const currentLen = textarea.value.length;
            counterEl.textContent = currentLen + ' / ' + MAX_COMMENT_LENGTH + ' characters';

            if (currentLen > MAX_COMMENT_LENGTH) {
                counterEl.className = 'text-error small text-end mt-1 fw-bold';
            } else if (currentLen >= MAX_COMMENT_LENGTH * 0.9) {
                counterEl.className = 'text-warning small text-end mt-1';
            } else {
                counterEl.className = 'text-secondary small text-end mt-1';
            }
        }

        textarea.addEventListener('input', updateCounter);
        updateCounter();
    }

    // -------------------------------------------------------------------------
    // 4. Feedback Audit Form Validation & Submission Flow
    // -------------------------------------------------------------------------
    function validateFeedbackForm(form) {
        window.Logovo.clearFormErrors(form);

        let isValid = true;
        let firstInvalidField = null;
        const errorList = [];

        // 1. Full Name
        const nameInput = document.getElementById('fb-name-input');
        const trimmedName = window.Logovo.sanitize(nameInput ? nameInput.value : '');
        if (trimmedName.length < 3) {
            window.Logovo.setFieldError(nameInput, 'Full name must contain at least 3 characters.');
            errorList.push('Full name must be at least 3 characters.');
            isValid = false;
            firstInvalidField = firstInvalidField || nameInput;
        }

        // 2. Contact Phone or Email
        const phoneInput = document.getElementById('fb-phone-input');
        const phoneVal = window.Logovo.sanitize(phoneInput ? phoneInput.value : '');
        if (!window.Logovo.isValidPhone(phoneVal)) {
            window.Logovo.setFieldError(phoneInput, 'Enter a valid Kazakhstan phone number (+7...).');
            errorList.push('Valid telephone number is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || phoneInput;
        }

        // 3. Branch Visited
        const branchSelect = document.getElementById('fb-branch-select');
        if (!branchSelect || branchSelect.value.trim() === '') {
            window.Logovo.setFieldError(branchSelect, 'Please select the visited branch.');
            errorList.push('Branch selection is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || branchSelect;
        }

        // 4. Visit Date (Not in future)
        const dateInput = document.getElementById('fb-date-input');
        if (dateInput && dateInput.value) {
            const visitDate = new Date(dateInput.value + 'T00:00:00');
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            if (visitDate > today) {
                window.Logovo.setFieldError(dateInput, 'Visit date cannot be in the future.');
                errorList.push('Visit date must be in the past or today.');
                isValid = false;
                firstInvalidField = firstInvalidField || dateInput;
            }
        } else {
            window.Logovo.setFieldError(dateInput, 'Please specify your visit date.');
            errorList.push('Visit date is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || dateInput;
        }

        // 5. Rating (Integer between 1 and 5)
        const ratingInput = document.getElementById('fb-rating-input');
        const ratingVal = parseInt(ratingInput ? ratingInput.value : '0', 10);
        if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
            window.Logovo.setFieldError(ratingInput, 'Rating must be an integer between 1 and 5.');
            errorList.push('Rating must be between 1 and 5.');
            isValid = false;
            firstInvalidField = firstInvalidField || ratingInput;
        }

        // 6. Comments (Min 15 chars, Max 500 chars) & Combined Rule
        const commentsInput = document.getElementById('fb-comments-input');
        const trimmedComment = window.Logovo.sanitize(commentsInput ? commentsInput.value : '');
        if (trimmedComment.length < 15) {
            window.Logovo.setFieldError(commentsInput, 'Please write at least 15 characters describing your impression.');
            errorList.push('Comment must be at least 15 characters.');
            isValid = false;
            firstInvalidField = firstInvalidField || commentsInput;
        } else if (trimmedComment.length > MAX_COMMENT_LENGTH) {
            window.Logovo.setFieldError(commentsInput, 'Comment exceeds ' + MAX_COMMENT_LENGTH + ' characters.');
            errorList.push('Comment cannot exceed ' + MAX_COMMENT_LENGTH + ' characters.');
            isValid = false;
            firstInvalidField = firstInvalidField || commentsInput;
        } else if (ratingVal <= 2 && trimmedComment.length < 30) {
            // Combined rule: low rating requires more specific explanation
            window.Logovo.setFieldError(commentsInput, 'For ratings of 2 or lower, please provide at least 30 characters detailing the issues encountered.');
            errorList.push('Detailed constructive feedback is required for low ratings.');
            isValid = false;
            firstInvalidField = firstInvalidField || commentsInput;
        }

        // 7. Agreement Checkbox
        const agreeCheck = document.getElementById('fb-agree-check');
        if (!agreeCheck || !agreeCheck.checked) {
            window.Logovo.setFieldError(agreeCheck, 'Please authorize feedback evaluation.');
            errorList.push('Evaluation authorization is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || agreeCheck;
        }

        // Handle error summary container
        const errorContainer = document.getElementById('fb-error-container');
        if (errorContainer) {
            if (!isValid) {
                errorContainer.classList.remove('is-hidden');
                errorContainer.textContent = '';

                const heading = document.createElement('strong');
                heading.className = 'd-block mb-1';
                heading.textContent = 'Please correct the following evaluation errors:';
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
     * Renders audit voucher upon submission and adds review to list
     * @param {Object} details - Submission details
     */
    function renderFeedbackSuccess(details) {
        const voucherCard = document.getElementById('feedback-confirmation-card');
        const voucherWrapper = document.getElementById('feedback-confirmation-wrapper');
        if (!voucherCard || !voucherWrapper) return;

        const ticketCode = document.getElementById('fb-ticket-code');
        const branchEl = document.getElementById('fb-voucher-branch');
        const ratingEl = document.getElementById('fb-voucher-rating');
        const statusBadge = document.getElementById('fb-status-badge');
        const noticeP = document.getElementById('fb-voucher-notice');

        const referenceCode = window.Logovo.generateReference('QA');
        if (ticketCode) ticketCode.textContent = referenceCode;
        if (branchEl) branchEl.textContent = details.branchName;
        
        let stars = '';
        for (let i = 0; i < details.rating; i++) {
            stars += '★';
        }
        if (ratingEl) ratingEl.textContent = details.rating + ' / 5 Stars ' + stars;

        if (statusBadge) {
            statusBadge.className = 'status-badge-confirmed mt-2 mt-sm-0';
            statusBadge.textContent = 'Status: Logged to QA Registry (Demo)';
        }

        if (noticeP) {
            noticeP.textContent = '';
            const noticeSpan = document.createElement('span');
            noticeSpan.className = 'text-warning d-block fw-semibold mb-1';
            noticeSpan.textContent = '★ Demonstration Notice: No data was sent to a server. This is a front-end evaluation simulation.';

            const thankSpan = document.createElement('span');
            thankSpan.className = 'd-block';
            thankSpan.textContent = 'Guest ' + details.author + ', your impression has been registered and prepended to the public review list below.';

            noticeP.appendChild(noticeSpan);
            noticeP.appendChild(thankSpan);
        }

        voucherCard.classList.add('card-dark-highlight');

        // Dynamically prepend new review card to reviews container
        const reviewsContainer = document.getElementById('reviews-list-container');
        if (reviewsContainer) {
            const newReviewObj = {
                id: 'new-' + Date.now(),
                author: details.author,
                rating: details.rating,
                branch: details.branchName,
                date: 'Just Now',
                comment: details.comment
            };
            const newCard = createReviewCard(newReviewObj);
            newCard.classList.add('border-gold'); // highlight new submission
            reviewsContainer.insertBefore(newCard, reviewsContainer.firstChild);
        }

        voucherWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // -------------------------------------------------------------------------
    // 5. Initialization
    // -------------------------------------------------------------------------
    function initFeedbackPage() {
        // Initial render of all 6 reviews
        renderReviewsList(REVIEWS_DATA);

        // Setup character counter
        setupCharacterCounter();

        // Form submission
        const form = document.getElementById('form-feedback');
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                if (validateFeedbackForm(form)) {
                    const nameInput = document.getElementById('fb-name-input');
                    const branchSelect = document.getElementById('fb-branch-select');
                    const ratingInput = document.getElementById('fb-rating-input');
                    const commentsInput = document.getElementById('fb-comments-input');

                    const details = {
                        author: window.Logovo.sanitize(nameInput.value),
                        branchName: branchSelect.options[branchSelect.selectedIndex].text,
                        rating: parseInt(ratingInput.value, 10),
                        comment: window.Logovo.sanitize(commentsInput.value)
                    };

                    renderFeedbackSuccess(details);
                }
            });

            form.addEventListener('reset', function () {
                setTimeout(function () {
                    window.Logovo.clearFormErrors(form);
                    setupCharacterCounter();
                }, 10);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFeedbackPage);
    } else {
        initFeedbackPage();
    }
})();
