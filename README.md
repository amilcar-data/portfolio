# Amilcar Torres | Data, AI & Physics

A personal portfolio exploring data science, artificial intelligence, and high-energy physics. It features selected projects, interactive Highcharts visualizations, and a responsive React interface.

**Live site:** [amilcar-data.github.io/portfolio](https://amilcar-data.github.io/portfolio/)

## Run locally

Install Node.js 22, then run:

```bash
npm ci
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173/portfolio/`). To check a production build:

```bash
npm run build
npm run preview
```

## Technologies and why I use them

- **React and JavaScript** — I use components to organize the portfolio and React state to make the chart controls interactive, using a language I am comfortable with.
- **Vite** — It provides a fast local development server and builds the static files needed for the site.
- **Highcharts and Highcharts React** — They let me build interactive charts to explore distributions, particle masses, and ideas in data science and physics.
- **CSS and Tailwind CSS** — Custom CSS gives the portfolio its visual identity and responsive layout; Tailwind utilities help style elements such as the animated meteors.
- **Lucide React** — Its icons provide a consistent visual language for the different areas of work.
- **GitHub Pages and GitHub Actions** — They host the static portfolio and automate its build and publication when the main branch is updated.

## Project structure

- `src/App.jsx` — sections, project content, and the data-lab charts
- `src/App.css` and `src/index.css` — layout, styling, and responsive rules
- `src/components/charts/` — skill visualizations
- `src/components/ui/meteors.jsx` — animated star field
- `src/assets/` — featured project and CMS event images
- `public/favicon.svg` — browser icon
- `.github/workflows/deploy.yml` — GitHub Pages deployment

The data-lab normal curve is calculated from its probability density function; the particle chart uses approximate values linked to the Particle Data Group. Skill charts use illustrative data, not research results. The CMS event image is credited to CERN on the site.

Built with React, Vite, JavaScript, Tailwind CSS, Highcharts, and Lucide React.
