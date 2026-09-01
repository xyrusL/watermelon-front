import type { ReactNode } from 'react'
import { Menu, Search, Bell, Settings } from 'lucide-react'
import { ADMIN_TABS } from '../adminTabs'

interface AdminLayoutProps {
  activeTab: string
  onSelectTab: (id: string) => void
  children: ReactNode
}

export function AdminLayout({ activeTab, onSelectTab, children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-zinc-800/80 bg-zinc-900/60 px-3 py-5 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-rind to-emerald-700 text-lg">
            🍉
          </span>
          <span className="text-lg font-bold tracking-tight">
            water<span className="text-rind">melon</span>
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {ADMIN_TABS.map((tab) => {
            const Icon = tab.icon
            const active = tab.id === activeTab
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                aria-current={active ? 'page' : undefined}
                className={[
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  active
                    ? 'bg-rind text-white shadow-lg shadow-rind/20'
                    : 'text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-100',
                ].join(' ')}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1 text-left">{tab.label}</span>
                {!tab.enabled && (
                  <span className="rounded-full bg-zinc-700/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                    soon
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-zinc-800/80 bg-zinc-950/80 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg text-zinc-400 hover:bg-zinc-800 md:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex max-w-xl flex-1 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2">
            <Search className="h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
            />
          </div>
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              className="relative grid h-9 w-9 place-items-center rounded-lg text-zinc-400 hover:bg-zinc-800"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-flesh" />
            </button>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-lg text-zinc-400 hover:bg-zinc-800"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            <span className="ml-2 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-flesh to-amber-500 text-sm font-bold">
              J
            </span>
          </div>
        </header>

        {/* Mobile tab strip */}
        <div className="flex gap-1 overflow-x-auto border-b border-zinc-800/80 bg-zinc-900/40 px-3 py-2 md:hidden">
          {ADMIN_TABS.map((tab) => {
            const active = tab.id === activeTab
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={[
                  'whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition',
                  active ? 'bg-rind text-white' : 'text-zinc-400 hover:bg-zinc-800',
                ].join(' ')}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
