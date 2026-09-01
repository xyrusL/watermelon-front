# Temporary (Mock) Data Policy

This project is a **demo**. Some screens show placeholder data. This document
is the single rulebook for how that data is isolated and how to remove it.

Read this before you "connect the backend". Future humans AND AI coding agents
must follow it so fake data never leaks into real wiring.

## Golden rule

> **UI components never import mock data.**
> Components only use types from `src/types/`.
> All fake values live in exactly one place: `src/lib/mock/`.

If you ever see a component importing from `src/lib/mock/`, that's a bug —
the mock should be injected at the page boundary, not consumed inside widgets.

## Where the mock lives

| Path | Purpose |
|---|---|
| `src/lib/mock/admin.ts` | The ONLY mock module right now. Exports `MOCK_DASHBOARD`. |
| `src/types/admin.ts` | The shape contract that mock + real data both satisfy. |
| `src/pages/admin/AdminPage.tsx` | The ONLY file that imports the mock (one import line, marked `// TEMPORARY DATA`). |

Everything is findable with one grep:

```
grep -rn "MOCK_DASHBOARD\|src/lib/mock" src/
```

Every hit is a place that still needs to be made real. The goal is zero hits.

## How to add new temporary data (do it this way)

1. Define the shape in `src/types/<domain>.ts`.
2. Create `src/lib/mock/<domain>.ts` that returns data satisfying that type.
   Add the big ⚠️ banner at the top of the file.
3. Import the mock **only at the page root**, with a `// TEMPORARY DATA` comment.
4. Pass it down as props. Children stay data-source-agnostic.

This keeps the eventual swap to one import per page.

## How to connect real data (the removal recipe)

For each mock module:

1. Create `src/lib/api/<domain>.ts` with fetch functions returning the SAME
   type, e.g.:

   ```ts
   import type { AdminDashboardData } from '../../types/admin'
   import { client } from './client'

   export function fetchAdminDashboard(id: string): Promise<AdminDashboardData> {
     return client.get(`/admin/${id}/dashboard`)
   }
   ```

2. In the page, replace the `// TEMPORARY DATA` import block with a real
   fetch (a `useEffect` or a data hook like `useAdminDashboard`).
3. Handle the async/loading state in the page only.
4. Delete `src/lib/mock/<domain>.ts`.
5. Grep the token again to confirm no stragglers.

Because components were never coupled to the mock, no component file changes.

## Current status

- `/admin` Dashboard tab → `MOCK_DASHBOARD` (`src/lib/mock/admin.ts`).
- All other admin tabs (Server, Option, Player, Plugins, Files, Backup) →
  placeholder `ComingSoon`, no data.
