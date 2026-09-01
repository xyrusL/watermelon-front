import { useState } from 'react'
import { AdminLayout } from './components/AdminLayout'
import { DashboardTab } from './components/DashboardTab'
import { ComingSoon } from './components/ComingSoon'
import { ADMIN_TABS } from './adminTabs'
// TEMPORARY DATA — the single mock import in the app.
// See the header of src/lib/mock/admin.ts for how to replace this with
// the real API and remove all mock data. When done, `MOCK_DASHBOARD`
// should have zero references repo-wide.
import { MOCK_DASHBOARD } from '../../lib/mock/admin'

/**
 * Server admin page — `/admin/:current`.
 * The active tab defaults to `dashboard` (first route segment after /admin).
 */
export default function AdminPage({ current }: { current?: string }) {
  const initial = ADMIN_TABS.find((t) => t.id === current)?.id ?? 'dashboard'
  const [activeTab, setActiveTab] = useState(initial)

  const active = ADMIN_TABS.find((t) => t.id === activeTab) ?? ADMIN_TABS[0]

  return (
    <AdminLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      {activeTab === 'dashboard' ? <DashboardTab data={MOCK_DASHBOARD} /> : <ComingSoon tab={active.label} />}
    </AdminLayout>
  )
}
