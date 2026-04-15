// Tipos específicos do módulo wiki — espelham o contrato do backend
export interface WikiPage {
  id: string
  slug: string
  title: string
  content: string
  authorId: string
  projectId: string
  createdAt: string
  updatedAt: string
}
