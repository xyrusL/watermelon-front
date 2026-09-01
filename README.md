# 🍉 Watermelon

**Free Minecraft server hosting — Aternos-style, built from scratch.**

Watermelon lets anyone spin up and manage a Minecraft server in the browser. No uploads, no FTP clients, no port forwarding — configure, secure, and control your server through a clean web dashboard.

> Frontend repository. The backend control plane (panel + server orchestration) lives separately; this repo talks to it through `src/lib/api/`.

## ✨ What it does

| | |
|---|---|
| **🖥️ Server Management** | Create, start, stop, restart, and delete servers. Live status polling, player counts, RAM and version controls. |
| **⚙️ Easy Configuration** | `server.properties`, `eula.txt`, whitelist — edit them through a file manager or a guided settings form. Pick Minecraft version or mod loader (Vanilla, Paper, Fabric, Forge). |
| **🔒 Security** | Whitelist and ban player lists, per-server permissions, session-based auth, automatic player cleanup. |
| **🎮 Real-time Console** | Streamed server console with command input, log levels, and crash detection. |
| **📁 Files & Databases** | Upload, edit, rename, delete world files. MySQL databases for plugins. Backups and restore. |
| **👥 Player Management** | Ops, player skins, and join/leave tracking per server. |

## 🧱 Tech stack

- **[Vite](https://vite.dev)** — dev server & build tool
- **[React 19](https://react.dev)** — UI
- **[TypeScript](https://typescriptlang.org)** (strict) — main language
- **[Tailwind CSS v4](https://tailwindcss.com)** — styling (`@tailwindcss/vite`, CSS-first config)
- **[React Router](https://reactrouter.com)** — routing for public + authenticated zones
- **[Lucide](https://lucide.dev)** / custom assets — icons and imagery
- **[oxlint](https://oxc.rs/docs/guide/usage/linter)** — linting

## 🗺️ Pages

| Route | Page | Auth |
|---|---|---|
| `/` | Landing — hero, features, CTA | public |
| `/login` | Login | public |
| `/register` | Register | public |
| `/app` | Dashboard — server list | protected |
| `/app/:id` | Server detail — console, files, settings | protected |

See `docs/PROJECT_FLOW.md` for the full architecture, folder layout, and shared type contracts.

## 🚀 Getting started

```bash
git clone https://github.com/xyrusL/watermelon-front.git
cd watermelon-front
npm install
npm run dev
```

Then open `http://localhost:5173/`.

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run lint` | Run `oxlint` (must pass on every change) |
| `npm run build` | Production build (`tsc -b && vite build`) — **only run with maintainer permission** |
| `npm run preview` | Preview the built app locally |

## 📁 Project structure (abridged)

```
src/
├── pages/          # landing, login, register, dashboard (feature folders)
├── components/     # shared ui/ + layout/
├── lib/            # api/ (fetch wrappers) + auth/ (context, guards)
├── hooks/          # shared logic hooks
├── routes/         # route tree
├── types/          # shared TS contracts
└── index.css       # Tailwind import + design tokens
```

The complete layout — including per-folder ownership between the two developers — is in `docs/PROJECT_FLOW.md`.

## 🎨 Design philosophy

Watermelon's palette leans into its name: watermelon-rind greens (`--color-rind`, `#1f7a3d`), flesh-red accents (`--color-flesh`, `#ef4444`), and seed-dark neutrals. The goal is a cool, clean look that still reads as a professional control panel — friendly on the landing page, focused and information-dense inside the dashboard.

Iconography comes from [Lucide](https://lucide.dev) with custom SVGs in `public/` for brand moments. Illustrations and photography are sourced permissive-licensed from [unDraw](https://undraw.co), [Hero Icons](https://heroicons.com), and [Pexels](https://pexels.com) — always credited where required.

## 🤝 Contributing

Two active owners, two zones:

- **Landing + dashboard** — `feat/landing-page`, `feat/dashboard`
- **Login + register + auth** — `feat/auth-login`

Read `AGENTS.md` / `CLAUDE.md` for coding rules, then `docs/PROJECT_FLOW.md` for the contract.

## 📄 License

TBD.
