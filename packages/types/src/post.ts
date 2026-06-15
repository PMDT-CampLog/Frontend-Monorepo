export type PostType = 'TEXT' | 'IMAGE'

export interface Post {
  id: string
  authorId: string
  authorName: string
  authorAvatarUrl: string | null
  type: PostType
  content: string
  latexEnabled: boolean
  media: PostMedia[]
  likesCount: number
  likedByMe: boolean
  createdAt: string
  updatedAt: string
}

export interface PostMedia {
  id: string
  mediaUrl: string
  position: number
}

export interface CreatePostRequest {
  content: string
  type: PostType
  latexEnabled?: boolean
}

export interface PostPageResponse {
  data: Post[]
  total: number
  nextCursor: string | null
  hasNextPage: boolean
}
