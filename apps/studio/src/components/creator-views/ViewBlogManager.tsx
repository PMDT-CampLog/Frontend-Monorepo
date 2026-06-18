import React, { useState } from 'react'
import { useStudioContent } from '../../hooks/creator-mocks'

export function ViewBlogManager() {
  const { content, loading } = useStudioContent('blog')
  const [activeTab, setActiveTab] = useState<'published' | 'drafts' | 'scheduled'>('published')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: 'var(--heading)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>Blog e Publicações</h2>
          <p style={{ color: 'var(--body-text)', fontSize: '0.85rem' }}>Escreva artigos e changelogs para sua comunidade</p>
        </div>
        <button style={{ background: 'var(--icon-accent)', color: '#fff', fontWeight: 600, padding: '0.65rem 1.25rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          + Novo Artigo
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--card-border)' }}>
        {['published', 'drafts', 'scheduled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            style={{
              padding: '0.75rem 1rem', background: 'transparent', border: 'none', cursor: 'pointer',
              color: activeTab === tab ? 'var(--studio-text-primary)' : 'var(--body-text)',
              fontWeight: activeTab === tab ? 700 : 500,
              borderBottom: activeTab === tab ? '2px solid var(--icon-accent)' : '2px solid transparent',
              marginBottom: '-1px', textTransform: 'capitalize'
            }}
          >
            {tab === 'published' ? 'Publicadas' : tab === 'drafts' ? 'Rascunhos' : 'Agendadas'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {loading ? <p style={{ color: 'var(--body-text)' }}>Carregando...</p> : content.map((post) => (
          <div key={post.id} className="studio-card" style={{ display: 'flex', gap: '1.5rem', padding: '1rem', alignItems: 'center' }}>
            <div style={{ width: 120, height: 80, background: 'var(--module-bg)', borderRadius: '8px', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ color: 'var(--studio-text-primary)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{post.title}</h3>
              <p style={{ color: 'var(--body-text)', fontSize: '0.8rem' }}>Por Admin • {post.views} visualizações</p>
            </div>
            <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--body-text)', borderRadius: '8px', cursor: 'pointer' }}>Editar</button>
          </div>
        ))}
        {!loading && content.length === 0 && (
          <p style={{ color: 'var(--body-text)', textAlign: 'center', padding: '2rem' }}>Nenhum post encontrado nesta categoria.</p>
        )}
      </div>
    </div>
  )
}
