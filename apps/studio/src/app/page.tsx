export default function StudioPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Sidebar */}
      <div className="flex flex-1">
        <aside className="flex w-60 flex-col gap-1 border-r border-surface-overlay bg-surface p-4">
          <div className="mb-4 px-2">
            <span className="text-lg font-bold text-white">
              Camp<span className="text-brand-400">Log</span>{' '}
              <span className="text-sm font-normal text-white/40">Studio</span>
            </span>
          </div>
          {['Dashboard', 'Wiki', 'Fórum', 'Bug Tracker', 'Devlog', 'Configurações'].map(
            (item) => (
              <button
                key={item}
                className="rounded-lg px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-surface-raised hover:text-white"
              >
                {item}
              </button>
            ),
          )}
        </aside>

        {/* Conteúdo principal */}
        <div className="flex flex-1 flex-col gap-6 p-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-white/50">Bem-vindo ao CampLog Studio</p>
          </div>

          {/* Métricas stub */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Páginas de Wiki', value: '--' },
              { label: 'Posts no Fórum', value: '--' },
              { label: 'Bugs Abertos', value: '--' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-surface-overlay bg-surface-raised p-6"
              >
                <p className="text-sm text-white/50">{label}</p>
                <p className="mt-2 text-3xl font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex-1 rounded-2xl border border-dashed border-surface-overlay p-8 text-center text-white/30">
            Selecione um módulo na barra lateral para começar
          </div>
        </div>
      </div>
    </main>
  )
}
