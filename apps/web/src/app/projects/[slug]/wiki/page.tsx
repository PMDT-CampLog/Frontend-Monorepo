import { Button } from '@camplog/ui'
import { WikiPageList } from '@camplog/module-wiki'

// Página pública de demonstração de uma wiki de projeto
export default function ProjectWikiPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Wiki do Projeto</h1>
        <Button variant="outline" size="sm">
          Contribuir
        </Button>
      </header>

      {/* Componente inteligente do módulo — gerencia fetch e estado internamente */}
      <WikiPageList projectSlug={params.slug} />
    </main>
  )
}
