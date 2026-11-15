# Design rationale

The site borrows the look of a Vox explainer: printed newsprint, cut paper, masking tape and a highlighter. Everything else follows from three rules: one golden-ratio scale for type and space, a balanced warm palette, and two typefaces.

## Colour

The palette is four warm colours plus ink: beige, amber, orange and red. They sit next to each other on the colour wheel, so they feel calm together, and the amber is softer than a pure primary yellow, so the highlighter and coloured blocks no longer overpower the page.

| Role | Colour | Share | Why |
| --- | --- | --- | --- |
| Beige newsprint | `#F5F5DC` | about 60% | The page ground. A soft beige reads as paper and is easier on the eye than pure white. Ink on it has a contrast of about 16:1. |
| Ink | `#161616` | about 30% | Body text, rules and the black paper blocks. Near black instead of pure black keeps the print feel. |
| Amber | `#FBC02D` | about 10% | Marks what to read first: highlighter strokes, the band, key cards, labels on dark blocks. Ink on amber has a contrast of about 11:1. |
| Orange | `#FF8F00` | accents | Energy and the scan. Used for the RFID scan line (loading page, walkthrough, 3D gate), button hover, the radar sweep and one card in each set. |
| Red | `#C62828` | accents | Urgency and "live". The signal dot from the logo, the status light, the "paid" stamp, form errors and keyboard focus rings (about 5:1 on beige). |

The split follows the 60-30-10 rule: one dominant ground, one supporting tone and one accent that pulls attention. Orange and red only appear where they mean something.

## Typography

Two families, no decorative extras:

- **Archivo, condensed and heavy (800):** headings, labels, buttons and numbers. It has the tight newsroom look of an explainer headline and fits long headlines on a phone.
- **Source Serif 4:** body text. A serif reads like printed copy and is comfortable at length.

Every size comes from the golden ratio (φ = 1.618), starting from an 18px body:

| Role | Desktop | Phone | Rule |
| --- | --- | --- | --- |
| H1 | 76px | 44.5px | body × φ³ (phone: body × φ²) |
| H2 | 47px | 35px | body × φ² (phone: body × φ × √φ) |
| H3 | 29px | 27.5px | body × φ |
| Lede | 23px | 21.6px | body × √φ |
| Body | 18px | 17px | base |
| Label | 14px | 13.4px | body ÷ √φ |

On desktop, each heading level is 1.618 times the one below it. On phones the steps shrink to √φ (1.272) so the H1 still fits a 375px screen. Sizes scale smoothly in between. These six sizes are the only ones used on the site, defined once as `--fs-*` tokens in `app/globals.css`. Body text uses a 1.618 line height.

## Spacing and layout

- Spacing uses the Fibonacci steps, which approach the golden ratio: 8, 13, 21, 34, 55, 89 and 144px (`--s1` to `--s7`). Sections are 144px apart on desktop and 89px on phones.
- Two-column layouts split 1.618 : 1 (hero, About, Technology, Contact and the How It Works stage).
- Team cards and the hero visual use a 1 : 1.272 (√φ) portrait ratio.

## Paper effects

- A crumpled-paper light and shadow layer sits over the whole page, with fine paper fibre on every surface.
- Coloured blocks (the amber band, the black Technology section and the footer) have torn top and bottom edges.
- Cards are cut-outs lifted off the page: soft layered shadows and a slight tilt that straightens on hover. Some are held on with masking tape.
- Headline phrases get an amber highlighter stroke that sweeps in as they scroll into view.

## Team player cards

The cards adapt the React Bits Profile Card (MIT + Commons Clause, © David Haz; notice kept in the component). The studio photos keep their original colour on a plain white tile inside the paper card, with the role on an amber tag. The card keeps its pointer tilt and foil glare.

## Motion

- **Loading page:** a sheet of black paper. The logo is scanned into view line by line by an orange scan line while an amber counter climbs to 100%, and the highlighter sweeps across "21st‑century" in "Loading your 21st‑century shopping experience." When the site is ready the sheet tears across the middle and opens onto the page. It shows on every page load, for at least 2.2 seconds so the line can be read and never longer than 6 seconds, and it hides itself after 8 seconds even if scripts fail.
- **How It Works:** the Remotion scan is scrubbed by scroll, now in the paper palette.
- **Hero:** the 3D gate is recoloured to match.
- **Header:** the full stacked logo shrinks as you scroll and becomes the logo mark (cart, signal and red dot).
- **Reduced motion:** every animation respects `prefers-reduced-motion`.
