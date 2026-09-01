# Watermelon — Project Flow

The architecture and flow guide for everyone working on this repo (humans and AI agents). Start here.

## 1. What we are building

Watermelon is a free-style Minecraft server hosting site (Aternos-inspired, built from scratch).
Users sign up, create a server, and control it from a dashboard: start/stop, console, files, players, settings.

Two zones:

| Zone | Pages | Auth required |
|---|---|---|
| Public | Landing `/`, Login `/login`, Register `/register` | no |
| App (main page) | Dashboard `/app`, Server detail `/app/:id`, Account `/app/account` | yes |

## 2. Page flow

```
                    ┌──────────────────────────────┐
                    │  LANDING PAGE  (/)            │
                    └──────────┬───────────────────┘
                               │ "Get Started" / "Login"
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
      ┌─────────────────┐          ┌─────────────────┐
      │ LOGIN (/login)  │          │ REGISTER        │
      └────────┬────────┘          │ (/register)     │
               │ success           └────────┬────────┘
               ▼                            │
      ┌──────────────────────────────────────┘
      │
      ▼
      ┌─────────────────────────────────────┐
      │  DASHBOARD  (/app)                  │
      │  ├ server list        (/app)        │
      │  ├ server detail      (/app/:id)    │
      │  │   ├ console                      │
      │  │   ├ files, database              │
      │  │   ├ settings, software           │
      │  └ account/settings (/app/account)  │
      └──────────────┬──────────────────────┘
                     │ logout
                     ▼
                Landing (/)
```

Navigation rules:
- Landing CTA buttons → `/login` if session exists? `/app` : `/register`
- `/app/*` routes are wrapped in `ProtectedRoute` — unauthenticated visitors are redirected to `/login`
- After successful login/register → navigate to `/app`
- Navbar: unauthenticated shows "Login" + "Sign up"; authenticated shows username menu with "Log out"

## 3. Route table (single source of truth)

Defined in `src/routes/index.tsx`.

| Path | Page element | File | Auth |
|---|---|---|---|
| `/` | `LandingPage` | `src/pages/landing/LandingPage.tsx` | public |
| `/login` | `LoginPage` | `src/pages/login/LoginPage.tsx` | public |
| `/register` | `RegisterPage` | `src/pages/register/RegisterPage.tsx` | public |
| `/app` | `DashboardPage` | `src/pages/dashboard/DashboardPage.tsx` | protected |
| `/app/:id` | `ServerPage` | `src/pages/dashboard/ServerPage.tsx` | protected |
| `/admin` | `AdminPage` (Dashboard tab) | `src/pages/admin/AdminPage.tsx` | public (demo) |
| `/admin/:current` | `AdminPage` (tab from param) | `src/pages/admin/AdminPage.tsx` | public (demo) |
| `*` | `NotFoundPage` | `src/pages/NotFoundPage.tsx` | public |

## 4. Folder layout

```
src/
├── main.tsx                  # entry + Router + AuthProvider
├── App.tsx                   # route outlet
├── index.css                 # Tailwind import + @theme design tokens
│
├── routes/
│   └── index.tsx             # route tree (shared — change via review only)
│
├── pages/
│   ├── landing/              # owner: main-page dev
│   │   ├── LandingPage.tsx
│   │   └── components/       # Hero.tsx, Features.tsx, Faq.tsx, Cta.tsx
│   ├── login/                # owner: auth dev
│   │   ├── LoginPage.tsx
│   │   └── components/       # LoginForm.tsx
│   ├── register/             # owner: auth dev
│   │   ├── RegisterPage.tsx
│   │   └── components/       # RegisterForm.tsx
│   ├── dashboard/            # owner: main-page dev
│   │   ├── DashboardPage.tsx
│   │   ├── ServerPage.tsx
│   │   └── components/       # ServerList.tsx, ServerCard.tsx,
│   │                         # ConsoleViewer.tsx, ServerStatus.tsx
│   ├── admin/                # owner: main-page dev (demo, mock data)
│   │   ├── AdminPage.tsx     # tab switcher; imports MOCK_DASHBOARD (TEMPORARY)
│   │   ├── adminTabs.ts      # tab registry: dashboard + 6 coming-soon tabs
│   │   └── components/       # AdminLayout.tsx, DashboardTab.tsx, ComingSoon.tsx
│   └── NotFoundPage.tsx
│
├── components/               # shared — used across pages
│   ├── ui/                   # Button.tsx, Input.tsx, Card.tsx, Badge.tsx, Spinner.tsx
│   └── layout/               # Navbar.tsx, Footer.tsx, Sidebar.tsx, PageShell.tsx
│
├── lib/
│   ├── api/
│   │   ├── client.ts         # base fetch: URL, auth header, error shape  (shared)
│   │   ├── auth.ts           # login/register/logout/session             (auth dev)
│   │   └── servers.ts        # list/create/start/stop/console            (main-page dev)
│   ├── auth/
│   │   ├── AuthContext.tsx   # provider + useAuth hook                   (auth dev)
│   │   └── ProtectedRoute.tsx# redirect guard                            (auth dev)
│   └── mock/
│       └── admin.ts          # MOCK_DASHBOARD — TEMPORARY, delete when API exists
│
├── hooks/                    # useServers.ts, usePolling.ts ...
├── types/
│   ├── auth.ts               # User, LoginRequest, Session               (auth dev)
│   ├── server.ts             # Server, ServerStatus, ConsoleLine          (main-page dev)
│   └── admin.ts              # AdminDashboardData, ServerStats, MetricPoint
└── assets/
```

Rules:
- Page-specific components never leave their page folder.
- Anything reused by 2+ pages moves to `components/ui` or `components/layout`.
- One file = one component (plus small private helpers in the same file).

## 5. Shared type contracts

Defined in `src/types/`. Changing a contract requires updating this doc + both owners' review.

```ts
// types/auth.ts
export type User = { id: string; username: string; email: string }
export type LoginRequest = { username: string; password: string }
export type RegisterRequest = { username: string; email: string; password: string }
export type Session = { token: string; user: User }

// types/server.ts
export type ServerStatus = "online" | "offline" | "starting" | "stopping" | "crashed"
export type Server = {
  id: string
  name: string
  ip: string
  port: number
  status: ServerStatus
  players: { online: number; max: number }
  ramMb: number
  version: string
}

// lib/auth/AuthContext.tsx — the hook every page consumes
export type AuthState = {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (req: LoginRequest) => Promise<void>
  register: (req: RegisterRequest) => Promise<void>
  logout: () => void
}

// types/admin.ts — admin dashboard (demo). Shapes satisfied by MOCK_DASHBOARD
// now and by the real API later; components never import mock data directly.
export type MetricPoint = { label: string; value: number; value2?: number }
export type ServerStats = { playersOnline: number; playersMax: number; tps: number; msPerTick: number; cpuLoad: number; ramUsed: number; ramMax: number; diskUsed: number; diskMax: number; uptime: string; version: string; status: "online" | "offline" | "starting" | "stopping" }
export type AdminDashboardData = { stats: ServerStats; playersSeries: MetricPoint[]; tpsSeries: MetricPoint[]; loadSeries: MetricPoint[]; memoryBreakdown: { name: string; value: number; color: string }[] }
```

## 5a. Temporary (mock) data

The `/admin` dashboard is a **demo** and runs on placeholder data. All mock
values are quarantined in `src/lib/mock/admin.ts` and imported in exactly one
place (`src/pages/admin/AdminPage.tsx`, marked `// TEMPORARY DATA`). Components
consume only `src/types/admin.ts` shapes, so connecting the real backend is a
one-import swap per page. Full policy + removal recipe: `docs/TEMPORARY_DATA.md`.

## 6. API layer

- All HTTP goes through `lib/api/client.ts` (`apiFetch`) — never call `fetch` from components.
- `client.ts` attaches the auth token from `localStorage("watermelon_token")` and normalizes errors to `{ message: string; status: number }`.
- Base URL from `import.meta.env.VITE_API_URL` (default `/api`).
- Backend endpoints don't exist yet → auth dev mocks responses inside `lib/api/auth.ts` behind the same signatures so swapping in real HTTP changes only that file.

## 7. Design tokens

Defined in `src/index.css` `@theme`:

| Token | Hex | Use |
|---|---|---|
| `--color-rind` | `#1f7a3d` | primary brand (buttons, active nav) |
| `--color-rind-dark` | `#14532d` | hover/pressed |
| `--color-flesh` | `#ef4444` | accent, danger, alerts |
| `--color-flesh-light` | `#fca5a5` | soft accents |
| `--color-seed` | `#1c1917` | dark text/backgrounds |

Status colors (servers): online = `emerald-500`, offline = `zinc-400`, starting = `amber-500`, crashed = `red-500`.

## 8. Ownership and branches

| Area | Branch | Owner |
|---|---|---|
| Landing + dashboard | `feat/landing-page`, `feat/dashboard` | main-page dev |
| Login + register + auth | `feat/auth-login` | auth dev |
| Routes, shared UI, types | edit sparingly, PR + review | both |

## 9. Definition of done (every task)

1. `npm run lint` passes.
2. New shared shapes added to `src/types/`, not inline duplicates.
3. No `fetch` outside `src/lib/api/`.
4. Page-specific code stays inside the page folder.
5. If a shared contract changed → this file updated in the same commit.
