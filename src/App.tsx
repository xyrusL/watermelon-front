function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-rind text-sm">🍉</span>
            <span className="text-lg">
              water<span className="text-rind">melon</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
            <a href="#features" className="text-zinc-600 hover:text-zinc-900">Features</a>
            <a href="#about" className="text-zinc-600 hover:text-zinc-900">About</a>
            <a
              href="#get-started"
              className="rounded-full bg-rind px-4 py-2 font-semibold text-white transition hover:bg-rind-dark"
            >
              Get started
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-br from-emerald-50 via-white to-red-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-rind">
              <span className="h-2 w-2 animate-pulse rounded-full bg-flesh" />
              Vite + React + TypeScript + Tailwind CSS
            </span>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Sweet, fast, and
              <span className="bg-gradient-to-r from-rind to-flesh bg-clip-text text-transparent"> refreshing.</span>
            </h1>
            <p className="max-w-lg text-[15px] leading-6 text-zinc-600 sm:text-base">
              Watermelon is your new project website — scaffolded with Vite, typed with TypeScript, and styled with
              Tailwind CSS. Edit <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-sm text-white">src/App.tsx</code> and save to see HMR.
            </p>
            <div id="get-started" className="flex flex-wrap gap-3 pt-1">
              <a
                href="https://vite.dev"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-rind px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rind-dark"
              >
                Explore Vite
              </a>
              <a
                href="https://tailwindcss.com/docs"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-zinc-300 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
              >
                Tailwind Docs
              </a>
            </div>
          </div>

          {/* Card visual */}
          <div className="relative mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg sm:p-8">
            <div className="absolute -right-6 -top-6 hidden h-16 w-16 rounded-2xl bg-flesh/15 sm:block" />
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-rind to-emerald-700 text-2xl text-white shadow">
                🍉
              </span>
              <div>
                <p className="text-sm font-bold">watermelon</p>
                <p className="text-xs text-zinc-500">v0.0.0 — ready to build</p>
              </div>
            </div>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rind" /> Vite — instant HMR
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-flesh" /> TypeScript — strict types
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-zinc-900" /> Tailwind CSS v4
              </li>
            </ul>
            <div className="mt-6 rounded-xl bg-zinc-900 p-3 font-mono text-xs text-emerald-300">
              <div>$ npm run dev</div>
              <div className="text-zinc-400">→ Local: http://localhost:5173/</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight">What&apos;s inside</h2>
        <p className="mt-1 text-sm text-zinc-500">Everything you asked for — nothing you didn&apos;t.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Vite", desc: "Next-generation frontend tooling. Lightning fast dev server and optimized build.", dot: "bg-rind" },
            { title: "TypeScript", desc: "Strict typing with modern TS config. Catch bugs before they ship.", dot: "bg-flesh" },
            { title: "Tailwind CSS", desc: "Utility-first styling with v4 (@tailwindcss/vite) and no extra config.", dot: "bg-zinc-900" },
            { title: "React 19", desc: "Latest React with JSX, hooks, and concurrent features.", dot: "bg-sky-500" },
            { title: "ESLint-ready", desc: "Add your linter of choice — oxlint is included in the template.", dot: "bg-amber-500" },
            { title: "Ready to deploy", desc: "Build with vite build and ship to any static host.", dot: "bg-violet-500" },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${f.dot}`} />
                <h3 className="font-semibold">{f.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-5 text-zinc-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl bg-zinc-900 px-6 py-10 text-white sm:px-10 sm:py-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Start building Watermelon</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
              The stack is set. Replace this landing with your real content, add routes, connect an API — you&apos;re
              good to go.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <code className="rounded-lg bg-white/10 px-3 py-2 font-mono text-sm">npm run dev</code>
              <code className="rounded-lg bg-white/10 px-3 py-2 font-mono text-sm">npm run build</code>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-zinc-400">
            Built with Vite + React + TypeScript + Tailwind CSS — Watermelon · {new Date().getFullYear()}
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
