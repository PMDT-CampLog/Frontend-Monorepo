// Wrapper genérico para respostas paginadas da API
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  hasNextPage: boolean
}

// Estrutura de erro padronizada retornada pelo backend
export interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}
