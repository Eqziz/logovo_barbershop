# CSS Cleanup & Bootstrap Migration Mapping — Assignment 3

During the transition to Bootstrap v5.3.3, all custom layout and styling rules from Assignment 2 were eliminated and replaced with standard Bootstrap classes:

1. Removed rule: display: flex; flex-direction: row; gap: 20px;
   - Location: base.css (selector: nav ul)
   - Replacement classes: .navbar, .navbar-nav, .d-flex, .gap-2
   - Rationale: Automatic responsive collapse into a mobile toggler without custom JavaScript.

2. Removed rule: display: grid; grid-template-columns: repeat(3, 1fr);
   - Location: nodir.css (selector: .gallery-grid)
   - Replacement classes: .row, .col-12, .col-md-6, .col-lg-4
   - Rationale: Multi-breakpoint responsive grid adjusting across phones (375px), tablets (768px), and desktop with 0 horizontal overflow.

3. Removed rule: margin: 0 auto; max-width: 1200px;
   - Location: base.css (selectors: .site-header-inner, main)
   - Replacement classes: .container, .container-fluid, .mx-auto
   - Rationale: Replaced rigid widths with standardized layout containers offering native responsive gutter padding.

4. Removed rule: padding: 25px 40px; margin-bottom: 20px;
   - Location: base.css, nodir.css
   - Replacement classes: .py-2, .py-4, .my-5, .mb-4, .p-4
   - Rationale: Replaced arbitrary pixel declarations with Bootstrap's unified utility spacing scale.

5. Removed rule: width: 100%; border-collapse: collapse;
   - Location: nodir.css (selector: .price-table)
   - Replacement classes: .table, .table-dark, .table-hover, .table-responsive
   - Rationale: Out-of-the-box accessible dark table formatting with responsive horizontal scroll wrappers for narrow viewports.

6. Removed rule: float: left; margin-right: 25px; clear: both;
   - Location: nodir.css (selector: .float-interior-img)
   - Replacement classes: .row, .col-lg-7, .col-lg-5, .img-fluid
   - Rationale: Replaced legacy float behavior with a predictable flexbox-based column structure.

7. Removed rule: display: flex; justify-content: center; (for button blocks)
   - Location: nodir.css (selector: .action-btn)
   - Replacement classes: .btn, .btn-gold, .btn-lg, .d-flex
   - Rationale: Standardized interactive states (hover, active, disabled) using official button components.

8. Removed rule: position: relative; top: 15px; right: 15px; (for badge layers)
   - Location: nodir.css (selector: .badge-floating)
   - Replacement classes: .badge, .bg-gold, .text-uppercase
   - Rationale: Eliminated manual positioning coordinates in favor of semantic inline badge elements.