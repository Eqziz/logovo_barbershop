## Session: Assignment 3 — Bootstrap Migration & Responsive Architecture
* **Date**: September 2026
* **Query / Topic**: Consultation on Bootstrap 5 CDN integration, converting custom Flexbox/Grid layouts into responsive Bootstrap grid rows/columns, configuring mobile toggler navigation, and creating a CSS cleanup mapping file.
* **AI Assistance Scope**: 
  - Explained container vs container-fluid architectural differences.
  - Guided removal of redundant Assignment 2 hand-written layout rules.
  - Provided structural Bootstrap class mapping for tables, forms, and responsive cards.
  - Formulated the `css_cleanup.md` migration table.
* **Student Verification**: All code, markup structure, and brand color overrides were manually inspected, tested in local browser DevTools at 375px, 768px, and desktop widths, and validated against the W3C Markup Validator.

---

## Session: Midterm Project — Complete Logic, Architectural Freeze & Quality Audit
* **Date**: October 4, 2026
* **Query / Topic**: Preparing codebase for JavaScript freeze, resolving incomplete user journeys (ordering from menu, booking from price list, barber consultation, application vouchers), W3C HTML5 validator requirements for `<select required>` elements and `<figure>/<figcaption>` tags, CSS state class definitions, and headless screenshot verification.
* **AI Assistance Scope**:
  - Clarified HTML5 specification regarding `<select required>` placeholder option requiring `value=""`.
  - Clarified semantic rules for `<figcaption>` inside `<figure>` versus direct section child.
  - Advised on naming schemes for JavaScript DOM hooks (`kebab-case` semantic IDs for inputs, forms, buttons, and confirmation wrappers).
  - Designed state class specifications in `css/custom.css` (`.is-hidden`, `.is-active`, `.is-selected`, `.is-error`, `.is-success`, `.is-loading`).
  - Guided structure of 3 complete visitor journeys from start to end with tangible confirmation vouchers.
* **Student Verification & Defense Readiness**:
  - Confirmed all 6 pages achieve 0 errors and 0 warnings via official W3C Nu HTML Validator API.
  - Verified 0 dead links and 0 `href="#"` across entire site using automated DOM link validation.
  - Verified mobile responsive layout with 0 horizontal scrollbar at 375px.
  - Created high-resolution desktop and mobile viewport screenshots in `screenshots/`.
  - Tagged frozen commit with git tag `midterm`.