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
8. Footer: contact email (currently hello@example.com) and LinkedIn URL.
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
