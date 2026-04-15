'use client'

import { useWikiPages } from '@camplog/api/wiki'
import { Button } from '@camplog/ui'

interface WikiPageListProps {
  projectSlug: string
}

// Componente "inteligente" — conhece a regra de negócio e gerencia estado remoto
export function WikiPageList({ projectSlug }: WikiPageListProps) {
  const { data, isLoading, isError } = useWikiPages(projectSlug)

  if (isLoading) {
    return <p className="text-white/60 animate-pulse">Carregando páginas...</p>
  }

  if (isError || !data) {
    return <p className="text-red-400">Erro ao carregar páginas da wiki.</p>
  }

  return (
    <section>
      <ul className="flex flex-col gap-2">
        {data.data.map((page) => (
          <li key={page.id} className="rounded-lg border border-surface-overlay bg-surface-raised p-4">
            <h3 className="font-medium text-white">{page.title}</h3>
            <p className="mt-1 text-sm text-white/60">/{page.slug}</p>
          </li>
        ))}
      </ul>

      {data.hasNextPage && (
        <div className="mt-4 flex justify-center">
          <Button variant="secondary" size="sm">
            Carregar mais
          </Button>
        </div>
      )}
    </section>
  )
}
