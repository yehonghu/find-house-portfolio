# Find House Upgrade Blueprint

## Product Role

Find House is a fictional Toronto real-estate exploration experience. Its strongest portfolio story is not the agent directory: it is helping a visitor form a feeling for place, compare a small set of homes, and move from broad city orientation to a focused property conversation.

## Visual Direction: City Contours

Find House will avoid the cinematic dark portfolio, the warm paper bulletin-board language of BookEase, and the high-key organic learning world of PsychMind. **City Contours** is an architectural, map-informed property interface. It uses limestone, soft fog, charcoal labels, brick-red location signals, park-green land fields, and cobalt transit lines.

The public homepage behaves like a living district map. Street-grid contours sit behind the story, property markers become stacked architectural tiles, and the central city model shifts subtly with pointer movement. The visual tone is composed and urban rather than luxury-generic: it should feel like a considered walk through a city, not a sales brochure.

## Dynamic Interaction System

| Surface | Motion behavior | Product purpose |
|---|---|---|
| Reading rail | A narrow route-progress line tracks long-page movement | Establishes deliberate exploration through the page. |
| Hero map | Pointer-responsive district board with stacked property markers | Gives the visitor a spatial overview before listing-level detail. |
| Scroll sections | Parallax contour lines, staggered marker reveals, and gentle elevation | Makes a city journey feel continuous rather than sectioned. |
| Listing cards | Controlled architectural lift, image crop movement, and favourite feedback | Makes comparisons feel tactile without sacrificing clarity. |
| Property path | Connected city nodes from neighbourhood to viewing to next action | Explains the home-search process as a series of confident decisions. |
| Reduced motion | Static marker layout and non-animated progress feedback | Preserves usability for visitors who prefer less motion. |

## Scope

1. Preserve all existing home, listing, property detail, contact, and sitemap pages.
2. Rebuild the shared page frame, navigation, home story, CSS tokens, and listing-card interactions around City Contours.
3. Keep the original static listings and property-detail pages functional, while making their hierarchy and navigation consistent with the new system.
4. Keep the whole repository English, including source comments and documentation.
5. Publish the static files to the existing `gh-pages` branch so the portfolio can be opened directly without a build step.

## Attribution

All commits and deployment commits will use the GitHub identity `yehonghu` with the user-owned GitHub noreply address. README, footer, and public contributor information will name Yehong Hu (James Hu) only. No agent or third-party attribution will be added.
