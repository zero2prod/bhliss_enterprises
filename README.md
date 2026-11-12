# BHLISS Enterprises — React website

Responsive React + Vite website with a white header, charcoal/orange theme, separate business pages and transparent logo assets.

## Run locally
- Install Node.js 18+
- `npm install`
- `npm run dev`
- Production build: `npm run build` (output in `dist/`)
- Preview the production build locally: `npm run preview`

## GitHub Pages deployment
- Push this project to a GitHub repository on the `main` branch.
- In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
- The workflow in `.github/workflows/deploy-pages.yml` builds the site and deploys `dist/` after each push to `main`. It can also be started from the repository's **Actions** tab with **Run workflow**.
- For a project site, the Vite base path and React Router basename are derived from the repository name. A `404.html` fallback supports direct visits and refreshes on routes such as `/lifts` and `/contact`.
- The site URL will be `https://<owner>.github.io/<repository>/`. For a user or organization repository named `<owner>.github.io`, it will be `https://<owner>.github.io/`.
- Local production build and preview: `npm ci`, `npm run build`, then `npm run preview`.

## Routes
- `/` Home
- `/lifts` Anchor 3G lift categories
- `/electrical` Commercial, residential and industrial electrical
- `/aggregates` M-Sand, 10 mm, 20 mm, 40 mm, crushed stone/chippings
- `/about` Company overview and values
- `/contact` Contact details, location link and enquiry form

## Configured contact details
- Mobile: 8838385160 / 9566882982
- Email / enquiries: BHLISSenterprises@gmail.com
- Address: BHLISS Enterprises, 1st Floor, Dwaraka Complex, Shanthi Nagar West, Inner Ring Road, Hosur, Krishnagiri District, Tamil Nadu - 635109

The supplied BHLISS logo and enhanced transparent Anchor 3G logo artwork are used from `src/assets`; the Anchor 3G branding is displayed on light backgrounds for contrast. Local category photos from Pexels are stored in `src/assets`; other website photography is loaded from Unsplash URLs. Use owned or licensed project photos for final commercial deployment.


## Latest UI refinements
- Contact route now displays one enquiry form only; the shared second enquiry panel is not rendered on the Contact page.
- Footer is white with the original transparent BHLISS logo artwork (no colour-inverting filter).
- Contact navigation CTA has a visible label and high-contrast styling.
- Contact details and map card have refined hover/focus styling.
