import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSpotifyStatus, getSpotifyAuthUrl, disconnectSpotify, setSpotifyPreferences } from '@camplog/api/profile'
import { WidgetCard } from './WidgetCard'

interface OstWidgetProps {
  userId: string
  isOwner?: boolean
}

export function OstWidget({ userId, isOwner = false }: OstWidgetProps) {
  const queryClient = useQueryClient()
  const [trackInput, setTrackInput] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const { data: status, isLoading } = useQuery({
    queryKey: ['spotifyStatus', userId],
    queryFn: () => getSpotifyStatus(userId),
  })

  const connectMutation = useMutation({
    mutationFn: getSpotifyAuthUrl,
    onSuccess: (data) => {
      if (data && data.url) {
        window.location.assign(data.url)
      } else {
        alert("Erro: URL de autorização do Spotify não recebida.")
      }
    },
    onError: (error) => {
      console.error("Erro ao conectar ao Spotify:", error)
      alert("Falha ao iniciar conexão com Spotify. Verifique o console.")
    }
  })

  const disconnectMutation = useMutation({
    mutationFn: () => disconnectSpotify(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spotifyStatus', userId] })
    }
  })

  const pinTrackMutation = useMutation({
    mutationFn: (trackId?: string) => setSpotifyPreferences(userId, trackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spotifyStatus', userId] })
      setIsEditing(false)
      setTrackInput('')
    }
  })

  if (isLoading) {
    return (
      <WidgetCard title="OST Favorita">
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Carregando OST...</span>
      </WidgetCard>
    )
  }

  // If visitor and not connected or no track pinned, hide the widget
  if (!isOwner && (!status?.connected || !status?.trackId)) {
    return null
  }

  return (
    <WidgetCard title="OST Favorita">
      {!status?.connected ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--body-text)', lineHeight: 1.4 }}>
            Aviso: Ao conectar sua conta, o CampLog terá acesso a ler a música que você está escutando no momento e suas preferências.
          </span>
          <button 
            type="button"
            onClick={() => connectMutation.mutate()}
            disabled={connectMutation.isPending}
            style={{
              background: connectMutation.isPending ? '#1DB954aa' : '#1DB954',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: connectMutation.isPending ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem'
            }}
          >
            {connectMutation.isPending ? 'Conectando...' : 'Conectar com Spotify'}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {isOwner && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--icon-accent)', fontWeight: 'bold' }}>Conta Vinculada</span>
              <button 
                onClick={() => disconnectMutation.mutate()}
                style={{ background: 'transparent', border: 'none', color: 'var(--danger-color, #ff4d4f)', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Desconectar
              </button>
            </div>
          )}

          {status.trackId ? (
            <iframe
              src={`https://open.spotify.com/embed/track/${status.trackId}?utm_source=generator`}
              width="100%"
              height="80"
              frameBorder="0"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: '12px', border: 'none' }}
              title="Spotify Player"
            />
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>
              Nenhuma música tocando ou fixada.
            </span>
          )}

          {isOwner && (
            <div style={{ marginTop: '0.5rem' }}>
              {!isEditing ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setIsEditing(true)}
                    style={{ flex: 1, background: 'var(--card-bg-light)', border: '1px solid var(--card-border)', color: 'var(--body-text)', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Fixar Música
                  </button>
                  <button 
                    onClick={() => pinTrackMutation.mutate(undefined)}
                    style={{ flex: 1, background: 'var(--card-bg-light)', border: '1px solid var(--card-border)', color: 'var(--body-text)', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Mostrar Atual
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    placeholder="ID ou Link da Música..." 
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
                    style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--card-border)', background: 'var(--app-bg)', color: '#fff', fontSize: '0.8rem' }}
                  />
                  <button 
                    onClick={() => {
                      const trackParts = trackInput.split('track/');
                      const id = trackParts.length > 1 ? trackParts[1]?.split('?')[0] || trackInput : trackInput;
                      pinTrackMutation.mutate(id);
                    }}
                    style={{ background: 'var(--icon-accent)', color: '#000', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                  >
                    Salvar
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    style={{ background: 'transparent', color: 'var(--body-text)', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </WidgetCard>
  )
}
