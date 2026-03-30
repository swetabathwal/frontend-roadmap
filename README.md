# 📚 Frontend Developer Roadmap

> An interactive, full-featured study platform for frontend developers — from **Junior to Staff/Lead** level.

**Live demo:** _Deploy on Netlify or Vercel (see below)_

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 4 Career Levels | Junior · Mid-Level · Senior · Staff/Lead |
| 📋 250+ Topics | Across 13 categories |
| ✅ Progress Tracking | Checkboxes per topic, saved in localStorage |
| 📝 Notes | Per-topic notes panel |
| ⭐ Bookmarks | Save topics for quick access |
| 📅 Daily Planner | Add/track daily study tasks |
| 📊 Statistics | Detailed progress by level and category |
| 🌙 Dark Mode | One-click toggle |
| 📤 Export / Import | Download/upload progress as JSON |
| 🔍 Search & Filter | Live search + category filter |

## 🗂 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── CategorySection.jsx
│   ├── ExportImport.jsx
│   ├── Header.jsx
│   ├── Icon.jsx
│   ├── ProgressBar.jsx
│   └── TopicCard.jsx
├── context/
│   └── AppContext.jsx  # Global state with useContext
├── data/
│   ├── categories.js
│   ├── levels.js
│   └── topics/
│       ├── index.js
│       ├── junior.js
│       ├── mid.js
│       ├── senior.js
│       └── staff.js
├── hooks/
│   └── useTopicStats.js
├── pages/
│   ├── BookmarksView.jsx
│   ├── Dashboard.jsx
│   ├── LevelView.jsx
│   ├── PlannerView.jsx
│   └── StatsView.jsx
├── utils/
│   └── storage.js
├── App.jsx
├── index.css
└── main.jsx
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deploy

### Netlify (recommended — drag & drop)
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com) → drag & drop the `dist/` folder

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
Add this to `vite.config.js`:
```js
export default defineConfig({
  base: '/frontend-dev-roadmap/',  // your repo name
  plugins: [react()],
})
```
Then push and enable GitHub Pages from the `dist` folder via GitHub Actions.

## 🛠 Tech Stack

- **React 18** — UI library
- **Vite** — Build tool
- **Tailwind CSS 3** — Utility-first styling
- **localStorage** — Persistent state (no backend needed)

## 🤝 Contributing

PRs welcome! To add topics, edit the files in `src/data/topics/`.

## 📄 License

MIT — free to use and modify.

---

Built with ❤️ by [Sweta Bathwal](https://github.com/swetabathwal)
