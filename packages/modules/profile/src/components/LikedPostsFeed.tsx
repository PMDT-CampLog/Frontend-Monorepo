'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLikedPosts, toggleLike } from '@camplog/api/profile'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostCard } from './PostCard'

interface LikedPostsFeedProps {
  userId: string
}

export function LikedPostsFeed({ userId }: LikedPostsFeedProps) {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['likedPosts', userId],
    queryFn: () => getLikedPosts(userId, 0, 50),
  })

  const likeMutation = useMutation({
    mutationFn: (postId: string) => toggleLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likedPosts', userId] })
    },
  })

  if (isLoading) {
    return (
      <div className="post-feed-loading">
        <div className="loading-spinner" />
        <span>Carregando curtidas...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="post-feed-error">
        <p>Ocorreu um erro ao carregar as curtidas.</p>
      </div>
    )
  }

  const posts = data?.data ?? []

  if (posts.length === 0) {
    return (
      <div className="post-feed-empty">
        <p>Nenhum post curtido ainda.</p>
      </div>
    )
  }

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLikeToggle={(postId) => likeMutation.mutate(postId)}
        />
      ))}
    </div>
  )
}
