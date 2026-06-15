'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  uploadCover,
  createPost,
} from '@camplog/api/profile'
import type { SupporterProfile, UpdateProfileRequest, CreatePostRequest } from '@camplog/types'
import {
  ProfileHeader,
  ProfileTabs,
  PostFeed,
  PostComposer,
  ProfileEditModal,
  ImageUploader,
  LikedPostsFeed,
  InterestsGrid,
} from '@camplog/module-profile'
import type { TabId } from '@camplog/module-profile'

export default function ProfilePage() {
  const params = useParams()
  const userId = params?.userId as string
  const queryClient = useQueryClient()

  const [activeTab, setActiveTab] = useState<TabId>('feed')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [showCoverUploader, setShowCoverUploader] = useState(false)

  // Busca o perfil do usuário
  const { data: profile, isLoading, isError } = useQuery<SupporterProfile>({
    queryKey: ['profile', userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
  })

  // Verifica se o usuário logado é o dono do perfil
  const currentUserId =
    typeof window !== 'undefined'
      ? (() => {
          try {
            const token = localStorage.getItem('camplog:token')
            if (!token) return null
            const payload = JSON.parse(atob(token.split('.')[1] || ''))
            return payload.userId || null
          } catch {
            return null
          }
        })()
      : null

  const isOwner = currentUserId === userId

  // Mutations
  const updateMutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] })
      setShowEditModal(false)
    },
  })

  const avatarMutation = useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] })
    },
  })

  const coverMutation = useMutation({
    mutationFn: (file: File) => uploadCover(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] })
    },
  })

  const postMutation = useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', userId] })
    },
  })

  if (isLoading) {
    return (
      <div className="profile-page-loading">
        <div className="loading-spinner" />
        <p>Carregando perfil...</p>
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <div className="profile-page-error">
        <h2>Perfil não encontrado</h2>
        <p>O perfil solicitado não existe ou não está disponível.</p>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <ProfileHeader
        profile={profile}
        isOwner={isOwner}
        onEditClick={() => setShowEditModal(true)}
        onAvatarClick={() => setShowAvatarUploader(true)}
        onCoverClick={() => setShowCoverUploader(true)}
      />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="profile-tab-content">
        {activeTab === 'feed' && (
          <>
            {isOwner && (
              <PostComposer
                onSubmit={(data) => postMutation.mutate(data)}
                isLoading={postMutation.isPending}
              />
            )}
            <PostFeed userId={userId} />
          </>
        )}

        {activeTab === 'likes' && <LikedPostsFeed userId={userId} />}

        {activeTab === 'interests' && (
          <InterestsGrid interests={profile.interests || []} />
        )}
      </div>

      {/* Modais */}
      {showEditModal && (
        <ProfileEditModal
          profile={profile}
          onSave={(data) => updateMutation.mutate(data)}
          onClose={() => setShowEditModal(false)}
          isLoading={updateMutation.isPending}
        />
      )}

      {showAvatarUploader && (
        <ImageUploader
          aspectRatio={1}
          title="Alterar Foto de Perfil"
          onCrop={(blob) => {
            const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' })
            avatarMutation.mutate(file)
          }}
          onClose={() => setShowAvatarUploader(false)}
        />
      )}

      {showCoverUploader && (
        <ImageUploader
          aspectRatio={3}
          title="Alterar Foto de Capa"
          onCrop={(blob) => {
            const file = new File([blob], 'cover.jpg', { type: 'image/jpeg' })
            coverMutation.mutate(file)
          }}
          onClose={() => setShowCoverUploader(false)}
        />
      )}
    </div>
  )
}
