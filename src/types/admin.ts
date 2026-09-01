/**
 * Admin dashboard — shared TypeScript contracts.
 *
 * IMPORTANT (temporary-data policy):
 * Components import ONLY these types. They must never import mock data
 * directly. All fake/demo values live in `src/lib/mock/admin.ts`.
 * When the real backend arrives, implement functions returning these
 * exact shapes in `src/lib/api/admin.ts` and swap the single import in
 * `AdminPage.tsx` — no component changes needed.
 */

/** A single point on a time-series chart. */
export interface MetricPoint {
  /** Label shown on the X axis, e.g. "12:00" or "Mon". */
  label: string
  /** Primary value (players online, tps, percent, ...). */
  value: number
  /** Optional secondary series value (e.g. RAM % alongside CPU %). */
  value2?: number
}

/** Live headline stats shown in the top stat cards. */
export interface ServerStats {
  /** Players currently online. */
  playersOnline: number
  /** Max player slots for this server. */
  playersMax: number
  /** Ticks per second (20 = perfect). */
  tps: number
  /** Average tick time in milliseconds. */
  msPerTick: number
  /** CPU usage in percent (0-100). */
  cpuLoad: number
  /** RAM used in MiB. */
  ramUsed: number
  /** RAM allocated in MiB. */
  ramMax: number
  /** Disk used in GiB. */
  diskUsed: number
  /** Disk total in GiB. */
  diskMax: number
  /** Human-readable uptime, e.g. "3d 14h". */
  uptime: string
  /** Server version string, e.g. "Paper 1.21.1". */
  version: string
  /** Server state. */
  status: 'online' | 'offline' | 'starting' | 'stopping'
}

/** Everything the Dashboard tab renders. */
export interface AdminDashboardData {
  stats: ServerStats
  /** Players online over time. */
  playersSeries: MetricPoint[]
  /** TPS over time. */
  tpsSeries: MetricPoint[]
  /** CPU % (value) and RAM % (value2) over time. */
  loadSeries: MetricPoint[]
  /** RAM breakdown for the donut chart, in MiB. */
  memoryBreakdown: { name: string; value: number; color: string }[]
}
