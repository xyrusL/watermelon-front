import { Users, Activity, Cpu, MemoryStick, Gauge, HardDrive, Clock } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { AdminDashboardData } from '../../../types/admin'

interface Props {
  data: AdminDashboardData
}

function StatCard({
  title,
  value,
  sub,
  icon,
  accent,
  children,
}: {
  title: string
  value: string
  sub: string
  icon: React.ReactNode
  accent: string
  children?: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4">
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ backgroundColor: `${accent}22`, color: accent }}>
          {icon}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">{sub}</span>
      </div>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-zinc-400">{title}</p>
      {children && <div className="mt-2 h-12">{children}</div>}
    </div>
  )
}

export function DashboardTab({ data }: Props) {
  const { stats } = data
  const ramPercent = Math.round((stats.ramUsed / stats.ramMax) * 100)

  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {stats.status} · {stats.version}
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-7">
        <StatCard
          title="Players Online"
          value={`${stats.playersOnline}/${stats.playersMax}`}
          sub="live"
          accent="#34d399"
          icon={<Users className="h-5 w-5" />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.playersSeries}>
              <defs>
                <linearGradient id="gPlayers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} fill="url(#gPlayers)" />
            </AreaChart>
          </ResponsiveContainer>
        </StatCard>

        <StatCard
          title="Tick Rate"
          value={`${stats.tps} TPS`}
          sub="20 ideal"
          accent="#38bdf8"
          icon={<Gauge className="h-5 w-5" />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.tpsSeries}>
              <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </StatCard>

        <StatCard
          title="MS / Tick"
          value={`${stats.msPerTick} ms`}
          sub="avg"
          accent="#f59e0b"
          icon={<Activity className="h-5 w-5" />}
        />

        <StatCard
          title="CPU Load"
          value={`${stats.cpuLoad}%`}
          sub="usage"
          accent="#a78bfa"
          icon={<Cpu className="h-5 w-5" />}
        />

        <StatCard
          title="RAM Usage"
          value={`${ramPercent}%`}
          sub={`${(stats.ramUsed / 1024).toFixed(1)}/${(stats.ramMax / 1024).toFixed(1)} GB`}
          accent="#fb7185"
          icon={<MemoryStick className="h-5 w-5" />}
        />

        <StatCard
          title="Disk"
          value={`${stats.diskUsed} GB`}
          sub={`of ${stats.diskMax} GB`}
          accent="#22d3ee"
          icon={<HardDrive className="h-5 w-5" />}
        />

        <StatCard
          title="Uptime"
          value={stats.uptime}
          sub="session"
          accent="#facc15"
          icon={<Clock className="h-5 w-5" />}
        />
      </div>

      {/* Big charts */}
      <div className="grid gap-4 xl:grid-cols-3">
        <ChartCard title="Players Over Time" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.playersSeries}>
              <defs>
                <linearGradient id="gBigPlayers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#27272a" vertical={false} />
              <XAxis dataKey="label" stroke="#71717a" fontSize={11} tickLine={false} interval={3} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip {...tooltipProps} />
              <Area type="monotone" dataKey="value" name="Players" stroke="#34d399" strokeWidth={2} fill="url(#gBigPlayers)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Memory Breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.memoryBreakdown}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                stroke="none"
              >
                {data.memoryBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip {...tooltipProps} formatter={(v) => `${(Number(v) / 1024).toFixed(2)} GB`} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(value) => <span style={{ color: '#a1a1aa' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="CPU & RAM Load" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.loadSeries}>
              <CartesianGrid stroke="#27272a" vertical={false} />
              <XAxis dataKey="label" stroke="#71717a" fontSize={11} tickLine={false} interval={3} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} unit="%" />
              <Tooltip {...tooltipProps} formatter={(v) => `${v}%`} />
              <Legend
                verticalAlign="top"
                iconType="circle"
                formatter={(value) => <span style={{ color: '#a1a1aa' }}>{value}</span>}
              />
              <Line name="CPU" type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={2} dot={false} />
              <Line name="RAM" type="monotone" dataKey="value2" stroke="#fb7185" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="TPS Stability">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.tpsSeries}>
              <defs>
                <linearGradient id="gTps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#27272a" vertical={false} />
              <XAxis dataKey="label" stroke="#71717a" fontSize={11} tickLine={false} interval={5} />
              <YAxis domain={[15, 20]} stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip {...tooltipProps} />
              <Area type="monotone" dataKey="value" name="TPS" stroke="#38bdf8" strokeWidth={2} fill="url(#gTps)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

function ChartCard({
  title,
  children,
  className = '',
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 ${className}`}>
      <h3 className="mb-3 text-sm font-semibold text-zinc-300">{title}</h3>
      <div className="h-64">{children}</div>
    </div>
  )
}

const tooltipProps = {
  contentStyle: {
    backgroundColor: '#18181b',
    border: '1px solid #3f3f46',
    borderRadius: 12,
    color: '#f4f4f5',
    fontSize: 12,
  },
  labelStyle: { color: '#a1a1aa' },
  itemStyle: { color: '#f4f4f5' },
  cursor: { stroke: '#3f3f46' },
}
