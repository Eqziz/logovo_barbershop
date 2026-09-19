# Logovo Barbershop Astana — Web Technologies Course Project

## 1. Project Overview & Organization
* **Theme**: Authentic Men's Barbershop & Lounge Club "Logovo" (Барбершоп «Логово»).
* **Physical Location**: 17/1 Syganak St, Astana, Kazakhstan[cite: 6, 7].
* **Assignment Stage**: Assignment 2 — CSS Fundamentals, Priority, Layouts (Flexbox & Grid), Positioning, and Box Model.
* **Technology Stack**: Semantic HTML5 (0 validator errors) and pure CSS3 (0 validator errors)[cite: 6, 7]. No frameworks, libraries, or JavaScript used[cite: 6, 7].

---

## 2. Team Composition & Page Distribution
In compliance with the updated course specification for a three-student team, the project comprises **exactly 6 pages** (2 pages per author)[cite: 6, 7]:

| Student Name | Role | Assigned Pages | Personal Stylesheet |
| :--- | :--- | :--- | :--- |
| **Nodir Muhammedov** | Team Lead / Architecture | `index.html`, `services.html`, `feedback.html` | `css/nodir.css`[cite: 6, 7] |
| **Nurasyl Ilyas** | Frontend Developer | `barbers.html` (co-author feedback) | `css/student2.css`[cite: 6, 7] |
| **Nurken Mamay** | Frontend Developer | `marketbar.html`, `careers.html` | `css/student3.css`[cite: 6, 7] |

* Shared core stylesheet authored collaboratively: **`css/base.css`** (palette, typography, universal reset, header, nav, footer).

---

## 3. Directory Structure
```text
barbershop-logovo/
│
├── css/
│   ├── base.css            # Shared site-wide palette, typography, header, nav, footer
│   ├── nodir.css           # Personal styles: index, services, feedback
│   ├── nurasyl.css        # Personal styles: barbers, schedules
│   └── nurken.css        # Personal styles: marketbar, careers
├── images/
│   ├── photo1.jpg          # Authentic photo: lounge seating & Edison lamps
│   ├── photo2.jpg          # Authentic photo: cutting stations & hydraulic chairs
│   ├── photo3.jpg          # Authentic photo: master holding Japanese shears
│   └── photo4.jpg          # Authentic photo: MarketBar counter & beverage display
├── index.html              # Home page & club concept
├── services.html           # Price table & sanitation protocols
├── feedback.html           # Quality assurance form
├── barbers.html            # Master team & branch chronology
├── marketbar.html          # Cosmetic apothecary & bar menu
├── careers.html            # Academy application form
├── checklist_css.md        # CSS selector, property, and layout checklist
├── sketches/               # Hand-drawn layout sketches (signed, dated, photographed)
├── before-after/           # Screenshots before CSS (HTML-only) and after styling
├── ai_log.md               # AI consultation record
└── README.md               # Master project documentation

4. Key Architectural Implementations (Assignment 2)
A. Color Palette (5 Colors Strictly Enforced in base.css)
 #1a1a1a (Hex) — Deep graphite background.  
 #f4f1ea (Hex) — Linen white text for high contrast and readability.  
 #c59b27 (Hex) — Ochre gold brand accent.  
 rgba(0, 0, 0, 0.7) (RGBA) — Translucent card and header overlay.   
   steelblue (Named) — Utility state and external link accent.

B. Cascade & Priority Demonstrations
 Internal Style Block: Located in <head> of services.html (specificity 0-0-1) overriding table text colors.   Inline Style Attribute: Located on <p> in index.html (specificity 1-0-0-0) overriding letter-spacing.   
 Single !important: Located in css/nodir.css inside .visually-hidden for accessible screen-reader clipping.   Specificity Experiment: Located in css/nodir.css lines 15–30 (blockquote vs .master-quote), demonstrating class 0-1-0 defeats type selector 0-0-1 without !important.   
C. Layout Implementations
 Flexbox: Main navigation bar (display: flex, justify-content, align-items, gap) and feature cards container (flex-wrap, flex: 1 1 250px).   
 CSS Grid: Interior photo gallery using repeat(3, minmax(200px, 1fr)) and column spanning (grid-column: span 2).   
 Positioning: Demonstrated static (normal flow), relative (containing context), absolute (.badge-floating), and fixed (.floating-contact-btn).   
 Float & Clear: Floated interior photograph with text wrapping and explicit clear: both with rationale.   Centering: Margin auto (.site-header-inner), Flexbox (.action-btn), and Grid (.promo-center-box with place-items: center)[cite: 7].
5. Validation
HTML: All 6 files pass W3C Nu HTML Checker with 0 errors[cite: 6, 7].
CSS: All 4 stylesheets pass W3C CSS Validation Service with 0 errors[cite: 7].