# CSS Checklist — Assignment 2 (Logovo Barbershop Astana)

* **Author**: Nodir Muhammedov[cite: 7]
* **Assigned Pages**: `index.html`, `services.html`, `feedback.html`[cite: 6]
* **Stylesheets**: `css/base.css`, `css/nodir.css`[cite: 7]

| Requirement / Item | File | Line / Rule Target | Justification / Architectural Role |
| :--- | :--- | :--- | :--- |
| **Color Palette (5 max in comment)** | `base.css` | Lines 1–9 | Documented Hex, RGBA, and Named (`steelblue`) tokens[cite: 7] |
| **Typography (2 font stacks)** | `base.css` | `font-family` | Segoe UI (sans-serif body) & Georgia (serif headers)[cite: 7] |
| **Universal Selector (*)** | `base.css` | `*` | Predictable box-sizing reset to `border-box`[cite: 7] |
| **Type Selector** | `base.css` | `body` | Foundational document styles and background setup[cite: 7] |
| **Class Selector** | `nodir.css` | `.master-quote` | Styling of callout testimonial card[cite: 7] |
| **ID Selector** | `nodir.css` | `#about-hero` | Unique anchor block on index.html[cite: 7] |
| **Descendant Selector** | `base.css` | `nav ul li a` | Navigation hyperlinks nested within unordered lists[cite: 7] |
| **Child Selector (>)** | `base.css` | `footer > p` | Direct paragraphs inside the footer element[cite: 7] |
| **Adjacent Sibling Selector (+)** | `nodir.css` | `h2 + p` | Lead paragraph styling following an h2[cite: 7] |
| **Grouping Selector (,)** | `base.css` | `h1, h2, h3, h4` | Shared font family and color hierarchy[cite: 7] |
| **Attribute Selector ([attr])** | `nodir.css` | `a[target="_blank"]` | Distinct styling for external 2GIS map links[cite: 7] |
| **Pseudo-class :hover** | `base.css` | `nav ul li a:hover` | Visual state for interactive link hover[cite: 7] |
| **Pseudo-class :focus** | `base.css` | `nav ul li a:focus` | Accessible outline for keyboard navigation[cite: 7] |
| **Pseudo-class :first-child** | `nodir.css` | `ul li:first-child` | Highlights initial item in structured lists[cite: 7] |
| **Pseudo-element ::before** | `nodir.css` | `.section-heading::before` | Injects decorative ochre block icon[cite: 7] |
| **Margin Collapse Explained** | `base.css` | Header comment block | Documented vertical margin collapse between h1 and nav[cite: 7] |
| **Internal `<style>` Block** | `services.html` | Head block | Cascade override demonstration (0-0-1 specificity)[cite: 7] |
| **Inline `style="..."`** | `index.html` | Paragraph attribute | Cascade override demonstration (1-0-0-0 specificity)[cite: 7] |
| **Single `!important` Usage** | `nodir.css` | In `.visually-hidden` | Justified for screen-reader accessibility utility[cite: 7] |
| **Specificity Experiment** | `nodir.css` | `blockquote` vs `.master-quote` | Conflict resolution comparing 0-0-1 against 0-1-0[cite: 7] |
| **Flexbox Navigation** | `base.css` | `nav ul` | `display: flex`, `justify-content`, `gap`[cite: 7] |
| **Flexbox Cards Container** | `nodir.css` | `.features-container` | `flex-wrap`, `flex-direction`, `flex: 1 1 250px`[cite: 7] |
| **CSS Grid (repeat & minmax)** | `nodir.css` | `.gallery-grid` | `repeat(3, minmax(200px, 1fr))`[cite: 7] |
| **Grid Item Spanning (span)** | `nodir.css` | `.gallery-featured-item` | `grid-column: span 2`[cite: 7] |
| **Position: static** | `nodir.css` | `.normal-flow-block` | Normal unshifted document layout[cite: 7] |
| **Position: relative & absolute** | `nodir.css` | `.hero-banner`, `.badge-floating` | Absolute badge positioned relative to hero container[cite: 7] |
| **Position: fixed** | `nodir.css` | `.floating-contact-btn` | Pinned phone button visible across scrolling[cite: 7] |
| **Float and Clear** | `nodir.css` | `.float-interior-img`, `.clear-flow` | Text-wrapped image with clear reset explanation[cite: 7] |
| **Centering 1: Margin auto** | `base.css` | `.site-header-inner` | Horizontal layout centering[cite: 7] |
| **Centering 2: Flexbox** | `nodir.css` | `.action-btn` | Interactive button content centering[cite: 7] |
| **Centering 3: Grid** | `nodir.css` | `.promo-center-box` | Alignment via `place-items: center`[cite: 7] |