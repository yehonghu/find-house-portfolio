# Find House Rebuild Blueprint: Residence Casebook

## Corrective Brief

The previous homepage over-prioritized an abstract district-map concept. It obscured the original project’s strongest evidence—its property photography and individual house cases—and introduced a critical usability defect by applying `overflow: hidden` to the page wrapper. This rebuild removes that direction completely.

## New Visual Direction

**Residence Casebook** is a quiet, editorial property portfolio. The photography is the visual system: each existing home image occupies meaningful scale and each case is given a distinct moment to breathe. The interface uses a restrained ink, warm ivory, and muted brass palette only to frame the homes; it does not compete with them through synthetic background art or decorative map graphics.

The design should feel like opening a considered real-estate monograph. It begins with an actual house photograph, then moves through a clear collection of three original cases: **7 Gerald Street**, **St. Andrew–Windfields**, and **Morningside Townhome**. Every case retains its original detail page as the conversion destination.

## Interaction Principles

| Interaction | Behavior | Constraint |
|---|---|---|
| Page scroll | Normal native document scrolling with no `overflow: hidden`, full-screen trap, or scroll-jacking | The entire page must be reachable by wheel, touch, keyboard, and scrollbar. |
| Hero image | A gentle pointer-driven crop shift and an editorial information panel | The house photo remains legible and never moves beyond its frame. |
| Case sequence | Case cards rise and reveal as they enter the viewport; image cards respond to a small controlled pointer tilt | Each case remains a normal semantic link and usable without motion. |
| Scroll progress | A minimal vertical progress rule gives long-page orientation | It is decorative and disabled for reduced-motion preferences. |
| Image details | Existing home photos appear at large scale with location, price, type, and key facts beside them | No fabricated cases, generic substitutes, or hidden imagery. |

## Original Assets Now on the Homepage

| Original case | Hero/detail asset | Destination |
|---|---|---|
| 7 Gerald Street | `image-house5.jpg` | `houseInfo1.html` |
| St. Andrew–Windfields Estate | `image-house8.jpg` | `houseInfo2.html` |
| Morningside Townhome | `image-house6.jpg` | `houseInfo3.html` |

## Acceptance Criteria

1. The public homepage scrolls naturally through every section.
2. The hero and three case studies visibly use the project’s original house images.
3. Each case links to its real, existing property detail page.
4. The project remains entirely English and publicly runs as a static GitHub Pages website.
5. Public contributor information names Yehong Hu (James Hu) only, and all Git commits use the `yehonghu` identity.
