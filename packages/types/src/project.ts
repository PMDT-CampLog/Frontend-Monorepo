export type ProjectStatus = 'active' | 'archived' | 'draft'

export interface Project {
  id: string
  slug: string
  name: string
  description: string
  status: ProjectStatus
  ownerId: string
  createdAt: string
  updatedAt: string
}
