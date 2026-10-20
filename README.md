# Portfolio Website

https://roguesuter.github.io/Personal-Portfolio/

A clean, minimal, typography-focused portfolio.
Host it for free on **GitHub Pages** and fill in your own details.

## Structure

```
portfolio/
├── index.html        # Home page — hero, about, skills, 2 featured projects, contact
├── projects.html     # Full projects page — lists all projects
├── resume.html       # Resume / CV page (feels like its own page)
├── styles.css        # All styling (colors, spacing, dark mode, layout)
├── script.js         # Interactions (theme toggle, mobile menu, smooth scroll)
└── README.md         # This file
```

## How it works

- **Homepage (`index.html`)**: Shows hero, about, skills, and **2 featured projects**. Contact scrolls down on the same page.
- **Projects page (`projects.html`)**: A dedicated page listing **all projects**. Each project card links externally to the live site/app ("Go to project").
- **Resume page (`resume.html`)**: Separate page with experience, education, skills, and a print/PDF button — like clicking "Resume" opens its own page.
- **Dark mode toggle** in the navigation (remembers your choice via `localStorage`)
- Fully responsive (mobile hamburger menu included)
- No build step — just HTML, CSS, and vanilla JS

## How to customize

Open `index.html` and replace the placeholder text marked with `[brackets]`:

| What to change | Where |
|---|---|
| Your name | `<a href="#" class="logo">YOUR<span>NAME</span>.</a>` and hero tagline |
| Hero headline / subtitle | `<h1 class="hero-title">` and `<p class="hero-subtitle">` |
| About text | `.about-text p` paragraphs |
| Your photo | Replace `.photo-placeholder` div with an `` tag |
| Featured projects (2 on homepage) | Edit the two `<article class="project-card">` blocks in `#featured` on `index.html` |
| All projects list | Edit the cards in `projects.html` |
| Project links | Change `href="#"` to your live site/app URL in each `.project-link` |
| Resume | Edit `resume.html` (experience, education, skills) |
| Contact links | Update `mailto:` and social links in `#contact` on `index.html` |

In `styles.css`, edit the `:root` variables at the top to change colors, fonts, and spacing. Dark mode overrides live under `body.dark`.

## Add more projects

Just add a new `<article class="project-card">` block to `projects.html` (and optionally to `#featured` on `index.html`). Change the `href="#"` on the "Go to project" link to your live site/app URL. No need to create a separate page for each project.

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g., `yourusername.github.io` or `portfolio`).
2. Push the `portfolio/` folder into it (or use the folder as the repo root).
3. Go to **Settings → Pages** in your repo.
4. Under **Build and deployment → Source**, select:
   - **Deploy from a branch**
   - Branch: `main` (or `master`), folder: `/ (root)` or `/portfolio` if nested.
5. Click **Save**. Your site will be live at `https://yourusername.github.io/` (or `.../portfolio/`).

### Quick push commands (from inside `portfolio/`)

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

Then enable Pages in repo settings as described above.

## Images

Put project screenshots or your photo in an `assets/` folder and reference them relatively:

```html
<img src="assets/photo.jpg" alt="Your photo" />
```

## License

MIT — feel free to use this as a template for your own portfolio.
