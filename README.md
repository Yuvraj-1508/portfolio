<div align="center">

# 🚀 Yuvraj Rotliwala — Developer Portfolio

**A production-ready personal portfolio built with React 19 + Vite 5**

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-e63a6f?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![react-icons](https://img.shields.io/badge/react--icons-5-e91e63?style=flat-square)](https://react-icons.github.io/react-icons/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub_Pages%20%7C%20Vercel%20%7C%20Netlify-blue?style=flat-square)](https://github.com/Yuvraj-1508)

<br/>

> A **senior-developer quality** portfolio landing page showcasing .NET backend development skills, projects, certifications, services, and contact — with premium dark-mode glassmorphism design, particle canvas, orbital tech-card animation, and smooth Framer Motion transitions throughout.

<br/>

![Portfolio Preview](https://i.imgur.com/placeholder.png)
<!-- Replace the line above with an actual screenshot: ![Portfolio Preview](./public/preview.png) -->

</div>

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 **Premium Dark UI** | Deep navy glassmorphism with blue/cyan gradient accents |
| 🌌 **Particle Canvas** | Animated WebGL-style particle network background |
| 🔵 **Dot Grid Background** | Radial dot-grid overlay (Linear.app / Vercel style) |
| 🪐 **Orbital Tech Cards** | 5 tech cards trigonometrically placed in a perfect orbit around a .NET core |
| ⌨️ **Typewriter Animation** | Cycling role titles with character-level typing/deleting |
| 🧭 **Smart Navbar** | Active-section detection on scroll + mobile hamburger menu |
| 📐 **Section Numbering** | Numbered section counters (`01` → `07`) with code-style labels |
| 💼 **Services Section** | Offering cards for landing pages & database/CRUD solutions |
| 🛠️ **Skills with Brand Icons** | Real `react-icons/si` logos for C#, React, SQL, Git, Bootstrap, etc. |
| 📁 **Projects** | Numbered badge cards with tech stack icons + GitHub links |
| 📜 **Certifications** | Brand icon cards for AZ-900, ASP.NET, Udemy, Coursera certs |
| 📬 **Contact Form** | Working submit form with smooth sent-state feedback |
| 📱 **Fully Responsive** | Mobile-first breakpoints for all sections and grids |
| ⚡ **Vite 5 Build** | Lightning-fast HMR dev server, optimised production bundle |

---

## 🗂️ Project Structure

```
portfolio/
├── public/
│   ├── resume.pdf                   # Downloadable CV
│   └── certifications/              # Certification PDF files
│       └── Yuvraj Rotliwala_ASP.NET Core Foundations Course.pdf
├── src/
│   ├── App.jsx                      # All React components (single-file architecture)
│   ├── App.css                      # Component-scoped styles
│   ├── index.css                    # Global CSS variables, reset, typography
│   └── main.jsx                     # React DOM entry point
├── index.html                       # HTML shell (Vite entry)
├── vite.config.js                   # Vite configuration
├── package.json
└── README.md
```

---

## 🧰 Tech Stack

| Category | Technology | Version |
|---|---|---|
| **UI Library** | React | 19.x |
| **Build Tool** | Vite | 5.x |
| **Animations** | Framer Motion | 11.x |
| **Icons** | react-icons (`/si`, `/fi`, `/fa`, `/di`) | 5.x |
| **Styling** | Vanilla CSS (CSS Variables + Glassmorphism) | — |
| **Animation Engine** | HTML5 Canvas (particles) | — |
| **Font** | Inter (Google Fonts) | — |
| **Code Font** | JetBrains Mono / Fira Code (Google Fonts) | — |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `>= 18.x`
- npm `>= 9.x`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Yuvraj-1508/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be live at **http://localhost:5173**

### Available Scripts

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Build optimised production bundle → ./dist
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint checks
```

---

## 📄 Sections

| # | Section | Description |
|---|---|---|
| 01 | **Hero** | Name, animated role titles, CTA buttons, orbital tech card visual |
| 02 | **About** | Bio, stats cards, live code snippet card (`yuvraj.cs`) |
| 03 | **Services** | Landing pages & Database/CRUD offerings with feature lists |
| 04 | **Skills** | Tech stack grid with real brand icons grouped by category |
| 05 | **Projects** | Featured projects with numbered badges, tech tags, GitHub links |
| 06 | **Experience** | Timeline card for OM Software Pvt. Ltd. internship |
| 07 | **Education** | BCA degree card with coursework tags |
| 08 | **Certifications** | Brand icon cards for Microsoft, Udemy, Coursera, OM Software |
| 09 | **Contact** | Contact links panel + message form |

---

## 🎨 Design System

CSS custom properties are defined in `src/index.css`:

```css
--bg-primary:      #060d1a   /* Deep navy base */
--bg-secondary:    #0a0f1e   /* Section alt */
--blue:            #3b82f6   /* Primary accent */
--cyan:            #06b6d4   /* Secondary accent */
--purple:          #8b5cf6   /* Tertiary accent */
--font-heading:    'Inter', sans-serif
--font-code:       'JetBrains Mono', monospace
--glass-bg:        rgba(255,255,255,0.04)
--border-glass:    rgba(255,255,255,0.08)
```

---

## 🌐 Deployment

The built output (`./dist`) is a static site — deploy anywhere:

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag & drop ./dist into Netlify dashboard
# Or: netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "vite build && gh-pages -d dist"

npm run deploy
```

---

## 🔧 Customisation

To personalise this portfolio for yourself:

1. **Personal info** — Update name, bio, email, GitHub, LinkedIn in `src/App.jsx`
2. **Hero roles** — Edit the `texts` array in `<TypingText />` usage
3. **Projects** — Edit the `PROJECTS` array in `App.jsx`
4. **Skills** — Edit the `SKILL_GROUPS` array in `App.jsx`
5. **Certifications** — Edit the `CERTS` array in `App.jsx`
6. **Services** — Edit the `SERVICES` array in `App.jsx`
7. **Resume** — Replace `public/resume.pdf` with your CV
8. **Colors** — Adjust CSS variables in `src/index.css`

---

## 📸 Screenshots

> Add your screenshots here after deploying!

```
public/
└── screenshots/
    ├── hero.png
    ├── skills.png
    ├── projects.png
    └── certifications.png
```

---

## 📝 License

This project is open source under the [MIT License](LICENSE).  
Feel free to fork, customise, and use it for your own portfolio!

---

<div align="center">

**Built with ❤️ by [Yuvraj Rotliwala](https://github.com/Yuvraj-1508)**

[![GitHub](https://img.shields.io/badge/GitHub-Yuvraj--1508-181717?style=flat-square&logo=github)](https://github.com/Yuvraj-1508)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-yuvraj__rotliwala-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/yuvraj_rotliwala)

*⭐ Star this repo if you found it helpful!*

</div>
