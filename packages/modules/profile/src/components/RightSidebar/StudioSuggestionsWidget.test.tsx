import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { StudioSuggestionsWidget } from './StudioSuggestionsWidget'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as api from '@camplog/api/profile'

vi.mock('@camplog/api/profile', () => ({
  getStudioSuggestions: vi.fn(),
  followStudio: vi.fn(),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

describe('StudioSuggestionsWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('renders loading state initially', () => {
    vi.mocked(api.getStudioSuggestions).mockReturnValue(new Promise(() => {}))
    render(
      <QueryClientProvider client={queryClient}>
        <StudioSuggestionsWidget userId="1" />
      </QueryClientProvider>
    )
    expect(screen.getByText('Carregando sugestões...')).toBeInTheDocument()
  })

  it('renders suggestions', async () => {
    vi.mocked(api.getStudioSuggestions).mockResolvedValueOnce([
      { id: 1, name: 'Studio One', tags: 'RPG', followed: false }
    ])
    
    render(
      <QueryClientProvider client={queryClient}>
        <StudioSuggestionsWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Studio One')).toBeInTheDocument()
      expect(screen.getByText('RPG')).toBeInTheDocument()
      expect(screen.getByText('Seguir')).toBeInTheDocument()
    })
  })
})
