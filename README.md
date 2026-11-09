# Logovo Barbershop Astana — Web Technologies Midterm Project

## 1. Project Overview & Organization
* **Theme**: Authentic Men's Barbershop & Lounge Club "Logovo" (Барбершоп «Логово») in Astana.
* **Physical Location**: 17/1 Syganak St, Astana, Kazakhstan (Flagship Lounge), with branches at Kabanbay Batyr Ave and Mangilik El Ave.
* **Project Stage**: Midterm Project — Complete Logic, Coherent Single-Site Experience, and HTML/CSS Freeze for JavaScript.
* **Technical Floor**: 
  - Semantic HTML5 passing the official W3C Nu Validator with **0 errors and 0 warnings**.
  - Zero browser console errors.
  - Zero broken links, zero broken images, zero `href="#"` or placeholder strings.
  - Fully responsive across mobile (375px), tablet (768px), and desktop viewports without horizontal scrollbars.
  - Bootstrap v5.3.3 grid/utility foundation complemented by a custom brand correction layer (`css/custom.css`).

---

## 2. Team Composition & Page Distribution
The site consists of 6 interconnected local HTML documents adhering to unified design, typography, navigation, and state systems:

| Team Member | Role | Assigned Pages | Stylesheet Layer |
| :--- | :--- | :--- | :--- |
| **Nodir Muhammedov** | Team Lead | `index.html`, `services.html` | `css/custom.css` |
| **Nurassyl Ilyas** | Frontend Developer | `barbers.html`, `feedback.html` | `css/custom.css` |
| **Nurken Mamay** | Frontend Developer | `marketbar.html`, `careers.html` | `css/custom.css` |

---

## 3. Directory Structure

```text
logovo_barbershop/
├── css/
│   └── custom.css             # Unified brand styles, voucher card aesthetics, and JS state classes
├── images/
│   ├── photo1.jpg             # Reception & lounge waiting area
│   ├── photo2.jpg             # Master barber workstations & hydraulic chairs
│   ├── photo3.jpg             # Tool preparation & autoclave sanitation floor
│   └── photo4.jpg             # Handcrafted hospitality bar counter
├── screenshots/
│   ├── desktop.png            # Desktop overview
│   ├── mobile.png             # Mobile overview
│   ├── desktop_index.png      # Home page desktop
│   ├── mobile_index.png       # Home page mobile (375px)
│   ├── desktop_services.png   # Services & pricing desktop
│   ├── mobile_services.png    # Services & pricing mobile (375px)
│   ├── desktop_barbers.png    # Barbers roster desktop
│   ├── mobile_barbers.png     # Barbers roster mobile (375px)
│   ├── desktop_marketbar.png  # MarketBar dispensary desktop
│   ├── mobile_marketbar.png   # MarketBar dispensary mobile (375px)
│   ├── desktop_careers.png    # Careers & academy desktop
│   ├── mobile_careers.png     # Careers & academy mobile (375px)
│   ├── desktop_feedback.png   # Guest feedback & QA desktop
│   └── mobile_feedback.png    # Guest feedback & QA mobile (375px)
├── barbers.html               # Master roster, filters, credentials, direct consultation inquiry
├── careers.html               # Open vacancies, apprentice track, candidate dossier application
├── feedback.html              # Quality audit registry, ratings, verified customer impressions
├── index.html                 # Hero, hallmarks, floor specs, branch hours, loyalty program
├── marketbar.html             # Apothecary dispensary catalog, lounge bar menu, pre-order form
├── services.html              # Service tariffs, duration specs, price estimate box, booking form
├── ai_log.md                  # Detailed log of AI consultations and architectural queries
├── checklist_css.md           # CSS property and selector reference checklist
├── css_cleanup.md             # Migration mapping from custom CSS to Bootstrap utilities
└── README.md                  # Comprehensive project documentation & defense reference
```

---

## 4. Three Complete User Journeys

Every visitor interaction on the site is complete and finishes end to end without dead ends or administrative dependencies:

### Journey 1: Browse Services, Estimate Total, and Book an Appointment
* **Start**: Visitor lands on `index.html` seeking haircut options and rates in Astana.
* **Steps**:
  1. Visitor clicks the hero call-to-action **"View Price List"** (`#hero-btn-services`), navigating smoothly to `services.html#service-tariff-table`.
  2. Visitor inspects the verified 2026 tariff table comparing durations and prices (e.g. *Signature Classic Scissor Cut* at 7 000 KZT vs *Skin Fade Clipper Cut* at 5 000 KZT).
  3. Visitor clicks **"Book Service"** on the Signature Classic Scissor Cut row (`#btn-select-service-1`).
  4. The page scrolls directly to the **"Reserve Your Chair at Logovo"** booking form (`#booking-section`), where the service is pre-selected and the total estimate box displays `7 000 KZT (Est. Duration: 50 min)`.
  5. Visitor selects the preferred branch (`Syganak Flagship`), chooses master barber (`Azamat Tleubergenov`), picks a date and time slot (`October 5, 2026 at 11:30 AM`), enters contact details, and clicks **"Submit Reservation"** (`#booking-submit-btn`).
* **End**: The visitor receives an immediate digital confirmation voucher (`#booking-confirmation-wrapper`) displaying voucher code `LGV-2026-BK-492`, reserved time, assigned chair, and explicit instructions that an SMS confirmation will arrive within 15 minutes.

---

### Journey 2: Explore Barber Roster, Filter by Branch/Tier, and Book with Master Azamat
* **Start**: Visitor lands on `index.html` and reads the quote by Head Barber Azamat regarding traditional wet shaving.
* **Steps**:
  1. Visitor clicks **"Read Azamat's Profile & Book →"** (`#link-azamat-profile`) on the quote callout, navigating to `barbers.html#barber-azamat`.
  2. On `barbers.html`, visitor interacts with the filter bar (`#barbers-filter-card`) by branch (`Syganak`) and artisan tier (`Chief Executive Barber`) to view qualified cutters.
  3. Visitor reads Azamat's credentials (9 years experience, European Barber Guild certified, master of anatomical scissor architecture).
  4. Convinced of the master's experience, visitor clicks **"Book Chair with Azamat"** (`#btn-book-azamat`).
* **End**: The link transfers the visitor to `services.html#booking-section` with Head Barber Azamat designated as the requested master, completing the reservation flow directly without redundant steps.

---

### Journey 3: Explore MarketBar Apothecary, Select Grooming Products, and Place an In-Store Pre-Order
* **Start**: Visitor browsing `index.html` notices the **"Apothecary Cosmetics"** hallmark or **"Club Loyalty Program"** banner offering 10% cashback.
* **Steps**:
  1. Visitor clicks **"Shop Dispensary"** (`#link-hallmark-apothecary`), opening `marketbar.html#apothecary-catalog`.
  2. Visitor reviews the dispensary catalog and price list for home grooming essentials (clay, organic beard oil, clarifying shampoo, espresso).
  3. Visitor chooses *Extreme Hold Matte Finish Clay (100 ml - 7 500 KZT)* and clicks **"Reserve Item"** (`#btn-select-product-1`).
  4. The page smoothly focuses on the **"Dispensary Pre-Order & Desk Pickup"** section (`#order-reserve-section`).
  5. Visitor confirms quantity `1`, chooses pickup branch `Syganak Flagship`, provides name and contact phone, views the auto-calculated counter total in the summary box (`#order-total-price`), and clicks **"Confirm Reservation"** (`#order-submit-btn`).
* **End**: The visitor is presented with a designated **Dispensary Pickup Voucher** (`#order-confirmation-wrapper`) bearing reservation code `MKT-2026-RES-712`, holding guarantee for 48 hours, and exact desk collection instructions.

---

### Supplementary Complete Flows
* **Direct Barber Consultation**: On `barbers.html#barber-inquiry-section`, visitors with grooming or hair queries can submit a question directly to senior barbers and receive an immediate **Consultation Ticket** (`INQ-2026-AZM-104`) with guaranteed 24-hour response turnaround.
* **Client Quality Control Registry**: On `feedback.html#feedback-form-section`, guests submit detailed service audits and immediately receive an official **Audit Receipt** (`AUDIT-2026-QA-582`) routed to executive management, alongside verified testimonials from capital clients.
* **Candidate Dossier Application**: On `careers.html#careers-form-section`, haircutters and prospective academy apprentices review open vacancies and submit credentials, receiving an immediate **HR Dossier Voucher** (`DOSSIER-2026-HR-319`) detailing the 3-day audition timeline.

---

## 5. Preparation for JavaScript: The Architectural Freeze

From this milestone onward, HTML and CSS are strictly frozen. All upcoming dynamic functionality in subsequent assignments will interact with the following pre-established hooks:

### A. Element ID Conventions
All IDs are written in lowercase English hyphenated notation (`kebab-case`) following strict semantic scopes:
* **Forms**: `form-booking`, `form-barber-inquiry`, `form-market-order`, `form-careers`, `form-feedback`
* **Inputs & Controls**: `<entity>-<field>-<type>` (e.g., `booking-service-select`, `booking-date-input`, `order-quantity-input`, `fb-comments-input`, `cand-portfolio-input`)
* **Interactive Buttons**: `<entity>-<action>-btn` (e.g., `booking-submit-btn`, `booking-reset-btn`, `barber-filter-btn`, `order-submit-btn`)
* **Confirmation Wrappers**: `booking-confirmation-wrapper`, `inquiry-confirmation-wrapper`, `order-confirmation-wrapper`, `careers-confirmation-wrapper`, `feedback-confirmation-wrapper`

### B. Empty Target Containers for Dynamic Generation
Containers with designated IDs have been placed in markup ready for future JavaScript DOM insertion:
* `#selected-services-list`: Target container for dynamic itemized lists of selected haircut services.
* `#summary-total-price` & `#summary-total-duration`: Dynamic numerical targets for runtime pricing calculations.
* `#booking-error-container`, `#order-error-container`, `#inquiry-error-container`, `#cand-error-container`, `#fb-error-container`: Pre-styled error alert containers for client-side validation messages.
* `#new-reviews-dynamic-target`: Target container for runtime customer review submissions on the feedback page.

### C. Pre-Styled CSS State Classes (`css/custom.css`)
State classes have been authored and tested in advance so that JavaScript only needs to toggle class names:
* **Hidden**: `.is-hidden`, `.hidden`, `.state-hidden` (`display: none !important`), `.is-invisible` (`visibility: hidden`).
* **Active**: `.is-active`, `.state-active`, `.active-state` (gold border accent and translucent background tint).
* **Selected**: `.is-selected`, `.state-selected`, `.selected-state` (golden halo focus ring and dark amber background).
* **Error**: `.is-error`, `.has-error`, `.state-error`, `.text-error`, `.alert-error-box` (crimson border, soft red highlight, error typography).
* **Success**: `.is-success`, `.has-success`, `.state-success`, `.text-success-custom`, `.alert-success-box` (emerald green border, success badge typography).
* **Loading**: `.is-loading`, `.state-loading` (dimmed opacity, `pointer-events: none`, wait cursor).

---

## 6. Single-Site Coherence & Design Rules

To ensure seamless brand unity across the entire project:
1. **Identical Navigation Header**: Unified header structure (`#site-header`), brand wordmark (`#brand-link`), mobile toggler button (`#navbar-toggle-btn`), and matching order of 6 navigation links across all pages (`Home`, `Services & Pricing`, `Barbers`, `MarketBar`, `Careers`, `Feedback`).
2. **Identical Footer**: Comprehensive, responsive 3-column footer across all 6 pages containing verified Astana physical address (17/1 Syganak St), official working hours (Mon–Sun 10:00–22:00), direct telephone (`+7 701 218-19-19`), corporate email, 2GIS interactive map link, and 2026 copyright statement.
3. **Unified Page Title Pattern**: `<Page Name> — Logovo Barbershop Astana` applied uniformly to every document.
4. **Button & Palette Hierarchy**: 
   - Gold filled primary button: `.btn-gold` (`#c59b27`)
   - Gold outline secondary button: `.btn-outline-gold`
   - Subtle action button: `.btn-secondary`, `.btn-outline-secondary`
   - Dark luxury card surfaces: `.card-dark` (`#242424`) with subtle borders (`#383838`)
5. **No Author Identifiers**: All pages present a unified organizational voice without per-student differences.

---

## 7. Quality Pass Audit & Fix Log

Prior to freezing the repository, a thorough multi-device audit was executed across all pages:

| Audited Component | Issue Found During Pass | Root Cause | Resolution Implemented |
| :--- | :--- | :--- | :--- |
| **`index.html`** | Blockquote footer warning in validator | `<figcaption>` used directly under `<section>` | Enclosed quote in semantic `<figure>` container with `<figcaption>`. |
| **`services.html`** | Missing booking completion flow | Prices listed with no direct way to book or estimate | Implemented calculation summary widget, per-service booking buttons, and complete booking form with instant confirmation voucher. |
| **`barbers.html`** | Disconnected roster and no consultation channel | Only text descriptions of branches, no master cards or inquiry form | Added detailed master profile cards with "Book Chair" buttons and a direct barber consultation form with receipt voucher. |
| **`marketbar.html`** | Unfinished product ordering logic | Products shown in table without ordering mechanism | Implemented dispensary pre-order reservation form, dynamic quantity/price display, and 48-hour pickup voucher. |
| **`feedback.html`** | Form action was `action="#"` with no result display | Visitor submits audit without feedback or confirmation | Replaced `action="#"` with `#feedback-confirmation-wrapper`, added clear explanation of QA review steps, and added instant audit confirmation card. |
| **`careers.html`** | Missing vacancies details and submit result | Static text with no role definitions or submission voucher | Added 3 distinct vacancy cards, candidate track selector, and registered dossier confirmation voucher. |
| **Form Controls** | W3C validation errors on `<select required>` | First `<option>` lacked empty `value=""` placeholder | Added standardized `<option value="">-- Choose Option --</option>` to all required dropdowns. |
| **Responsiveness** | Floating button collision on small devices | Button occupied horizontal space on narrow viewports | Added `d-none d-sm-inline-block` utility classes; verified 0 horizontal overflow at 375px. |

---

## 8. Technical Floor Verification Summary
* **W3C Nu HTML Validator**: Tested via official W3C Nu API (`https://validator.w3.org/nu/?out=json`). **Result: 0 Errors, 0 Warnings across all 6 pages.**
* **Broken Links Audit**: Verified via automated DOM script (`scratch/verify_site.py`). **Result: 0 dead links, 0 `href="#"`, 0 missing anchors.**
* **Local Images**: 4 authentic high-resolution local photography assets (`photo1.jpg` through `photo4.jpg`), all valid with descriptive `alt` attributes.
* **Screenshots**: High-resolution desktop (1280px) and mobile (375px) captures stored in `screenshots/` directory for all pages.
* **Git Freeze Tag**: Frozen under git tag `midterm`.

---

## 9. Assignment 4–5 Functionality Plan & Individual Contributions

In accordance with front-end engineering requirements, every student implemented at least two substantial features on their assigned pages, alongside shared site-wide utilities:

| Page | Visitor Goal | Planned Function | Expected Result | Responsible Student |
| :--- | :--- | :--- | :--- | :--- |
| **All Pages** | Recognize site status and active location | `setupDemonstrationNotice()` & `syncNavigation()` in `js/main.js` | Injects accessible academic demonstration banner into footer; highlights current nav link with gold active state. | **Entire Team (Shared)** |
| `services.html` | Estimate total grooming investment and duration | `calculateServiceEstimate()` & `updateEstimateSummary()` in `js/services.js` | Real-time calculation of service fee and duration from data array (`SERVICES_DATA`); updates summary widget and highlights table row. | **Nodir Muhammedov (Team Lead)** |
| `services.html` | Schedule a confirmed master haircut slot | `validateBookingForm()` & `renderConfirmationVoucher()` in `js/services.js` | Validates trimmed name, phone regex (+7...), future date (< 60 days), and combined Master-Branch compatibility rule; generates demo voucher with `Math.random()` reference. | **Nodir Muhammedov (Team Lead)** |
| `barbers.html` | Discover skilled artisans matching criteria | `renderBarbersRoster()` & `getFilteredBarbers()` in `js/barbers.js` | Dynamically renders barber profile cards from `BARBERS_DATA` via DOM methods; filters by keyword, branch, and tier with result count and empty state card. | **Nurassyl Ilyas (Frontend Dev)** |
| `barbers.html` | Request expert haircut or beard consultation | `validateInquiryForm()` & `renderInquiryTicket()` in `js/barbers.js` | Validates master, topic, contact, and detailed text (> 10 chars); outputs official consultation ticket voucher with 24h turnaround indicator. | **Nurassyl Ilyas (Frontend Dev)** |
| `feedback.html` | Audit visit and inspect verified client impressions | `renderReviewsList()`, `setupCharacterCounter()` & `validateFeedbackForm()` in `js/feedback.js` | Live character counter on comments textarea; validates rating and critique depth; prepends newly submitted review card to DOM list using same render function. | **Nurassyl Ilyas (Frontend Dev)** |
| `marketbar.html` | Pre-order styling cosmetics for counter pickup | `calculateOrderTotal()`, `validateMarketOrderForm()` & `renderOrderVoucher()` in `js/marketbar.js` | Multiplies unit price by validated quantity (1–10); validates customer credentials; generates 48-hour dispensary hold voucher. | **Nurken Mamay (Frontend Dev)** |
| `careers.html` | Submit professional credentials for open tracks | `setupVacancyTrackSelectors()` & `validateCareersForm()` in `js/careers.js` | Auto-selects track on button click; validates experience vs track combined rule (≥ 3 yrs for Senior Barber, ≤ 1 yr for Apprentice); outputs HR dossier voucher. | **Nurken Mamay (Frontend Dev)** |

---

## 10. JavaScript & jQuery Architecture: Endterm Milestone

### A. Team Division & Technological Separation
In compliance with the Endterm specification (**"Keep the two apart: a feature is either plain JavaScript or jQuery, never both, and keep them in separate files"**), each developer maintains distinct, un-mixed modules across the two paradigms:

| Team Member | Role | Plain JavaScript Module (Weeks 6–8) | jQuery Module (Weeks 9–10) | Assigned HTML Pages |
| :--- | :--- | :--- | :--- | :--- |
| **Nodir Muhammedov** | Team Lead | `js/main.js` (Shared utilities, navigation sync, demo notice, regex validators) | `js/services.js` (Tariffs table traversal, method chaining, slideDown effects, booking form validation) | `index.html`, `services.html` |
| **Nurassyl Ilyas** | Frontend Developer | `js/barbers.js` (Dynamic DOM card loop, multi-filter, experience stats, delegated booking listener) | `js/feedback.js` (Dynamic review feed, average rating calculation, slideDown animation, QA form validation) | `barbers.html`, `feedback.html` |
| **Nurken Mamay** | Frontend Developer | `js/marketbar.js` (Catalog array, loop construction, cart total calculation with 10% discount condition) | `js/careers.js` (Vacancy accordion with slideToggle, traversal chaining, academy application form validation) | `marketbar.html`, `careers.html` |

---

### B. Plain JavaScript Features (Weeks 6–8)

#### 1. Data in Arrays & Objects at Top of File
- `js/barbers.js`: `BARBERS_DATA` contains 6 master barber objects with 7 meaningful attributes (`id`, `name`, `tier`, `branch`, `experienceYears`, `specialties`, `bio`).
- `js/marketbar.js`: `PRODUCTS_DATA` contains 6 apothecary product objects (`id`, `name`, `category`, `volume`, `unitPrice`, `inStock`, `description`).
- Zero cards or products are hardcoded in the HTML markup; everything is synthesized via loops.

#### 2. Loop-Based DOM Construction & Reusable Functions
- `createBarberCard(barber)` in `barbers.js`: constructs card markup using `document.createElement()`, `classList.add()`, and `appendChild()`.
- `createProductCard(product)` in `marketbar.js`: dynamically builds catalog elements.
- Reusable utility functions with parameters and return values called across multiple modules: `window.Logovo.formatPrice(amount)`, `window.Logovo.formatDuration(minutes)`, `window.Logovo.generateReference(prefix)`, `window.Logovo.isValidPhone(phone)`, `window.Logovo.isValidEmail(email)`.

#### 3. Real Arithmetic Calculations & Conditions
- **Cart Total & Discount Condition (`marketbar.js`)**:
  - Accumulates item count and order subtotal dynamically.
  - **Conditional Calculation**: If order total $\ge 15\,000\text{ KZT}$, a 10% club discount is computed dynamically:
    $$\text{Discount} = \text{Subtotal} \times 0.10$$
    $$\text{Final Total} = \text{Subtotal} - \text{Discount}$$
- **Dynamic Statistics (`barbers.js`)**: Calculates active master count and average experience across the roster.

#### 4. Event Binding & Pure JS Delegation
- No `onclick` attributes in HTML.
- At least three event types utilized: `click`, `input`, `change`, `submit`.
- **Pure JavaScript Event Delegation**:
  - `barbers.js`: `#barbers-roster-container` listens for bubbling clicks on dynamically rendered `.btn-book-chair` elements using `event.target.closest('.btn-book-chair')`.
  - `marketbar.js`: `#marketbar-catalog-container` listens for clicks on dynamic `+ Add to Order` buttons.

#### 5. Plain JavaScript Form Validation
- Prevents default submit (`event.preventDefault()`).
- Trims values and inspects Kazakhstan phone regex (`/^(\+7|8|7)7\d{9}$/`) and email format.
- Displays accessible inline errors via `.is-error` next to invalid fields; focuses the first invalid element; removes errors dynamically on `input` and `change`.
- Generates a simulated confirmation voucher upon valid submission.

---

### C. jQuery Features (Weeks 9–10)

#### 1. CDN Connection & DOM Ready Lifecycle
- Linked via official CDN (`https://code.jquery.com/jquery-3.7.1.min.js`) before Bootstrap bundle and page scripts.
- Execution safely deferred via `$(function () { ... })` (`$(document).ready` shorthand).

#### 2. Selectors Variety
- By ID: `$('#booking-form')`, `$('#services-table-body')`, `$('#feedback-form')`
- By Class: `$('.service-row')`, `$('.btn-select-service')`, `$('.is-error')`
- By Element: `$('tr')`, `$('option')`, `$('input')`
- By Attribute: `$('select[name="booking_service"]')`, `$('#career-form [required]')`
- By Filters: `:first` (first invalid field focus), `:checked` (branch radio selection), `:selected` (active dropdown option).

#### 3. Traversal & Method Chaining ($\ge 3$ Methods)
- **Chain 1 (`services.js`)**:
  ```javascript
  $(this)
      .closest('tr')
      .addClass('selected-state')
      .siblings()
      .removeClass('selected-state');
  ```
  *Explanation*: Traverses up to the ancestor table row `<tr>`, applies the active highlighted class, selects all sibling rows, and strips the highlight class from them.
- **Chain 2 (`careers.js`)**:
  ```javascript
  $(this)
      .closest('.vacancy-card')
      .find('.vacancy-details')
      .slideToggle(300)
      .closest('.vacancy-card')
      .siblings()
      .find('.vacancy-details')
      .slideUp(250);
  ```
  *Explanation*: Traverses up to the active vacancy card, toggles the details panel with a 300ms slide effect, moves to adjacent sibling vacancy cards, and folds their open detail panels.

#### 4. Purposeful jQuery Effects with Callbacks
- `.slideDown(400, callback)`: Smoothly unfolds booking and feedback confirmation vouchers; scrolls the viewport to the voucher upon completion.
- `.slideToggle(300)`: Interactive accordion disclosure on career vacancies.
- `.fadeOut(200, callback)`: Smoothly fades out inline field error messages before removing them from the DOM.

#### 5. Event Delegation with jQuery `.on()`
- `services.js`: `$('#services-table-body').on('click', '.btn-select-service', handler)`
- Catches bubbling clicks for dynamic tariff selections without re-attaching listeners.

---

### D. What Was Extended Since Previous Defenses
- **Unified Endterm Single-Site Architecture**: Harmonized the 6 pages so a single visitor can navigate, browse dynamic cards, apply multi-criteria filters, calculate pricing with discounts, book appointments, submit reviews, and receive simulated confirmation vouchers with unique token references.
- **Full Empty-State Handling**: If search or category filters yield zero items, an explicit, informative empty state banner is rendered rather than leaving a blank container.
- **Strict Separation of Concerns**: Ensured 100% strict isolation: `barbers.js`, `marketbar.js`, and `main.js` run on pure Plain JavaScript; `services.js`, `feedback.js`, and `careers.js` run on pure jQuery. Zero cross-paradigm mixing inside any feature.
- **Midterm Freeze Integrity**: Maintained 100% compliance with the midterm HTML/CSS freeze (0 new hand-written CSS rules, 0 new hand-written HTML elements after midterm tag).

---

### E. Milestone Git Tags
* `midterm`: Initial semantic HTML5/CSS3 frozen baseline.
* `assignment-4`: Core data arrays, algorithmic traversal, filtering, and calculation flows.
* `assignment-5`: Native DOM generation, event listeners, and accessible field-level form validation.
* `jquery-final`: Full jQuery integration, traversal, effects, and delegation.
* `endterm`: Final project release integrating both Plain JavaScript and jQuery modules across the team.
