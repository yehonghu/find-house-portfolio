# Find House — Residence Casebook

> A fictional Toronto real-estate casebook built around the project’s original property photography, three individual residences, and a focused viewing path.

Find House is a static, portfolio-grade real-estate experience. **Residence Casebook** presents three fictional homes through their original project images, concise facts, and individual detail pages. Every public route uses one photography-first editorial system; no alternate visual version, map interface, or legacy collection remains.

## Live Preview

The current static site is published at [yehonghu.github.io/find-house-portfolio](https://yehonghu.github.io/find-house-portfolio/).

## Experience

| Route | Purpose |
|---|---|
| `home.html` | A photography-led opening and three selected property cases. |
| `search.html` | A unified all-residences collection view. |
| `houseInfo1.html` | Case 01: 7 Gerald Street. |
| `houseInfo2.html` | Case 02: Windfields Estate. |
| `houseInfo3.html` | Case 03: Morningside Townhome. |
| `contact.html` | A fictional viewing inquiry with client-side feedback. |
| `siteMap.html` | A clear index of every current casebook route. |

## Design and Interaction

Residence Casebook uses a restrained editorial palette—warm ivory, graphite, and muted brass—to frame the original house photography rather than compete with it. The site supports native vertical scrolling, a quiet reading-progress rule, gentle image micro-parallax, pointer-responsive case photography, viewport reveals, responsive navigation, and reduced-motion preferences.

## Technology

| Area | Tools |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 custom properties, responsive grid, three-dimensional transforms, reduced-motion support |
| Interaction | Vanilla JavaScript and IntersectionObserver |
| Deployment | Static GitHub Pages site with no build step |

## Run Locally

Clone the repository and open `index.html` or `home.html` in a modern browser. No dependency installation or build command is required.

```text
find-house-portfolio/
├── index.html              # Static entry and current-home redirect
├── home.html               # Residence Casebook opening
├── search.html             # All residences collection
├── houseInfo*.html         # Unified property case pages
├── contact.html            # Viewing inquiry form
├── siteMap.html            # Casebook route index
├── style.css               # Global Residence Casebook system
└── residence.js            # Shared casebook interaction layer
```

## Contributor

**Yehong Hu (James Hu)**

All homes, figures, and property information in this project are fictional and are used solely for educational and portfolio demonstration.
