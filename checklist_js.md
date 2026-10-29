# JavaScript & jQuery Checklist — Assignments 4, 5 & Final jQuery (Logovo Barbershop Astana)

* **Team**: Nodir Muhammedov (Team Lead), Nurassyl Ilyas, Nurken Mamay
* **Repository**: `logovo_barbershop`
* **Milestone Tags**: `midterm` (frozen base), `assignment-4` (data, algorithms & logic), `assignment-5` (DOM & form validation), `jquery-final` (complete jQuery migration)

---

## Part 1. Vanilla JavaScript Baseline (Assignments 4 & 5)

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
| **Safe `textContent` Insertion** | All JS files | Throughout | All customer-provided text (name, notes, reviews) is inserted via `textContent` / `.text()` to prevent XSS. |
| **Preserved Plain JS Baseline** | `old-js-version.js` | Lines 1–262 | Preserves the 3 original plain JS features for side-by-side comparison against jQuery. |

---

## Part 2. Final jQuery Milestone Implementation

| Requirement / Item | File | Target Lines / Code | Implementation & Defense Justification |
| :--- | :--- | :--- | :--- |
| **CDN Link (jQuery v3.7.1)** | All HTML files | Lines ~244–260 | Linked from official CDN `https://code.jquery.com/jquery-3.7.1.min.js` prior to Bootstrap bundle and custom scripts. |
| **`$(document).ready` / `$(function)`** | All JS files | Top & bottom | Explains in comment: guarantees execution only after DOM is fully parsed in memory, avoiding errors on unrendered nodes. |
| **Rewritten Feature 1: Form Validation** | `services.js` | Lines 250–380 (`validateBookingForm`) | Replaced manual null checks & loops with `$.trim()`, `.addClass('is-error')`, `.find()`, and `.first().focus()`. Substantially shorter (-35% lines). |
| **Rewritten Feature 2: Card Generation** | `barbers.js` | Lines 85–185 (`createBarberCard`) | Replaced 65 lines of repetitive `document.createElement()` and `appendChild()` with jQuery declarative chaining and `.appendTo()`. |
| **Rewritten Feature 3: Show/Hide & Effects** | `services.js` | Lines 385–435 (`renderConfirmationVoucher`) | Replaced abrupt `classList.remove('is-hidden')` with fluid `.slideDown(400, callback)` and smooth scroll animation. |
| **Selector: by ID (`#id`)** | All JS files | e.g. `$('#form-booking')`, `$('#site-footer')` | Direct high-performance DOM selection. |
| **Selector: by Class (`.class`)** | `services.js` | `$('.select-service-btn')`, `$('.is-error')` | Targets grouped interactive and error state elements. |
| **Selector: by Element (`tag`)** | `services.js` | `$('tr')`, `$('strong')`, `$('li')` | Scoped child selections. |
| **Selector: by Attribute (`[attr]`)** | `services.js` | `$('select[name="booking_service"]')` | Selects form inputs by HTML name attribute. |
| **Selector Filters (`:first`, `:checked`, `:selected`)** | `services.js` | Lines 360, 470 | Uses `:checked` for checkbox verification and `:selected` for active dropdown text. |
| **Traversal: `.find()`** | `services.js` | Lines 268, 470 | Scopes searches to descendants of a specific form or card container. |
| **Traversal: `.closest()`** | `services.js` | Line 458 (`$(this).closest('tr')`) | Reaches ancestor table row from clicked action button without hardcoded IDs. |
| **Traversal: `.siblings()`** | `services.js` | Line 188, Line 468 | Targets and manipulates adjacent sibling table rows and field error messages. |
| **Traversal: `.parent()`** | `main.js`, `feedback.js` | Line 106 | Traverses up to immediate parent wrapper to append error messages or counters. |
| **Traversal: `.each()`** | `main.js`, `services.js`, `barbers.js` | `$.each(errorList, ...)` | Iterates error array and DOM collections cleanly. |
| **`$(this)` inside Handlers** | `services.js`, `barbers.js` | Multiple handlers | Refers to clicked button (`.select-service-btn`), active input on `input change`, and link in `.each()`. |
| **Chaining of ≥ 3 Methods** | `services.js` | Lines 188–191 | `$('#' + targetRowId).addClass('selected-state').siblings('tr').removeClass('selected-state');` with link-by-link comment explanation. |
| **Method: `.text()`** | All JS files | Throughout | Safely injects text content with automatic HTML entity escaping (XSS protection). |
| **Method: `.html()`** | `services.js`, `barbers.js` | Lines 415, 380 | Used strictly for structured message formatting with trusted HTML tags (`<span>`, `<strong>`). |
| **Method: `.val()`** | All JS files | Throughout | Reads and updates form control values cleanly (e.g. `$serviceSelect.val(id)`). |
| **Method: `.attr()`** | All JS files | Throughout | Reads/updates static HTML attributes such as `aria-invalid`, `data-barber-id`, and `aria-current`. |
| **Method: `.prop()`** | `services.js`, `feedback.js` | Lines 360, 230 (`$agreeCheck.prop('checked')`) | Inspects dynamic boolean state of checkbox; comment explains why `.attr()` is wrong for live checkboxes. |
| **Appearance via Class Methods** | All JS files | `.addClass()`, `.removeClass()` | Swaps pre-existing frozen CSS classes (`.is-hidden`, `.is-error`, `.selected-state`, `.status-badge-confirmed`). |
| **Card/List Building (`.append` / `.appendTo`)** | `barbers.js` | Lines 100–180 (`createBarberCard`) | Cards are constructed from data array in code; zero hardcoded card markup exists in HTML. |
| **Event Binding via `.on()`** | All JS files | Throughout | All listeners attached strictly via `.on('click')`, `.on('submit')`, `.on('input change')`. |
| **Delegated Event Handler** | `services.js`, `barbers.js` | Line 452 (`#services-table-body`), Line 410 (`#barbers-roster-container`) | Bound to existing parent; comment explains why direct binding fails for dynamically created items. |
| **`event.preventDefault()`** | All forms & buttons | In all form `submit` & anchor `click` handlers | Comment explains browser would reload and destroy client state without it. |
| **Effects with Duration & Callback** | `services.js`, `barbers.js` | Lines 425–430 (`.slideDown(400, callback)`) | Discloses voucher smoothly and scrolls viewport in completion callback. |
| **Effects: `.fadeOut()` & `.fadeIn()`** | All JS files | In error clearing and review card insertion | Provides smooth visual removal and insertion of feedback elements. |
| **Field-level Error Presentation** | All forms | Lines 90–100 (`main.js`) | Injects specific error message beside each invalid field; focuses first invalid field. |
| **Browser vs Server Validation Note** | `services.js` | Lines 260–265 | Comment explains client validation is UX-only; server validation is mandatory for real security. |
| **Zero Console Errors** | All pages | Verified | 0 console errors, 0 mixed vanilla/jQuery calls, 0 inline event attributes. |
