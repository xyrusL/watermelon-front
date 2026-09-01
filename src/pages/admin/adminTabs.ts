import {
  LayoutDashboard,
  Server as ServerIcon,
  SlidersHorizontal,
  Users,
  Puzzle,
  FolderTree,
  HardDriveDownload,
  type LucideIcon,
} from 'lucide-react'

export interface AdminTab {
  id: string
  label: string
  icon: LucideIcon
  /** Only `dashboard` is implemented; the rest render a placeholder. */
  enabled: boolean
}

/**
 * Tab bar for the admin shell.
 * The order here is the visible order in the sidebar / tab strip.
 * Flip `enabled: true` (and point AdminPage's switch at a real component)
 * as each section is built out.
 */
export const ADMIN_TABS: AdminTab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, enabled: true },
  { id: 'server', label: 'Server', icon: ServerIcon, enabled: false },
  { id: 'option', label: 'Option', icon: SlidersHorizontal, enabled: false },
  { id: 'player', label: 'Player', icon: Users, enabled: false },
  { id: 'plugins', label: 'Plugins', icon: Puzzle, enabled: false },
  { id: 'files', label: 'Files', icon: FolderTree, enabled: false },
  { id: 'backup', label: 'Backup', icon: HardDriveDownload, enabled: false },
]
