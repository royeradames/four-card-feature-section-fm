# Four card feature section

An implementation of the [Frontend Mentor four card feature section challenge](https://www.frontendmentor.io/challenges/four-card-feature-section-weK1eFYK), using its supplied icons, copy and design references.

The page is static content: a heading, an introduction and four feature cards. There are no forms, accounts or network writes.

## Development

Node 22.13 or later. Use `npm ci`, `npm run dev`, `npm run lint`, `npm run build`, `npm run typecheck` and `npm test`. Browser tests use installed Chrome and own port 4511.

Next 16.3.6, React 19.2.8, TypeScript 5.9.3 and Tailwind 4.2.1 are pinned to the family baseline. The page is a server component.

## Sources

Original challenge files are preserved under `reference/`; supplied images moved byte-for-byte to `public/images/`. Layout, spacing, colours, the card shadow and the three arrangements (mobile stack, tablet 1-2-1, desktop 1-2-1 columns) follow the decoded Figma frames. Poppins 200/400/600 is served through `next/font`.

## Implementation choices

- The design sets card descriptions at 13px and the intro at 15px. The family 16px text floor raises both to 16px, so cards are slightly taller than 250px when copy wraps to three lines.
- The tablet order (Team Builder, then Supervisor and Karma, then Calculator) comes from the Figma Tablet frame; source order stays Supervisor, Team Builder, Karma, Calculator for screen readers and mobile.
- One site name, "Four card feature section", appears in the footer, `og:site_name` and `WebSite` JSON-LD. The canonical URL is the planned `four-card-feature-section-fm.royeradames.com` production domain, which isn't attached yet.
- Where the Figma frames and the supplied JPGs disagree, the decoded Figma wins: 314px mobile cards with 30px gutters at 375, 314px tablet cards, 350px desktop cards.
