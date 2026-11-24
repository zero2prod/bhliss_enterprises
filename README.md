# BHLISS Enterprises — Cartoon-themed interactive website

Responsive React + Vite website for BHLISS Enterprises. The full visual system uses custom vector cartoon illustrations to explain the company's three service verticals.

## Run locally
- Node.js 22+
- `npm install`
- `npm run dev`
- Production build: `npm run build`
- Preview: `npm run preview`

## Visual and motion system
- **Custom SVG cartoon scenes** — lift shaft and passenger lift, electrician and distribution panel, aggregate delivery truck and stone materials.
- **GSAP + ScrollTrigger** — scroll reveal choreography and pinned three-chapter service storytelling.
- **Lenis** — smooth desktop wheel scrolling with reduced-motion support.
- **Framer Motion** — existing lightweight React UI transitions.
- **CSS Scroll-driven Animations** — progressive reveals where supported.
- **Responsive CSS** — warm paper backgrounds, pastel service palettes, ink outlines, sticker details and hand-drawn-inspired cards.

The artwork is original vector illustration code rather than stock photos. Existing business copy, service categories, Anchor 3G brand, navigation, contact information, enquiry form and GitHub Pages deployment are retained.

## Routes
- `/` Home
- `/lifts` Anchor 3G lift categories
- `/electrical` Commercial, residential and industrial electrical
- `/aggregates` M-Sand, graded aggregates and crushed stone
- `/about` Company overview and values
- `/contact` Contact details and enquiry form

## GitHub Pages
The included GitHub Actions workflow builds `dist/` and deploys it to GitHub Pages. Keep the repository Pages source set to **GitHub Actions**.

## Contact
Contact information is maintained in `src/config.js`. The enquiry form opens the visitor's email application; it does not send data to a backend.
