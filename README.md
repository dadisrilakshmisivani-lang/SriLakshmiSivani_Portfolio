# Dynamic & Interactive Developer Portfolio

This is a premium, modern, and highly interactive developer/creative portfolio website pre-populated with **Dadi Sri Lakshmi Sivani's** professional details from her resume.

## Features

- **Dark Mode First**: Clean glassmorphism styling with HSL gradient accent palettes.
- **Visual Micro-animations**: Animated background blobs, text-typewriter cycle, and responsive hover effects.
- **In-Browser Content Editor**: A floating customizer panel to edit personal bio, social links, project tags, and skills list in real-time.
- **LocalStorage Persistence**: Auto-saves your customizations to the browser so changes persist on reload.
- **Config Export Utility**: Downloads a compiled `portfolio-config.json` configuration file to easily update the default `config.js` permanently.

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (which includes `npm`).

### Installation
Unzip the files, open your terminal (Command Prompt, PowerShell, or bash) in the folder, and run:
```bash
npm install
```

### Running the Local Development Server
Start the high-performance Vite server to view the website locally:
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your web browser.

---

## Customizing Permanently
1. Open the website, click the **Settings Gear** on the top right, and edit your details.
2. Under the bottom footer of the sidebar, click **Export Config** to download `portfolio-config.json`.
3. Open `config.js` in your editor, replace the content of the `portfolioConfig` object with the contents of your exported JSON, and save the file.

---

## Production Build & Deployment
To generate optimized, static HTML/CSS/JS files inside the `dist/` directory (ready to upload to GitHub Pages, Netlify, or Vercel):
```bash
npm run build
```
You can preview the built site locally using:
```bash
npm run preview
```
