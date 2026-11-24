# BHLISS Enterprises — Immersive React website

Responsive React + Vite website for BHLISS Enterprises. Existing routes, business content, brand assets, enquiry flow and GitHub Pages deployment have been retained.

## Run locally
- Node.js 20+
- `npm install`
- `npm run dev`
- Production build: `npm run build`
- Preview: `npm run preview`

## Interactive motion stack
- **GSAP + ScrollTrigger** — scroll reveal choreography, pinned three-chapter scrollytelling and image depth transitions.
- **Lenis** — smooth desktop wheel scrolling, with reduced-motion support.
- **Three.js + React Three Fiber + Drei** — cursor-responsive 3D hero sculpture.
- **Framer Motion** — existing lightweight React UI transitions.
- **CSS** — responsive depth layers, hover light sweep and reduced-motion fallbacks.

The 3D hero is decorative and does not contain essential information. It is designed to degrade gracefully on small screens. Avoid enabling several animation libraries on the same element.

## Routes
- `/` Home
- `/lifts` Anchor 3G lift categories
- `/electrical` Commercial, residential and industrial electrical
- `/aggregates` M-Sand, graded aggregates and crushed stone
- `/about` Company overview and values
- `/contact` Contact details and enquiry form

## GitHub Pages
The included GitHub Actions workflow builds `dist/` and deploys it to GitHub Pages. Keep the repository Pages source set to **GitHub Actions**.

## Contact and enquiry form
Contact information is maintained in `src/config.js`. The enquiry form opens the visitor's configured email application; it does not submit data to a server or database.
