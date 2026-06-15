'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserPosts, toggleLike } from '@camplog/api/profile'
import type { PostPageResponse } from '@camplog/types'
import { PostCard } from './PostCard'

interface PostFeedProps {
  userId: string
}

export function PostFeed({ userId }: PostFeedProps) {
  const queryClient = useQueryClient()
  const sentinelRef = useRef<HTMLDivElement>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<PostPageResponse>({
    queryKey: ['posts', userId],
    queryFn: ({ pageParam }) =>
      getUserPosts(userId, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  })

  const likeMutation = useMutation({
    mutationFn: (postId: string) => toggleLike(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts', userId] })
      const previousData = queryClient.getQueryData(['posts', userId])

      queryClient.setQueryData(['posts', userId], (old: any) => {
        if (!old) return old
        return {
          ...old,
          pages: old.pages.map((page: PostPageResponse) => ({
            ...page,
            data: page.data.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    likedByMe: !post.likedByMe,
                    likesCount: post.likedByMe
                      ? post.likesCount - 1
                      : post.likesCount + 1,
                  }
                : post,
            ),
          })),
        }
      })

      return { previousData }
    },
    onError: (_err, _postId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['posts', userId], context.previousData)
      }
    },
  })

  // IntersectionObserver para infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '200px',
    })
    const sentinel = sentinelRef.current
    if (sentinel) observer.observe(sentinel)
    return () => {
      if (sentinel) observer.unobserve(sentinel)
    }
  }, [handleObserver])

  if (isLoading) {
    return (
      <div className="post-feed-loading">
        <div className="loading-spinner" />
        <span>Carregando posts...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="post-feed-error">
        <p>Ocorreu um erro ao carregar os posts.</p>
      </div>
    )
  }

  const allPosts = data?.pages.flatMap((page) => page.data) ?? []

  if (allPosts.length === 0) {
    return (
      <div className="post-feed-empty">
        <p>Nenhum post publicado ainda.</p>
      </div>
    )
  }

  return (
    <div className="post-feed">
      {allPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLikeToggle={(postId) => likeMutation.mutate(postId)}
        />
      ))}

      {/* Sentinel para infinite scroll */}
      <div ref={sentinelRef} className="post-feed-sentinel">
        {isFetchingNextPage && (
          <div className="loading-spinner-small" />
        )}
      </div>
    </div>
  )
}
