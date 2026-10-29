/**
 * Logovo Barbershop Astana — Feedback & Quality Audit Module
 * WEB Technologies 1 — Assignment 4 (jQuery Migration)
 * Responsible Student: Nurassyl Ilyas (Frontend Developer)
 * Assigned Pages: barbers.html, feedback.html
 *
 * Using jQuery v3.7.1 via official CDN.
 * The $(function () { ... }) wrapper ensures that script execution occurs only after
 * the complete HTML document structure is loaded, guaranteeing reliable element selection.
 */
'use strict';

(function ($) {
    // -------------------------------------------------------------------------
    // 1. Initial Verified Reviews Data Array (6 objects with 6 meaningful properties)
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
     * Creates a review card element using jQuery element construction & chaining
     * Uses .text() to safely escape dynamic user text against XSS
     * @param {Object} review - Review data object
     * @returns {jQuery} Constructed card jQuery element
     */
    function createReviewCard(review) {
        const $card = $('<div class="card card-dark p-3 border border-secondary border-opacity-25 shadow-sm"></div>')
            .attr('id', 'review-item-' + review.id);

        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += (i < review.rating) ? '★' : '☆';
        }

        const $header = $('<div class="d-flex justify-content-between align-items-center mb-2"></div>')
            .append($('<strong class="text-light"></strong>').text(review.author))
            .append($('<span class="text-gold small"></span>').text(stars + ' (' + review.branch + ' • ' + review.date + ')'));

        const $comment = $('<p class="text-secondary small mb-0"></p>').text('"' + review.comment + '"');

        $card.append($header).append($comment);
        return $card;
    }

    /**
     * Renders reviews into #reviews-list-container
     * @param {Array} list - Array of review objects
     */
    function renderReviewsList(list) {
        const $container = $('#reviews-list-container');
        if (!$container.length) return;

        // Clear existing static placeholder cards
        $container.empty();

        $.each(list, function (index, review) {
            const $card = createReviewCard(review);
            $container.append($card);
        });
    }

    // -------------------------------------------------------------------------
    // 3. Live Character Counter for Feedback Textarea
    // -------------------------------------------------------------------------
    function setupCharacterCounter() {
        const $textarea = $('#fb-comments-input');
        if (!$textarea.length) return;

        let $counter = $('#fb-char-counter');
        if (!$counter.length) {
            $counter = $('<div id="fb-char-counter" class="text-secondary small text-end mt-1"></div>');
            $textarea.parent().append($counter);
        }

        function updateCounter() {
            const currentLen = $textarea.val().length;
            $counter.text(currentLen + ' / ' + MAX_COMMENT_LENGTH + ' characters');

            if (currentLen > MAX_COMMENT_LENGTH) {
                $counter.attr('class', 'text-error small text-end mt-1 fw-bold');
            } else if (currentLen >= MAX_COMMENT_LENGTH * 0.9) {
                $counter.attr('class', 'text-warning small text-end mt-1');
            } else {
                $counter.attr('class', 'text-secondary small text-end mt-1');
            }
        }

        // Live input event binding via .on()
        $textarea.on('input', updateCounter);
        updateCounter();
    }

    // -------------------------------------------------------------------------
    // 4. Feedback Audit Form Validation & Submission Flow
    // -------------------------------------------------------------------------
    function validateFeedbackForm($form) {
        window.Logovo.clearFormErrors($form);

        let isValid = true;
        let $firstInvalid = null;
        const errorList = [];

        // 1. Full Name
        const $nameInput = $('#fb-name-input');
        const trimmedName = $.trim($nameInput.val());
        if (trimmedName.length < 3) {
            window.Logovo.setFieldError($nameInput, 'Full name must contain at least 3 characters.');
            errorList.push('Full name must be at least 3 characters.');
            isValid = false;
            $firstInvalid = $firstInvalid || $nameInput;
        }

        // 2. Contact Phone or Email
        const $phoneInput = $('#fb-phone-input');
        const phoneVal = $.trim($phoneInput.val());
        if (!window.Logovo.isValidPhone(phoneVal) && !window.Logovo.isValidEmail(phoneVal)) {
            window.Logovo.setFieldError($phoneInput, 'Enter a valid Kazakhstan phone number (+7...) or email.');
            errorList.push('Valid telephone number or email is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $phoneInput;
        }

        // 3. Branch Visited
        const $branchSelect = $('#fb-branch-select');
        if ($.trim($branchSelect.val()) === '') {
            window.Logovo.setFieldError($branchSelect, 'Please select the visited branch.');
            errorList.push('Branch selection is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $branchSelect;
        }

        // 4. Visit Date (Not in future)
        const $dateInput = $('#fb-date-input');
        const dateVal = $dateInput.val();
        if (dateVal) {
            const visitDate = new Date(dateVal + 'T00:00:00');
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            if (visitDate > today) {
                window.Logovo.setFieldError($dateInput, 'Visit date cannot be in the future.');
                errorList.push('Visit date must be in the past or today.');
                isValid = false;
                $firstInvalid = $firstInvalid || $dateInput;
            }
        } else {
            window.Logovo.setFieldError($dateInput, 'Please specify your visit date.');
            errorList.push('Visit date is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $dateInput;
        }

        // 5. Rating (Integer between 1 and 5)
        const $ratingInput = $('#fb-rating-input');
        const ratingVal = parseInt($ratingInput.val(), 10);
        if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
            window.Logovo.setFieldError($ratingInput, 'Rating must be an integer between 1 and 5.');
            errorList.push('Rating must be between 1 and 5.');
            isValid = false;
            $firstInvalid = $firstInvalid || $ratingInput;
        }

        // 6. Comments (Min 15 chars, Max 500 chars) & Combined Rule
        const $commentsInput = $('#fb-comments-input');
        const trimmedComment = $.trim($commentsInput.val());
        if (trimmedComment.length < 15) {
            window.Logovo.setFieldError($commentsInput, 'Please write at least 15 characters describing your impression.');
            errorList.push('Comment must be at least 15 characters.');
            isValid = false;
            $firstInvalid = $firstInvalid || $commentsInput;
        } else if (trimmedComment.length > MAX_COMMENT_LENGTH) {
            window.Logovo.setFieldError($commentsInput, 'Comment exceeds ' + MAX_COMMENT_LENGTH + ' characters.');
            errorList.push('Comment cannot exceed ' + MAX_COMMENT_LENGTH + ' characters.');
            isValid = false;
            $firstInvalid = $firstInvalid || $commentsInput;
        } else if (ratingVal <= 2 && trimmedComment.length < 30) {
            window.Logovo.setFieldError($commentsInput, 'For ratings of 2 or lower, please provide at least 30 characters detailing the issues encountered.');
            errorList.push('Detailed constructive feedback is required for low ratings.');
            isValid = false;
            $firstInvalid = $firstInvalid || $commentsInput;
        }

        // 7. Agreement Checkbox via .prop('checked')
        const $agreeCheck = $('#fb-agree-check');
        if (!$agreeCheck.prop('checked')) {
            window.Logovo.setFieldError($agreeCheck, 'Please authorize feedback evaluation.');
            errorList.push('Evaluation authorization is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $agreeCheck;
        }

        // Error Summary Container with jQuery effect
        const $errorContainer = $('#fb-error-container');
        if (!isValid) {
            $errorContainer.empty().removeClass('is-hidden').hide();
            const $heading = $('<strong class="d-block mb-1">Please correct the following evaluation errors:</strong>');
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

    /**
     * Renders audit voucher upon submission and prepends review to list using jQuery effects
     * @param {Object} details - Submission details
     */
    function renderFeedbackSuccess(details) {
        const $voucherCard = $('#feedback-confirmation-card');
        const $voucherWrapper = $('#feedback-confirmation-wrapper');
        if (!$voucherCard.length || !$voucherWrapper.length) return;

        const referenceCode = window.Logovo.generateReference('QA');
        $('#fb-ticket-code').text(referenceCode);
        $('#fb-voucher-branch').text(details.branchName);

        let stars = '';
        for (let i = 0; i < details.rating; i++) {
            stars += '★';
        }
        $('#fb-voucher-rating').text(details.rating + ' / 5 Stars ' + stars);

        $('#fb-status-badge')
            .attr('class', 'status-badge-confirmed mt-2 mt-sm-0')
            .text('Status: Logged to QA Registry (Demo)');

        const noticeHtml = '<span class="text-warning d-block fw-semibold mb-1">★ Demonstration Notice: No data was sent to a server. This is a front-end evaluation simulation.</span>' +
            '<span class="d-block">Guest ' + $('<div>').text(details.author).html() + ', your impression has been registered and prepended to the public review list below.</span>';
        $('#fb-voucher-notice').html(noticeHtml);

        $voucherCard.addClass('card-dark-highlight');

        // Dynamically prepend newly submitted review card into reviews list with .prependTo() and .fadeIn()
        const $reviewsContainer = $('#reviews-list-container');
        if ($reviewsContainer.length) {
            const newReviewObj = {
                id: 'new-' + Date.now(),
                author: details.author,
                rating: details.rating,
                branch: details.branchName,
                date: 'Just Now',
                comment: details.comment
            };
            const $newCard = createReviewCard(newReviewObj)
                .addClass('border-gold') // highlight new submission
                .hide();

            $reviewsContainer.prepend($newCard);
            // Effect: fade in newly submitted card
            $newCard.fadeIn(400);
        }

        // Effect: slideDown with duration and completion scroll callback
        $voucherWrapper.hide().removeClass('is-hidden').slideDown(400, function () {
            $('html, body').animate({
                scrollTop: $voucherWrapper.offset().top - 80
            }, 300);
        });
    }

    // -------------------------------------------------------------------------
    // 5. Initialization
    // -------------------------------------------------------------------------
    function initFeedbackPage() {
        renderReviewsList(REVIEWS_DATA);
        setupCharacterCounter();

        const $form = $('#form-feedback');

        // Clear field error on typing
        $form.on('input change', '.is-error', function () {
            $(this)
                .removeClass('is-error')
                .removeAttr('aria-invalid')
                .siblings('.field-error-message')
                .fadeOut(150, function () {
                    $(this).remove();
                });
        });

        // Form submit listener via .on()
        $form.on('submit', function (event) {
            // event.preventDefault() stops native submit reload
            event.preventDefault();

            if (validateFeedbackForm($form)) {
                const $nameInput = $('#fb-name-input');
                const $branchSelect = $('#fb-branch-select');
                const $ratingInput = $('#fb-rating-input');
                const $commentsInput = $('#fb-comments-input');

                const details = {
                    author: $.trim($nameInput.val()),
                    branchName: $branchSelect.find('option:selected').text(),
                    rating: parseInt($ratingInput.val(), 10),
                    comment: $.trim($commentsInput.val())
                };

                renderFeedbackSuccess(details);
            }
        });

        $form.on('reset', function () {
            setTimeout(function () {
                window.Logovo.clearFormErrors($form);
                setupCharacterCounter();
            }, 10);
        });
    }

    $(function () {
        initFeedbackPage();
    });
})(jQuery);
