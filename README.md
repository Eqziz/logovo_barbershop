# Logovo Barbershop Astana — Web Technologies Course Project

## 1. Project Overview & Organization
* Theme: Authentic Men's Barbershop & Lounge Club "Logovo" (Барбершоп «Логово») in Astana.
* Physical Location: 17/1 Syganak St, Astana, Kazakhstan.
* Assignment Stage: Assignment 3 — Bootstrap Framework Integration, Responsive Grid, Utility Classes, and CSS Clean-up Layer.
* Framework Stack: Bootstrap v5.3.3 (CSS & JS Bundle CDN) + Custom Brand Correction Layer (css/custom.css).
* Validation: Semantic HTML5 (0 W3C errors) and clean responsive layout without framework conflicts or horizontal scrollbars at 375px.

## 2. Team Composition & Page Distribution
The site consists of 6 interconnected local HTML documents across 3 team members (2 pages per author):

* Nodir Muhammedov (Team Lead): index.html, services.html, feedback.html | Stylesheet: css/custom.css
* Nurassyl Ilyas (Frontend Developer): barbers.html (co-author feedback) | Stylesheet: css/custom.css
* Nurken Mamay (Frontend Developer): marketbar.html, careers.html | Stylesheet: css/custom.css

## 3. Directory Structure

barbershop-logovo/
├── css/
│   └── custom.css
├── images/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   ├── photo3.jpg
│   └── photo4.jpg
├── screenshots/
│   ├── desktop.png
│   ├── tablet.png
│   ├── mobile.png
│   └── nav_collapsed.png
├── index.html
├── services.html
├── feedback.html
├── barbers.html
├── marketbar.html
├── careers.html
├── css_cleanup.md
├── ai_log.md
└── README.md

## 4. Key Architectural Implementations (Assignment 3)

### A. Container Strategy
* container-fluid: Applied to header navigation and footer to span 100% of the viewport seamlessly across dark background bars.
* container: Applied to main content blocks to establish standardized max-widths and prevent text stretching on ultra-wide desktop monitors.

### B. Responsive Grid & Breakpoints
* Multi-tier responsive grid rules applied to card decks and content: col-12 col-md-6 col-lg-4 (adapting across mobile 375px, tablet 768px, and desktop).
* Nested row architecture demonstrated in index.html (row inside col-lg-8 managing two child col-md-6 specification cards).

### C. Typography, Buttons & Utilities
* Typography styled using Bootstrap display classes (display-5, lead, text-secondary, small).
* Four distinct button variants implemented: primary filled (btn-gold), outline (btn-outline-gold), large size (btn-lg), and disabled state (disabled).
* More than ten native utility classes utilized for layout rhythm: sticky-top, shadow, rounded, border, py-2, my-5, gap-3, d-flex, text-center, align-items-center.

### D. Bootstrap Component Integration
* Card Component (.card, .card-body): Integrated into service highlights and form wrappers, adapted to dark theme aesthetics via .card-dark.
* Responsive Navbar (.navbar, .navbar-toggler, .collapse): Provides collapse toggler behavior on screens below 992px.