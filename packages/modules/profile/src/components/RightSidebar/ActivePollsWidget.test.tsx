import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ActivePollsWidget } from './ActivePollsWidget'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as api from '@camplog/api/profile'

vi.mock('@camplog/api/profile', () => ({
  getActivePolls: vi.fn(),
  votePoll: vi.fn(),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

describe('ActivePollsWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('renders loading state initially', () => {
    vi.mocked(api.getActivePolls).mockReturnValue(new Promise(() => {}))
    render(
      <QueryClientProvider client={queryClient}>
        <ActivePollsWidget userId="1" />
      </QueryClientProvider>
    )
    expect(screen.getByText('Carregando enquetes...')).toBeInTheDocument()
  })

  it('renders empty state', async () => {
    vi.mocked(api.getActivePolls).mockResolvedValueOnce(null as any)
    render(
      <QueryClientProvider client={queryClient}>
        <ActivePollsWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Nenhuma enquete ativa')).toBeInTheDocument()
    })
  })

  it('renders poll options and calculates percentages', async () => {
    vi.mocked(api.getActivePolls).mockResolvedValueOnce({
      id: 'p1',
      question: 'Poll?',
      options: [
        { id: 'o1', text: 'Option 1', votes: 10 },
        { id: 'o2', text: 'Option 2', votes: 10 }
      ],
      userVote: null
    })
    
    render(
      <QueryClientProvider client={queryClient}>
        <ActivePollsWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Poll?')).toBeInTheDocument()
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getAllByText('50% (10)')).toHaveLength(2)
    })
  })
})
