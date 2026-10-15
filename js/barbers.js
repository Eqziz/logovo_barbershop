/**
 * Logovo Barbershop Astana — Barbers Roster & Consultation Module
 * WEB Technologies 1 — Assignment 4 & 5
 * Responsible Student: Nurassyl Ilyas (Frontend Developer)
 * Assigned Pages: barbers.html, feedback.html
 */
'use strict';

(function () {
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

    // -------------------------------------------------------------------------
    // 2. Reusable DOM Rendering Functions
    // -------------------------------------------------------------------------

    /**
     * Renders a single barber profile card element using native DOM methods
     * @param {Object} barber - Barber data object
     * @returns {HTMLElement} Column element wrapping the card
     */
    function createBarberCard(barber) {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';
        col.id = 'barber-' + barber.id;

        const card = document.createElement('div');
        card.className = 'card card-dark h-100 p-4 border border-secondary border-opacity-25 shadow-sm d-flex flex-column justify-content-between';

        const contentDiv = document.createElement('div');

        // Badge
        const badge = document.createElement('span');
        badge.className = barber.tier === 'chief' 
            ? 'badge bg-gold mb-2 text-uppercase fw-bold' 
            : 'badge bg-secondary mb-2 text-uppercase fw-bold text-light';
        badge.textContent = barber.tierLabel;

        // Name
        const nameHeading = document.createElement('h2');
        nameHeading.className = 'h4 text-gold mb-1';
        nameHeading.textContent = barber.name;

        // Floor / Location
        const locationP = document.createElement('p');
        locationP.className = 'text-secondary small mb-2';
        locationP.textContent = 'Floor: ' + barber.branchLabel;

        // Experience
        const expP = document.createElement('p');
        expP.className = 'text-light small mb-3';
        const expStrong = document.createElement('strong');
        expStrong.textContent = 'Experience: ';
        expP.appendChild(expStrong);
        expP.appendChild(document.createTextNode(barber.experienceYears + ' Years Professional Mastery'));

        // Specialties
        const specP = document.createElement('p');
        specP.className = 'text-secondary small mb-3';
        const specStrong = document.createElement('strong');
        specStrong.textContent = 'Specialties: ';
        specP.appendChild(specStrong);
        specP.appendChild(document.createTextNode(barber.specialties));

        // Bio
        const bioP = document.createElement('p');
        bioP.className = 'text-secondary small mb-0';
        bioP.textContent = barber.bio;

        contentDiv.appendChild(badge);
        contentDiv.appendChild(nameHeading);
        contentDiv.appendChild(locationP);
        contentDiv.appendChild(expP);
        contentDiv.appendChild(specP);
        contentDiv.appendChild(bioP);

        // Action button container
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

    /**
     * Renders the complete roster into the target DOM container
     * Handles empty state if filtered array is empty
     * @param {Array} list - Array of barber objects
     */
    function renderBarbersRoster(list) {
        const container = document.getElementById('barbers-roster-container');
        if (!container) return;

        // Clear existing content safely
        container.textContent = '';

        if (!list || list.length === 0) {
            const emptyCol = document.createElement('div');
            emptyCol.className = 'col-12';

            const emptyCard = document.createElement('div');
            emptyCard.className = 'card card-dark p-5 text-center border border-secondary border-opacity-25 rounded';

            const emptyIcon = document.createElement('div');
            emptyIcon.className = 'fs-1 text-secondary mb-2';
            emptyIcon.textContent = '✂';

            const emptyTitle = document.createElement('h3');
            emptyTitle.className = 'h5 text-gold mb-2';
            emptyTitle.textContent = 'No Master Artisans Match Your Search Criteria';

            const emptyDesc = document.createElement('p');
            emptyDesc.className = 'text-secondary mb-4 small';
            emptyDesc.textContent = 'Try adjusting branch location, qualification tier, or keyword spelling.';

            const resetBtn = document.createElement('button');
            resetBtn.type = 'button';
            resetBtn.className = 'btn btn-outline-gold align-self-center';
            resetBtn.textContent = 'Reset All Filters';
            resetBtn.addEventListener('click', resetFilters);

            emptyCard.appendChild(emptyIcon);
            emptyCard.appendChild(emptyTitle);
            emptyCard.appendChild(emptyDesc);
            emptyCard.appendChild(resetBtn);
            emptyCol.appendChild(emptyCard);
            container.appendChild(emptyCol);
            return;
        }

        // Render cards
        for (let i = 0; i < list.length; i++) {
            const cardElement = createBarberCard(list[i]);
            container.appendChild(cardElement);
        }

        updateResultCounter(list.length, BARBERS_DATA.length);
    }

    /**
     * Displays a dynamic counter feedback indicator
     * @param {number} matchingCount - Count of matching items
     * @param {number} totalCount - Total items in array
     */
    function updateResultCounter(matchingCount, totalCount) {
        let counterEl = document.getElementById('barbers-result-counter');
        const filterCard = document.getElementById('barbers-filter-card');

        if (!counterEl && filterCard) {
            counterEl = document.createElement('div');
            counterEl.id = 'barbers-result-counter';
            counterEl.className = 'text-secondary small mt-2';
            filterCard.appendChild(counterEl);
        }

        if (counterEl) {
            counterEl.textContent = 'Showing ' + matchingCount + ' of ' + totalCount + ' master artisans in Astana network.';
        }
    }

    // -------------------------------------------------------------------------
    // 3. Multi-Criteria Filtering Logic
    // -------------------------------------------------------------------------

    /**
     * Filters barbers array by keyword, branch, and tier
     * Uses operations that filter, transform, and evaluate logical conditions
     * @returns {Array} Filtered list of barbers
     */
    function getFilteredBarbers() {
        const searchInput = document.getElementById('barber-search-input');
        const branchSelect = document.getElementById('barber-filter-branch');
        const tierSelect = document.getElementById('barber-filter-tier');

        const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const branchFilter = branchSelect ? branchSelect.value : 'all';
        const tierFilter = tierSelect ? tierSelect.value : 'all';

        const filtered = BARBERS_DATA.filter(function (barber) {
            // Keyword match
            const matchesKeyword = keyword === '' || 
                barber.name.toLowerCase().includes(keyword) || 
                barber.specialties.toLowerCase().includes(keyword) || 
                barber.bio.toLowerCase().includes(keyword);

            // Branch match
            const matchesBranch = branchFilter === 'all' || barber.branch === branchFilter;

            // Tier match
            const matchesTier = tierFilter === 'all' || barber.tier === tierFilter;

            return matchesKeyword && matchesBranch && matchesTier;
        });

        return filtered;
    }

    function applyFilters() {
        const matchingBarbers = getFilteredBarbers();
        renderBarbersRoster(matchingBarbers);
    }

    function resetFilters() {
        const searchInput = document.getElementById('barber-search-input');
        const branchSelect = document.getElementById('barber-filter-branch');
        const tierSelect = document.getElementById('barber-filter-tier');

        if (searchInput) searchInput.value = '';
        if (branchSelect) branchSelect.value = 'all';
        if (tierSelect) tierSelect.value = 'all';

        renderBarbersRoster(BARBERS_DATA);
    }

    // -------------------------------------------------------------------------
    // 4. Consultation Inquiry Form Validation (#form-barber-inquiry)
    // -------------------------------------------------------------------------

    function validateInquiryForm(form) {
        window.Logovo.clearFormErrors(form);

        let isValid = true;
        let firstInvalidField = null;
        const errorList = [];

        // 1. Barber Select
        const barberSelect = document.getElementById('inquiry-barber-select');
        if (!barberSelect || barberSelect.value.trim() === '') {
            window.Logovo.setFieldError(barberSelect, 'Please select a designated barber.');
            errorList.push('Barber selection is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || barberSelect;
        }

        // 2. Topic Select
        const topicSelect = document.getElementById('inquiry-topic-select');
        if (!topicSelect || topicSelect.value.trim() === '') {
            window.Logovo.setFieldError(topicSelect, 'Please choose a consultation topic.');
            errorList.push('Consultation topic is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || topicSelect;
        }

        // 3. Name (Trimmed text, min 3 chars)
        const nameInput = document.getElementById('inquiry-name-input');
        const trimmedName = window.Logovo.sanitize(nameInput ? nameInput.value : '');
        if (trimmedName.length < 3) {
            window.Logovo.setFieldError(nameInput, 'Name must contain at least 3 characters.');
            errorList.push('Name must be at least 3 characters.');
            isValid = false;
            firstInvalidField = firstInvalidField || nameInput;
        }

        // 4. Contact (Phone or Email)
        const contactInput = document.getElementById('inquiry-contact-input');
        const contactVal = window.Logovo.sanitize(contactInput ? contactInput.value : '');
        const isPhoneValid = window.Logovo.isValidPhone(contactVal);
        const isEmailValid = window.Logovo.isValidEmail(contactVal);

        if (!isPhoneValid && !isEmailValid) {
            window.Logovo.setFieldError(contactInput, 'Enter a valid telephone number (+7...) or valid email address.');
            errorList.push('A valid phone number or email is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || contactInput;
        }

        // 5. Description Text (Min 10 characters)
        const textInput = document.getElementById('inquiry-text-input');
        const trimmedText = window.Logovo.sanitize(textInput ? textInput.value : '');
        if (trimmedText.length < 10) {
            window.Logovo.setFieldError(textInput, 'Please provide more details (at least 10 characters).');
            errorList.push('Question details must be at least 10 characters.');
            isValid = false;
            firstInvalidField = firstInvalidField || textInput;
        }

        // 6. Agreement
        const agreeCheck = document.getElementById('inquiry-agree-check');
        if (!agreeCheck || !agreeCheck.checked) {
            window.Logovo.setFieldError(agreeCheck, 'Please authorize contact for grooming advice.');
            errorList.push('Contact authorization is required.');
            isValid = false;
            firstInvalidField = firstInvalidField || agreeCheck;
        }

        // Error Container
        const errorContainer = document.getElementById('inquiry-error-container');
        if (errorContainer) {
            if (!isValid) {
                errorContainer.classList.remove('is-hidden');
                errorContainer.textContent = '';

                const heading = document.createElement('strong');
                heading.className = 'd-block mb-1';
                heading.textContent = 'Please correct the following inquiry fields:';
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

    function renderInquiryTicket(details) {
        const card = document.getElementById('inquiry-confirmation-card');
        const wrapper = document.getElementById('inquiry-confirmation-wrapper');
        if (!card || !wrapper) return;

        const ticketCode = document.getElementById('inquiry-ticket-code');
        const barberNameEl = document.getElementById('inquiry-voucher-barber');
        const timingEl = document.getElementById('inquiry-voucher-timing');
        const statusBadge = document.getElementById('inquiry-status-badge');
        const noticeP = document.getElementById('inquiry-voucher-notice');

        const referenceCode = window.Logovo.generateReference('INQ');
        if (ticketCode) ticketCode.textContent = referenceCode;
        if (barberNameEl) barberNameEl.textContent = details.barberName;
        if (timingEl) timingEl.textContent = 'Within 24 Hours (Next Day 15:00)';

        if (statusBadge) {
            statusBadge.className = 'status-badge-confirmed mt-2 mt-sm-0';
            statusBadge.textContent = 'Status: Ticket Queued (Demo)';
        }

        if (noticeP) {
            noticeP.textContent = '';
            const noticeSpan = document.createElement('span');
            noticeSpan.className = 'text-warning d-block fw-semibold mb-1';
            noticeSpan.textContent = '★ Demonstration Notice: No real consultation inquiry was transmitted to a server.';
            
            const detailSpan = document.createElement('span');
            detailSpan.className = 'd-block';
            detailSpan.textContent = 'Client ' + details.clientName + ', your question on "' + details.topic + '" has been logged with code ' + referenceCode + '.';

            noticeP.appendChild(noticeSpan);
            noticeP.appendChild(detailSpan);
        }

        card.classList.add('card-dark-highlight');
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // -------------------------------------------------------------------------
    // 5. Initialization
    // -------------------------------------------------------------------------
    function initBarbersPage() {
        // Initial render with all 6 barbers
        renderBarbersRoster(BARBERS_DATA);

        // Filter Controls Listeners
        const searchInput = document.getElementById('barber-search-input');
        const branchSelect = document.getElementById('barber-filter-branch');
        const tierSelect = document.getElementById('barber-filter-tier');
        const filterBtn = document.getElementById('barber-filter-btn');
        const resetBtn = document.getElementById('barber-reset-btn');

        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }
        if (branchSelect) {
            branchSelect.addEventListener('change', applyFilters);
        }
        if (tierSelect) {
            tierSelect.addEventListener('change', applyFilters);
        }
        if (filterBtn) {
            filterBtn.addEventListener('click', applyFilters);
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', resetFilters);
        }

        // Consultation Form
        const inquiryForm = document.getElementById('form-barber-inquiry');
        if (inquiryForm) {
            inquiryForm.addEventListener('submit', function (event) {
                event.preventDefault();

                if (validateInquiryForm(inquiryForm)) {
                    const barberSelect = document.getElementById('inquiry-barber-select');
                    const topicSelect = document.getElementById('inquiry-topic-select');
                    const nameInput = document.getElementById('inquiry-name-input');

                    const details = {
                        barberName: barberSelect.options[barberSelect.selectedIndex].text,
                        topic: topicSelect.options[topicSelect.selectedIndex].text,
                        clientName: window.Logovo.sanitize(nameInput.value)
                    };

                    renderInquiryTicket(details);
                }
            });

            inquiryForm.addEventListener('reset', function () {
                setTimeout(function () {
                    window.Logovo.clearFormErrors(inquiryForm);
                }, 10);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBarbersPage);
    } else {
        initBarbersPage();
    }
})();
