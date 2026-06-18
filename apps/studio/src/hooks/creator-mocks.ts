// apps/studio/src/hooks/creator-mocks.ts
import { useState, useEffect } from 'react'

// Simulador de Delay para parecer uma API real
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

// 1. Métricas e Configurações
export function useStudioMetrics() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    delay(800).then(() => {
      setData({
        storage: { used: 320 * 1024 * 1024, limit: 500 * 1024 * 1024 }, // 320MB / 500MB
        followers: { total: 1204, trend: '+12%' },
        bugs: { critical: 3, open: 8 },
        views: { weekly: 4500 }
      })
      setLoading(false)
    })
  }, [])

  return { data, loading }
}

export function useTeamMembers() {
  const [members, setMembers] = useState([
    { id: 1, name: 'Admin', email: 'admin@studio.com', role: 'admin' },
    { id: 2, name: 'João', email: 'joao@studio.com', role: 'editor' },
  ])
  return { members, limit: 5 }
}

// 2. Conteúdo e Documentação
export function useStudioContent(type: 'wiki' | 'blog' | 'changelog') {
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    delay(600).then(() => {
      if (type === 'wiki') {
        setContent([
          { id: 'w1', title: 'Guia de Contribuição', isPublic: true, lastEdit: '2023-10-01' },
        ])
      } else if (type === 'blog') {
        setContent([
          { id: 'b1', title: 'Atualização Mensal #1', status: 'published', views: 340 },
        ])
      }
      setLoading(false)
    })
  }, [type])

  return { content, loading, limits: { wikiPublic: 3, wikiPrivate: 0 } }
}

export function useMediaLibrary() {
  const [media, setMedia] = useState([
    { id: 'm1', url: 'https://via.placeholder.com/150', size: 2.4 * 1024 * 1024 },
  ])
  return { media }
}

// 3. Engenharia
export function useBugTracker() {
  const [bugs, setBugs] = useState([
    { id: 'bug1', title: 'Erro no login', status: 'open', priority: 'critical' },
  ])
  return { bugs }
}

export function useExternalIntegrations() {
  const [commits, setCommits] = useState([
    { hash: 'a1b2c3d', message: 'Fix auth bug', author: 'dev1' }
  ])
  return { commits }
}

// 4. Comunidade
export function useCommunityFeed() {
  const [feed, setFeed] = useState([
    { id: 'f1', type: 'forum', text: 'Novo comentário no fórum: Como jogar?', date: '10 min atrás' },
    { id: 'f2', type: 'bug', text: 'Membro relatou um bug #42', date: '2 horas atrás' },
  ])
  return { feed }
}
