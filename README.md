# Find House

> A fictional Toronto property exploration experience built around neighbourhood context, spatial comparison, and a clear next viewing.

Find House is a static, portfolio-grade real-estate interface. The upgraded **City Contours** system turns a traditional listings site into a map-informed city journey: visitors begin with district signals, compare a concise property collection, inspect individual homes, and start a viewing conversation.

## Live Preview

The static site is published at [yehonghu.github.io/find-house-portfolio](https://yehonghu.github.io/find-house-portfolio/).

## Experience

| Surface | Interaction and purpose |
|---|---|
| City overview | A pointer-responsive district board uses layered property markers, map lines, and spatial depth to introduce the collection. |
| Scroll journey | Progress rail, contour-grid parallax, and staggered reveals give the page the rhythm of moving through a city. |
| Listing search | Visitors can filter fictional homes by type, price range, and bedroom count, then save a listing locally during the session. |
| Property details | Individual house pages provide a focused property narrative, facts, and a direct contact route. |
| Contact and sitemap | Visitors can start a viewing conversation or revisit the complete site structure. |

## Design Language

**City Contours** deliberately differs from the other portfolio projects. It uses limestone, city fog, charcoal labels, brick-red location signals, park-green land fields, and cobalt transit lines. Architectural cards, map contours, and controlled elevation make the interface feel like an urban field guide rather than a generic luxury real-estate template.

## Technology

| Area | Tools |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 custom properties, responsive grid, three-dimensional transforms, reduced-motion support |
| Interaction | Vanilla JavaScript, IntersectionObserver, pointer movement, local favourite state, dynamic filters |
| Deployment | Static GitHub Pages site with no build step |

## Run Locally

Clone the repository and open `index.html` or `home.html` in a modern browser. No dependency installation or build command is required.

```text
find-house-portfolio/
├── index.html              # Static entry and home redirect
├── home.html               # City Contours overview
├── search.html             # Filterable property collection
├── houseInfo*.html         # Property detail pages
├── contact.html            # Viewing inquiry form
├── siteMap.html            # Site structure
├── style.css               # Global City Contours system
└── city-contours.js        # Shared dynamic interaction layer
```

## Contributor

**Yehong Hu (James Hu)**

All homes, agents, figures, and property information in this project are fictional and are used solely for educational and portfolio demonstration.
