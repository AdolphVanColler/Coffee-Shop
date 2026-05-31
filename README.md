# Company Name — Artisan Coffee Website

A fully responsive, animated coffee shop website built with pure HTML, CSS, and JavaScript. No frameworks, no build tools, no dependencies.

---

## Running the site

### Option 1 — Live Server (recommended)
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500`

### Option 2 — Python (if installed)
```bash
python -m http.server 8080
```
Then open `http://localhost:8080`

### Option 3 — Direct file
Open `index.html` directly in your browser. Most features work fine, though some browsers block external image requests from `file://` — use one of the server options above for best results.

---

## Project structure

```
Coffee shop/
├── index.html     # Full single-page site
├── styles.css     # All styles — CSS variables, animations, responsive grid
├── main.js        # Scroll reveal, parallax, counters, tabs, forms
└── README.md
```

---

## Pages / Sections

| Section       | Description                                                  |
|---------------|--------------------------------------------------------------|
| **Hero**      | Full-screen parallax background, animated headline & CTA     |
| **Stats**     | Animated counters — origins, customers, years, menu items    |
| **About**     | Overlapping image layout, brand story                        |
| **Menu**      | Tabbed grid — Hot Coffee, Cold Drinks, Food (12 items)       |
| **Gallery**   | Masonry-style photo grid with hover overlays                 |
| **Testimonials** | Glassmorphism cards, 3 customer quotes                    |
| **CTA Banner**| Parallax call-to-action with hours                           |
| **Contact**   | Address/hours info + message form                            |
| **Footer**    | Links, social icons, newsletter signup                       |

---

## Features

- Sticky navbar — transparent on hero, frosted glass on scroll
- Parallax hero background
- Scroll-reveal animations (staggered in grid sections)
- Animated number counters triggered on scroll
- Menu tab switching with fade-in cards
- Image zoom on card hover
- Mobile-responsive with hamburger nav
- Contact & newsletter form feedback states
- No JavaScript frameworks or CSS preprocessors

---

## Tech

- **HTML5** — semantic structure
- **CSS3** — custom properties, CSS Grid, Flexbox, `clamp()`, `backdrop-filter`
- **JavaScript (ES6+)** — IntersectionObserver, requestAnimationFrame-style counter
- **Google Fonts** — Playfair Display + Inter
- **Images** — Unsplash (loaded via CDN URL, no download needed)
