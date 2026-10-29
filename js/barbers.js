/**
 * Logovo Barbershop Astana — Barbers Roster & Consultation Module
 * WEB Technologies 1 — Assignment 4 (jQuery Migration)
 * Responsible Student: Nurassyl Ilyas (Frontend Developer)
 * Assigned Pages: barbers.html, feedback.html
 *
 * Using jQuery v3.7.1 via official CDN.
 * The $(function () { ... }) construct defers script execution until the browser has
 * completely parsed the DOM, ensuring elements like #barbers-roster-container exist when targeted.
 */
'use strict';

(function ($) {
    // -------------------------------------------------------------------------
    // 1. Core Barbers Data Array (6 objects with 7 meaningful properties each)
    // -------------------------------------------------------------------------
    const BARBERS_DATA = [
        {
            id: 'azamat',
            name: 'Azamat Tleubergenov',
            tier: 'chief',
            tierLabel: 'Chief Executive Barber',
            branch: 'syganak',
            branchLabel: '17/1 Syganak St (Flagship)',
            experienceYears: 9,
            specialties: 'Anatomical Scissor Architecture, Royal Straight-Razor Wet Shaving, Beard Silhouette Restyling.',
            bio: 'Chief mentor of the Logovo Apprenticeship program. Specializes in classic Anglo-European cuts and hot towel treatments.'
        },
        {
            id: 'rustam',
            name: 'Rustam Bekov',
            tier: 'senior',
            tierLabel: 'Senior Floor Barber',
            branch: 'kabanbay',
            branchLabel: '58A Kabanbay Batyr Ave (Studio)',
            experienceYears: 6,
            specialties: 'High-Precision Skin Tapers, Clipper Fade Blending, Razor Edge Beard Sculpting.',
            bio: 'Master of clean gradient work and modern textured styles. Experienced in beard density treatment and hot herbal compresses.'
        },
        {
            id: 'daniyar',
            name: 'Daniyar Aliyev',
            tier: 'first',
            tierLabel: 'First-Category Cutter',
            branch: 'triumph',
            branchLabel: '38 Mangilik El Ave (Triumph)',
            experienceYears: 4,
            specialties: 'Textured Scissor Crops, Classic Pompadours, Grey Beard Camouflage Tinting.',
            bio: 'Graduate of the Logovo Academy 2024 honors cohort. Focuses on razor finishes and customized pomade styling.'
        },
        {
            id: 'timur',
            name: 'Timur Zhaksylykov',
            tier: 'senior',
            tierLabel: 'Senior Floor Barber',
            branch: 'syganak',
            branchLabel: '17/1 Syganak St (Flagship)',
            experienceYears: 5,
            specialties: 'Low Skin Taper Fades, Traditional Beard Lineup, Scalp Exfoliation Massage.',
            bio: 'Expert in scalp biomechanics and low skin taper gradients. Regularly hosts master classes on shears maintenance.'
        },
        {
            id: 'sanjar',
            name: 'Sanjar Omarov',
            tier: 'first',
            tierLabel: 'First-Category Cutter',
            branch: 'kabanbay',
            branchLabel: '58A Kabanbay Batyr Ave (Studio)',
            experienceYears: 3,
            specialties: 'Modern Textured Mullets, Caesar Fringe Styling, Hot Clay Facial Detox.',
            bio: 'Passionate about youth silhouette cuts and contemporary hair texture sculpting with organic matte paste.'
        },
        {
            id: 'arman',
            name: 'Arman Kuanyshev',
            tier: 'senior',
            tierLabel: 'Senior Floor Barber',
            branch: 'triumph',
            branchLabel: '38 Mangilik El Ave (Triumph)',
            experienceYears: 7,
            specialties: 'Royal Shaving, Japanese Steel Shears Blending, Beard Stencil Architecture.',
            bio: 'Certified in Tokyo barbering academy methods. Exceptional precision on hairline perimeter cleanup.'
        }
    ];

    /* ==========================================================================
       FEATURE 2 REWRITTEN: Dynamic Card & DOM Generation from Array
       Replaces: plainJsCreateBarberCard & plainJsRenderBarbersRoster from old-js-version.js
       
       COMPARISON COMMENT:
       Plain JS required 65 lines of repetitive document.createElement(), setting className/textContent, and nested appendChild() calls.
       jQuery replaces this by chaining and building the card hierarchy ($('<div class="col-12...">').append(...).appendTo('#barbers-roster-container')).
       Verdict: The jQuery version is substantially shorter (-50% lines), much easier to visualize as an HTML tree, and reduces DOM manipulation overhead.
       ========================================================================== */

    /**
     * Renders a single barber profile card element using jQuery element creation & chaining
     * Uses .text() to safely escape dynamic text against XSS
     * @param {Object} barber - Barber data object
     * @returns {jQuery} Constructed column jQuery object
     */
    function createBarberCard(barber) {
        const badgeClass = barber.tier === 'chief'
            ? 'badge bg-gold mb-2 text-uppercase fw-bold'
            : 'badge bg-secondary mb-2 text-uppercase fw-bold text-light';

        // Chain 1: Build outer column and card container with ID and classes
        const $col = $('<div class="col-12 col-md-6 col-lg-4"></div>').attr('id', 'barber-' + barber.id);
        const $card = $('<div class="card card-dark h-100 p-4 border border-secondary border-opacity-25 shadow-sm d-flex flex-column justify-content-between"></div>');

        // Content section
        const $content = $('<div></div>')
            .append($('<span></span>').attr('class', badgeClass).text(barber.tierLabel))
            .append($('<h2 class="h4 text-gold mb-1"></h2>').text(barber.name))
            .append($('<p class="text-secondary small mb-2"></p>').text('Floor: ' + barber.branchLabel))
            .append(
                $('<p class="text-light small mb-3"></p>')
                    .append('<strong>Experience: </strong>')
                    .append(document.createTextNode(barber.experienceYears + ' Years Professional Mastery'))
            )
            .append(
                $('<p class="text-secondary small mb-3"></p>')
                    .append('<strong>Specialties: </strong>')
                    .append(document.createTextNode(barber.specialties))
            )
            .append($('<p class="text-secondary small mb-0"></p>').text(barber.bio));

        // Action button section with delegated hook class .btn-book-chair
        const $action = $('<div class="mt-4"></div>').append(
            $('<a href="services.html#booking-section" class="btn btn-gold w-100 btn-book-chair"></a>')
                .attr('data-barber-id', barber.id)
                .text('Book Chair with ' + barber.name.split(' ')[0])
        );

        $card.append($content).append($action);
        $col.append($card);
        return $col;
    }

    /**
     * Renders the complete roster into #barbers-roster-container with jQuery .empty() & .append()
     * Handles empty state with an accessible card when 0 items match
     * @param {Array} list - Array of barber objects
     */
    function renderBarbersRoster(list) {
        const $container = $('#barbers-roster-container');
        if (!$container.length) return;

        // Clear existing cards cleanly
        $container.empty();

        if (!list || list.length === 0) {
            // Empty state constructed and appended via jQuery
            const $emptyCol = $('<div class="col-12"></div>');
            const $emptyCard = $('<div class="card card-dark p-5 text-center border border-secondary border-opacity-25 rounded"></div>')
                .append('<div class="fs-1 text-secondary mb-2">✂</div>')
                .append('<h3 class="h5 text-gold mb-2">No Master Artisans Match Your Search Criteria</h3>')
                .append('<p class="text-secondary mb-4 small">Try adjusting branch location, qualification tier, or keyword spelling.</p>')
                .append(
                    $('<button type="button" class="btn btn-outline-gold align-self-center">Reset All Filters</button>')
                        .on('click', resetFilters)
                );

            $emptyCol.append($emptyCard).appendTo($container);
            updateResultCounter(0, BARBERS_DATA.length);
            return;
        }

        // Traversal with $.each() to append each constructed card
        $.each(list, function (index, barber) {
            const $card = createBarberCard(barber);
            $container.append($card);
        });

        // Effect: subtle fade-in of rendered cards
        $container.hide().fadeIn(250);

        updateResultCounter(list.length, BARBERS_DATA.length);
    }

    /**
     * Updates dynamic counter feedback indicator using jQuery .text()
     */
    function updateResultCounter(matchingCount, totalCount) {
        let $counter = $('#barbers-result-counter');
        const $filterCard = $('#barbers-filter-card');

        if (!$counter.length && $filterCard.length) {
            $counter = $('<div id="barbers-result-counter" class="text-secondary small mt-2"></div>');
            $filterCard.append($counter);
        }

        if ($counter.length) {
            $counter.text('Showing ' + matchingCount + ' of ' + totalCount + ' master artisans in Astana network.');
        }
    }

    // -------------------------------------------------------------------------
    // 3. Multi-Criteria Filtering Logic
    // -------------------------------------------------------------------------

    function getFilteredBarbers() {
        const keyword = $.trim($('#barber-search-input').val()).toLowerCase();
        const branchFilter = $('#barber-filter-branch').val() || 'all';
        const tierFilter = $('#barber-filter-tier').val() || 'all';

        return BARBERS_DATA.filter(function (barber) {
            const matchesKeyword = keyword === '' ||
                barber.name.toLowerCase().indexOf(keyword) !== -1 ||
                barber.specialties.toLowerCase().indexOf(keyword) !== -1 ||
                barber.bio.toLowerCase().indexOf(keyword) !== -1;

            const matchesBranch = branchFilter === 'all' || barber.branch === branchFilter;
            const matchesTier = tierFilter === 'all' || barber.tier === tierFilter;

            return matchesKeyword && matchesBranch && matchesTier;
        });
    }

    function applyFilters() {
        const filtered = getFilteredBarbers();
        renderBarbersRoster(filtered);
    }

    function resetFilters() {
        $('#barber-search-input').val('');
        $('#barber-filter-branch').val('all');
        $('#barber-filter-tier').val('all');
        renderBarbersRoster(BARBERS_DATA);
    }

    // -------------------------------------------------------------------------
    // 4. Consultation Inquiry Form Validation
    // -------------------------------------------------------------------------

    function validateInquiryForm($form) {
        window.Logovo.clearFormErrors($form);

        let isValid = true;
        let $firstInvalid = null;
        const errorList = [];

        // 1. Barber Selection
        const $barberSelect = $('#inquiry-barber-select');
        if ($.trim($barberSelect.val()) === '') {
            window.Logovo.setFieldError($barberSelect, 'Please select a designated barber.');
            errorList.push('Barber selection is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $barberSelect;
        }

        // 2. Topic Selection
        const $topicSelect = $('#inquiry-topic-select');
        if ($.trim($topicSelect.val()) === '') {
            window.Logovo.setFieldError($topicSelect, 'Please choose a consultation topic.');
            errorList.push('Consultation topic is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $topicSelect;
        }

        // 3. Name (Trimmed, min 3 chars)
        const $nameInput = $('#inquiry-name-input');
        const trimmedName = $.trim($nameInput.val());
        if (trimmedName.length < 3) {
            window.Logovo.setFieldError($nameInput, 'Name must contain at least 3 characters.');
            errorList.push('Name must be at least 3 characters.');
            isValid = false;
            $firstInvalid = $firstInvalid || $nameInput;
        }

        // 4. Contact (Phone or Email format)
        const $contactInput = $('#inquiry-contact-input');
        const contactVal = $.trim($contactInput.val());
        const isPhone = window.Logovo.isValidPhone(contactVal);
        const isEmail = window.Logovo.isValidEmail(contactVal);

        if (!isPhone && !isEmail) {
            window.Logovo.setFieldError($contactInput, 'Enter a valid telephone number (+7...) or valid email address.');
            errorList.push('A valid phone number or email is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $contactInput;
        }

        // 5. Description Text (Min 10 characters)
        const $textInput = $('#inquiry-text-input');
        if ($.trim($textInput.val()).length < 10) {
            window.Logovo.setFieldError($textInput, 'Please provide more details (at least 10 characters).');
            errorList.push('Question details must be at least 10 characters.');
            isValid = false;
            $firstInvalid = $firstInvalid || $textInput;
        }

        // 6. Agreement Checkbox via .prop('checked')
        const $agreeCheck = $('#inquiry-agree-check');
        if (!$agreeCheck.prop('checked')) {
            window.Logovo.setFieldError($agreeCheck, 'Please authorize contact for grooming advice.');
            errorList.push('Contact authorization is required.');
            isValid = false;
            $firstInvalid = $firstInvalid || $agreeCheck;
        }

        // Error Summary Container with jQuery slideDown effect
        const $errorContainer = $('#inquiry-error-container');
        if (!isValid) {
            $errorContainer.empty().removeClass('is-hidden').hide();
            const $heading = $('<strong class="d-block mb-1">Please correct the following inquiry fields:</strong>');
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
     * Renders consultation ticket voucher with jQuery .slideDown() animation
     */
    function renderInquiryTicket(details) {
        const $card = $('#inquiry-confirmation-card');
        const $wrapper = $('#inquiry-confirmation-wrapper');
        if (!$card.length || !$wrapper.length) return;

        const referenceCode = window.Logovo.generateReference('INQ');
        $('#inquiry-ticket-code').text(referenceCode);
        $('#inquiry-voucher-barber').text(details.barberName);
        $('#inquiry-voucher-timing').text('Within 24 Hours (Next Day 15:00)');

        $('#inquiry-status-badge')
            .attr('class', 'status-badge-confirmed mt-2 mt-sm-0')
            .text('Status: Ticket Queued (Demo)');

        const noticeHtml = '<span class="text-warning d-block fw-semibold mb-1">★ Demonstration Notice: No real consultation inquiry was transmitted to a server.</span>' +
            '<span class="d-block">Client ' + $('<div>').text(details.clientName).html() + ', your question on "<strong>' + $('<div>').text(details.topic).html() + '</strong>" has been logged with code <strong>' + referenceCode + '</strong>.</span>';
        $('#inquiry-voucher-notice').html(noticeHtml);

        $card.addClass('card-dark-highlight');

        // Effect: slideDown with duration and callback
        $wrapper.hide().removeClass('is-hidden').slideDown(400, function () {
            $('html, body').animate({
                scrollTop: $wrapper.offset().top - 80
            }, 300);
        });
    }

    // -------------------------------------------------------------------------
    // 5. Initialization & Event Delegation
    // -------------------------------------------------------------------------
    function initBarbersPage() {
        renderBarbersRoster(BARBERS_DATA);

        // Filter events using .on()
        $('#barber-search-input').on('input', applyFilters);
        $('#barber-filter-branch').on('change', applyFilters);
        $('#barber-filter-tier').on('change', applyFilters);
        $('#barber-filter-btn').on('click', applyFilters);
        $('#barber-reset-btn').on('click', resetFilters);

        // DELEGATED EVENT HANDLER:
        // Binding directly to '.btn-book-chair' would fail because the barber cards are rendered dynamically via JavaScript.
        // Elements created after initial page load do not have listeners attached directly.
        // Delegating through existing ancestor $('#barbers-roster-container') intercepts bubbling clicks from any future dynamic card buttons.
        $('#barbers-roster-container').on('click', '.btn-book-chair', function (event) {
            // Using $(this) inside delegated handler
            const barberId = $(this).attr('data-barber-id');
            console.log('[Logovo Delegation] Delegated booking click for barber ID:', barberId);
        });

        // Form events
        const $inquiryForm = $('#form-barber-inquiry');

        // Clear field error on typing
        $inquiryForm.on('input change', '.is-error', function () {
            $(this)
                .removeClass('is-error')
                .removeAttr('aria-invalid')
                .siblings('.field-error-message')
                .fadeOut(150, function () {
                    $(this).remove();
                });
        });

        $inquiryForm.on('submit', function (event) {
            // event.preventDefault() stops native browser submit
            // Without it, the browser would reload the page and destroy all state.
            event.preventDefault();

            if (validateInquiryForm($inquiryForm)) {
                const $barberSelect = $('#inquiry-barber-select');
                const $topicSelect = $('#inquiry-topic-select');
                const $nameInput = $('#inquiry-name-input');

                const details = {
                    barberName: $barberSelect.find('option:selected').text(),
                    topic: $topicSelect.find('option:selected').text(),
                    clientName: $.trim($nameInput.val())
                };

                renderInquiryTicket(details);
            }
        });

        $inquiryForm.on('reset', function () {
            setTimeout(function () {
                window.Logovo.clearFormErrors($inquiryForm);
            }, 10);
        });
    }

    $(function () {
        initBarbersPage();
    });
})(jQuery);
