# JavaScript Checklist — Assignment 4 & 5 (Logovo Barbershop Astana)

* **Team**: Nodir Muhammedov (Team Lead), Nurassyl Ilyas, Nurken Mamay
* **Repository**: `logovo_barbershop`
* **Milestone Tags**: `midterm` (frozen base), `assignment-4` (data, algorithms & logic), `assignment-5` (DOM, events & form validation)

| Requirement / Item | File | Target Function / Lines | Architectural Role & Implementation Details |
| :--- | :--- | :--- | :--- |
| **Strict Mode (`'use strict';`)** | All JS files | Line 6 or 7 | Enforces strict syntax mode across `main.js`, `services.js`, `barbers.js`, `feedback.js`, `marketbar.js`, and `careers.js`. |
| **Modern Variable Declarations** | All JS files | Throughout | Exclusively uses `const` for immutables and `let` for reassigned state. Zero `var` statements. |
| **Strict Equality (`===` / `!==`)** | All JS files | Throughout | Strict comparisons with zero type coercion. Zero loose equality operators (`==` or `!=`). |
| **Array of ≥ 6 Objects (≥ 4 Props)** | `services.js` | Lines 14–60 (`SERVICES_DATA`) | 6 service tariff objects with `id`, `name`, `category`, `duration`, `price`, `description`. |
| **Array of ≥ 6 Objects (Barbers)** | `barbers.js` | Lines 14–78 (`BARBERS_DATA`) | 6 master objects with `id`, `name`, `tier`, `branch`, `experienceYears`, `specialties`, `bio`. |
| **Array of ≥ 6 Objects (Reviews)** | `feedback.js` | Lines 14–61 (`REVIEWS_DATA`) | 6 verified client reviews with `id`, `author`, `rating`, `branch`, `date`, `comment`. |
| **Array of ≥ 6 Objects (Catalog)** | `marketbar.js` | Lines 14–68 (`PRODUCTS_DATA`) | 6 grooming products with `id`, `name`, `category`, `volume`, `unitPrice`, `inStock`, `description`. |
| **Array Traversal / Find** | `services.js` | Lines 84–95 (`findServiceById`) | Iterates service catalog loop to match exact identifier. |
| **Array Filtering (`.filter()`)** | `barbers.js` | Lines 244–271 (`getFilteredBarbers`) | Multi-condition filter combining keyword search, branch location, and artisan tier. |
| **Function-Calling-Function** | `services.js` | Lines 102–126 (`calculateServiceEstimate`) | Reusable calculation function calling both `findServiceById()` and `window.Logovo.formatPrice()`. |
| **Meaningful Arithmetic** | `marketbar.js` | Line 115 (`totalAmount = unitPrice * validQty`) | Computes subtotal by multiplying unit rate with validated item counter. |
| **Meaningful `Math.random()`** | `main.js` | Lines 40–45 (`generateReference`) | Generates realistic, non-repeating simulated voucher tokens (e.g. `LGV-2026-BK-481`). |
| **Safe `textContent` Insertion** | All JS files | Throughout | All customer-provided text (name, notes, reviews) is inserted via `textContent` to prevent XSS. |
| **DOM Creation (`createElement`)** | `barbers.js` | Lines 88–156 (`createBarberCard`) | Dynamically constructs complete profile cards with badges, headings, and buttons. |
| **DOM Prepending / Insertion** | `feedback.js` | Lines 296–308 (`renderFeedbackSuccess`) | Prepends newly submitted customer review card into `#reviews-list-container` via `insertBefore()`. |
| **Empty State Handling** | `barbers.js` | Lines 168–198 (`renderBarbersRoster`) | Renders accessible empty state card with reset button when filter matches zero masters. |
| **Dynamic Result Count Feedback** | `barbers.js` | Lines 212–226 (`updateResultCounter`) | Real-time counter: "Showing X of Y master artisans in Astana network". |
| **Interactive Event 1: `submit`** | `services.js` | Lines 448–477 (`form.addEventListener('submit')`) | Intercepts form submission, performs field validation, and prevents page refresh. |
| **Interactive Event 2: `click`** | `services.js` | Lines 434–445 (`button.addEventListener('click')`) | Binds table "Book Service" buttons to interactive form preselection. |
| **Interactive Event 3: `input`** | `feedback.js` | Lines 126–152 (`setupCharacterCounter`) | Real-time live character countdown listener on comments textarea. |
| **Interactive Event 4: `change`** | `marketbar.js` | Line 280 (`productSelect.addEventListener('change')`) | Automatically recalibrates counter total when product selection changes. |
| **CSS Class Toggling (`classList`)** | All JS files | Throughout | Toggles `.is-hidden`, `.is-error`, `.selected-state`, `.status-badge-confirmed` without inline style generation. |
| **Form Validation: Trimmed Text** | `services.js` | Lines 275–288 | Validates full name with trimming and alphabetic/hyphen validation. |
| **Form Validation: Telephone** | `main.js` | Lines 61–67 (`isValidPhone`) | Validates official Kazakhstan telephone patterns (`+7...` or `8...`). |
| **Form Validation: Email** | `main.js` | Lines 73–77 (`isValidEmail`) | Validates standard email address regex. |
| **Form Validation: Date Rules** | `services.js` | Lines 180–208 (`validateBookingDate`) | Rejects past dates and disallows scheduling beyond 60 days in advance. |
| **Combined Rule: Master & Branch** | `services.js` | Lines 210–223 (`validateBarberBranchCompatibility`) | Validates that designated master (e.g. Azamat) is resident at selected branch (Syganak). |
| **Combined Rule: Exp & Track** | `careers.js` | Lines 90–114 (`validateExperienceForTrack`) | Enforces ≥ 3 yrs for Senior Barber, ≤ 1 yr for Apprentice, and ≥ 1 yr for Administrator. |
| **Combined Rule: Rating & Feedback**| `feedback.js` | Lines 212–219 | Requires at least 30 characters of constructive critique for low ratings (≤ 2 stars). |
| **Accessible Error Presentation** | All JS files | Throughout | Inserts specific `.text-error` beside invalid fields and focuses first invalid field. |
| **Demonstration Disclaimer** | All JS files | In all vouchers & notices | States: *"Demonstration Request Only: No real booking, payment, or order is created."* |
