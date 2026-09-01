/**
 * ============================================================================
 *  ⚠️  TEMPORARY / FAKE DATA — DELETE THIS FILE WHEN THE REAL API EXISTS  ⚠️
 * ============================================================================
 *
 * This file is the ONLY place in the app that holds placeholder admin data.
 * It exists so the /admin dashboard can be demoed before the backend is ready.
 *
 * HOW TO CONNECT REAL DATA (read this before deleting):
 *   1. Every value here is typed by a contract in `src/types/admin.ts`.
 *      The UI components do NOT know this file exists — they only use types.
 *   2. Create `src/lib/api/admin.ts` with a function that fetches the real
 *      data and returns the SAME shape, e.g.
 *
 *          export async function fetchAdminDashboard(serverId: string) {
 *            const res = await client.get(`/admin/${serverId}/dashboard`)
 *            return res.json() satisfies AdminDashboardData
 *          }
 *
 *   3. In `src/pages/admin/AdminPage.tsx`, change the single import:
 *
 *          // TEMPORARY — remove this line:
 *          import { MOCK_DASHBOARD } from '../../lib/mock/admin'
 *          // Replace with:
 *          import { fetchAdminDashboard } from '../../lib/api/admin'
 *
 *      ...and feed `MOCK_DASHBOARD`'s slots with the fetched result instead.
 *   4. Search the whole repo for the token `MOCK_DASHBOARD` — every hit is a
 *      spot that still needs the real value. Once there are zero hits, delete
 *      this file and it is fully gone.
 *
 * Nothing else references mock data, so removal is guaranteed to be localized.
 * ============================================================================
 */

import type { AdminDashboardData, MetricPoint } from '../../types/admin'

/** Helper to label a 24-point hourly series for the demo charts. */
function hourlyLabels(): string[] {
  return Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)
}

function series(values: number[]): MetricPoint[] {
  const labels = hourlyLabels()
  return values.map((value, i) => ({ label: labels[i], value }))
}

const playersValues = [
  4, 3, 3, 2, 2, 1, 1, 2, 5, 8, 11, 14, 16, 15, 13, 17, 21, 24, 22, 19, 15, 12,
  9, 6,
]

const tpsValues = [
  20, 20, 20, 19.8, 20, 20, 19.5, 19.9, 19.2, 18.7, 19.4, 20, 19.7, 19.1, 18.4,
  19.6, 20, 19.8, 19.9, 20, 19.7, 20, 20, 20,
]

const cpuValues = [
  12, 10, 9, 8, 8, 7, 9, 14, 22, 31, 38, 44, 41, 37, 45, 52, 48, 43, 39, 35, 30,
  26, 20, 16,
]

const ramPercentValues = [
  42, 42, 43, 43, 44, 44, 45, 48, 53, 58, 62, 66, 65, 63, 67, 71, 69, 66, 64, 62,
  59, 55, 50, 46,
]

const loadPoints = cpuValues.map((value, i) => ({
  label: hourlyLabels()[i],
  value,
  value2: ramPercentValues[i],
}))

export const MOCK_DASHBOARD: AdminDashboardData = {
  stats: {
    playersOnline: 17,
    playersMax: 40,
    tps: 19.8,
    msPerTick: 12.4,
    cpuLoad: 38,
    ramUsed: 3210,
    ramMax: 5120,
    diskUsed: 8.4,
    diskMax: 20,
    uptime: '3d 14h 22m',
    version: 'Paper 1.21.1',
    status: 'online',
  },
  playersSeries: series(playersValues),
  tpsSeries: series(tpsValues),
  loadSeries: loadPoints,
  memoryBreakdown: [
    { name: 'Entities', value: 920, color: '#1f7a3d' },
    { name: 'Chunks', value: 1180, color: '#34d399' },
    { name: 'Plugins', value: 640, color: '#f59e0b' },
    { name: 'Free', value: 2380, color: '#3f3f46' },
  ],
}
