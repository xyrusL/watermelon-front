# AGENTS.md — Watermelon

Instructions for AI coding agents (Codex, OpenAI Codex CLI, Aider, Gemini CLI, etc.) working in this repo.
Claude Code / Kilo users: see `CLAUDE.md` — same rules, same content.

## Project summary

Watermelon is a Minecraft server hosting website (Aternos-style), built from scratch.

- **Public zone:** landing page, login, register
- **Authenticated app ("main page"):** server dashboard — server list, server detail, console, files, settings, player management

Full page flow and architecture: `docs/PROJECT_FLOW.md` — read it before structural changes.

## Tech stack

- Vite + React 19 + TypeScript (strict) — main language is always TypeScript
- Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first config in `src/index.css` `@theme`; do NOT create `tailwind.config.js`)
- React Router for pages (`/`, `/login`, `/register`, `/app`, `/app/:id`)
- npm as package manager (`package-lock.json` is committed)

## Coding rules

1. **Modular.** One feature = one folder under `src/pages/<feature>/`. Page-level components live in that folder's `components/` subfolder. Nothing page-specific outside its page folder.
2. **Shared UI.** Reusable primitives (Button, Input, Card, Badge, Spinner) go in `src/components/ui/`. Layout shells (Navbar, Footer, Sidebar) go in `src/components/layout/`. Before writing a new styled element, check if a shared component fits or should be extended.
3. **Organized structure.** Follow the layout in `docs/PROJECT_FLOW.md`:
   - `src/pages/` — routes' pages (landing, login, register, dashboard)
   - `src/components/ui/` + `src/components/layout/` — shared components
   - `src/lib/api/` — fetch wrappers per domain (`client.ts`, `auth.ts`, `servers.ts`)
   - `src/lib/auth/` — AuthContext, ProtectedRoute, useAuth
   - `src/hooks/` — shared logic hooks
   - `src/types/` — shared TypeScript contracts (`auth.ts`, `server.ts`)
4. **Types first.** Shared data shapes belong in `src/types/`, never inline-declared twice across features.
5. **Small files.** Prefer many focused files over large ones. A page file is composition; sections and widgets are separate components.
6. **Styling.** Tailwind utility classes only. Custom design tokens via `@theme` in `index.css`. No CSS modules, no styled-components, no inline `style` unless dynamic.
7. **No speculative abstractions.** Handle the concrete requirement; do not build generic systems for hypothetical future needs.

## Commands — permissions

- `npm run lint` — **run this after every change.** It is the standard verification step and must pass before finishing a task.
- `npm run build` — **NEVER run without explicit user permission.** The user controls when production builds happen. Ask first.
- `npm run dev` — allowed for testing changes during development.
- `npm install <pkg>` — only when the task genuinely requires a new dependency; mention it when done.

## Git workflow

- `main` is stable; feature work happens on branches: `feat/landing-page`, `feat/dashboard` (main-page owner), `feat/auth-login` (auth owner).
- Commit messages: `type: description` (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
- Never commit `node_modules/` or `dist/` (already gitignored).
- Shared files (`src/routes/`, `src/types/`, `src/components/ui/`) should change sparingly and deliberately — they are coordination points between the two developers.

## Division of work (current team)

| Area | Files | Owner |
|---|---|---|
| Landing page | `src/pages/landing/` | main-page dev |
| Dashboard / server pages | `src/pages/dashboard/`, `src/lib/api/servers.ts`, `src/types/server.ts` | main-page dev |
| Login / register / auth | `src/pages/login/`, `src/pages/register/`, `src/lib/auth/`, `src/lib/api/auth.ts`, `src/types/auth.ts` | auth dev |
| Shared UI + routes | `src/components/`, `src/routes/` | both, via review |

When adding anything that spans two owners' areas, update `docs/PROJECT_FLOW.md` first so the contract changes are visible to both.

## Docs

- `docs/PROJECT_FLOW.md` — page flow, folder layout, route table, type contracts. Keep it current when architecture changes.
