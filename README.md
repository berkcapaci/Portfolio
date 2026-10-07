# Berk Çapacı – Portfolio

Personal portfolio website of **Berk Çapacı**, Fullstack Developer based in Arnsberg, Germany.

🔗 **Live:** [berkcapaci.developerakademie.net/Portfolio](https://berkcapaci.developerakademie.net/Portfolio/)

---

## About

A single-page portfolio built with Angular that introduces me, my skills and my projects, and lets visitors get in touch through a contact form. The site is fully responsive from 320px up to large desktop screens and available in English and German.

## Features

- **Bilingual (EN/DE)** – language switch in the header, the choice is saved in the browser and the browser language is used on the first visit
- **Responsive layout** – separate desktop, tablet and mobile layouts, tested from 320px to 1440px+
- **Scroll spy navigation** – the header highlights the section currently in view
- **Project showcase** – hover preview on desktop and a detail modal with technologies, GitHub and live links (closes with Esc or a click outside)
- **Contact form** – reactive form with validation, privacy checkbox and email delivery via EmailJS
- **Legal pages** – Impressum and Datenschutzerklärung (German)
- **Accessibility details** – reduced motion support, ARIA labels, keyboard support for the modal

## Tech Stack

| Area | Tools |
|---|---|
| Framework | Angular (standalone components, signals) |
| Language | TypeScript |
| Styling | SCSS (7-1 structure, variables, mixins, breakpoints) |
| Translations | ngx-translate |
| Forms | Angular Reactive Forms |
| Email | EmailJS |
| Fonts | Fira Code, Karla, Berkshire Swash (self-hosted) |

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── layout/        # header, footer
│   │   ├── services/      # scroll, language, contact mail
│   │   ├── data/          # skills data
│   │   └── config/        # EmailJS config
│   ├── features/          # hero, about, skills, projects, contact
│   └── pages/             # home, legal notice, privacy policy
└── styles/                # abstracts, base, main
public/
├── i18n/                  # en.json, de.json
├── icons/
└── images/
```

## Getting Started

**Requirements:** Node.js and the Angular CLI

```bash
# Clone the repository
git clone https://github.com/berkcapaci/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start the development server
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

## Build & Deployment

The site is deployed to a subfolder, so the base href is set at build time:

```bash
ng build --base-href /Portfolio/
```

The output in `dist/portfolio-app/browser/` is uploaded via FTP. Routing uses hash URLs (`/#/impress`), so pages can be reloaded on servers without rewrite rules.

## Contact

- 📧 berkcapaci.de@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/berkcapaci/)
- 🐙 [GitHub](https://github.com/berkcapaci)

---

© Berk Çapacı
