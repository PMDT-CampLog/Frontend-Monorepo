import { useQuery } from '@tanstack/react-query'
import { type PaginatedResponse } from '@camplog/types'
import { httpClient } from '../http-client'
import { type WikiPage } from './types'

// Busca uma lista paginada de páginas de wiki de um projeto
export function useWikiPages(projectSlug: string) {
  return useQuery<PaginatedResponse<WikiPage>>({
    queryKey: ['wiki', 'pages', projectSlug],
    queryFn: async () => {
      const { data } = await httpClient.get(`/projects/${projectSlug}/wiki`)
      return data
    },
  })
}

// Busca uma página específica pelo slug
export function useWikiPage(projectSlug: string, pageSlug: string) {
  return useQuery<WikiPage>({
    queryKey: ['wiki', 'page', projectSlug, pageSlug],
    queryFn: async () => {
      const { data } = await httpClient.get(
        `/projects/${projectSlug}/wiki/${pageSlug}`,
      )
      return data
    },
    enabled: Boolean(projectSlug && pageSlug),
  })
}
