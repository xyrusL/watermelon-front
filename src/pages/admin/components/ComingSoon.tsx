interface Props {
  tab: string
}

/**
 * Rendered for every admin tab that isn't implemented yet.
 * Kept in its own file so it can be deleted once all tabs exist.
 */
export function ComingSoon({ tab }: Props) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 px-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{tab}</p>
      <h3 className="mt-2 text-lg font-bold text-zinc-200">Coming soon</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
        This section is not implemented yet. Check back soon — only <em>Dashboard</em> is live for now.
      </p>
    </div>
  )
}
