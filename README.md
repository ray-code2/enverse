# Enverse — static site (first draft)
Plain HTML/CSS/JS, no build step. Files: `index.html`, `styles.css`, `main.js`.

## Placeholders to fill (search for `PLACEHOLDER`, `[`, `YOUR_`)
1. Portfolio: 6 cards — image, project title, industry/channel/outcome.
2. Pricing: Launch $/mo + [X] concepts; Scale $/mo + [X] variations; Enterprise "Custom" note. Also confirm each tier's feature list.
3. Commitments: data/confidentiality policy text; a third guarantee (e.g. revision policy).
4. "Trusted by": 4 client logo slots (only with permission).
5. Testimonials: 2 quotes with name/title/company (real, with permission).
6. Contact reply time ("within [X] business days").
7. Booking form endpoint `YOUR_FORM_ID`; newsletter endpoint `YOUR_NEWSLETTER_FORM_ID`.
8. Footer: contact email (hello@enversecreative.com).
9. Optional: hero copy, budget ranges in form, favicon/OG image, meta description.

## Connecting forms
- **Forms:** no third-party service. `main.js` opens a prefilled email to hello@enversecreative.com (mailto).
- **Newsletter alternative:** swap the form for a Buttondown / Mailchimp / Beehiiv embed.

## Free hosting
- **Cloudflare Pages / Netlify:** drag-and-drop this folder or connect a GitHub repo; no build command, output dir `/`.
- **GitHub Pages:** push to a repo → Settings → Pages → Deploy from branch `main`, root.
- Add custom domain in host settings; HTTPS is automatic.

## Local preview
`python3 -m http.server 8080` then open http://localhost:8080

## Hero spec ad carousel
The hero ads are one array, `HERO_SLIDES`, in `main.js` (order = display order). Each entry: `src` (video), `poster` (image), `title`, `label` (screen-reader name), `caption`.
To make the Enverse company profile ad the first slide, add its video and poster to `assets/hero-ad/` and insert one entry at the top of `HERO_SLIDES`. Arrows, the "1 / N" counter, swipe and captions update automatically. Also update the fallback `src`/`poster`/caption in the hero markup in `index.html` to match slide 1.
