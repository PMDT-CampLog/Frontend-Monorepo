import React, { useState, useEffect } from 'react'
import { updateProfile, updatePublicProfile } from '@camplog/api'
import type { SupporterProfile, PublicProfile } from '@camplog/types'

interface ViewSettingsProps {
  profile?: SupporterProfile | null | undefined
  publicProfile?: PublicProfile | null | undefined
}

export function ViewSettings({ profile, publicProfile }: ViewSettingsProps) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Sincroniza estado inicial quando dados chegam
  useEffect(() => {
    if (publicProfile) {
      setUsername(publicProfile.username || '')
      setBio(publicProfile.bio || '')
    }
    if (profile) {
      setDisplayName(profile.displayName || '')
    }
  }, [profile, publicProfile])

  const handleSave = async () => {
    try {
      setIsSaving(true)
      
      // Update basic profile (Display Name)
      if (displayName !== profile?.displayName) {
        await updateProfile({ displayName })
      }

      // Update public profile in Pokedex
      await updatePublicProfile(
        { username, bio },
        avatarFile || undefined,
        coverFile || undefined
      )

      alert('Configurações salvas com sucesso!')
      // Reset files after successful upload
      setAvatarFile(null)
      setCoverFile(null)
      
      // Optional: open the profile if it wasn't configured before
      if (!publicProfile?.username && username) {
        window.open(`http://localhost:3000/perfil/${username}`, '_blank')
      }
    } catch (err) {
      console.error(err)
      alert('Ocorreu um erro ao salvar as configurações. Verifique os dados e tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ color: 'var(--heading)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>Configurações do Estúdio</h2>
        <p style={{ color: 'var(--body-text)', fontSize: '0.85rem' }}>Gerencie o perfil público e faturamento</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="studio-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.9rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Perfil Público</h3>
          
          <div>
            <label style={{ display: 'block', color: 'var(--body-text)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>@ do Estúdio (Username)</label>
            <input 
              type="text" 
              placeholder="ex: meu_estudio"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--studio-text-primary)' }} 
            />
            <span style={{ fontSize: '0.7rem', color: 'var(--heading-sm)' }}>Este será o link do seu perfil: /perfil/{username || '...'}</span>
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--body-text)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Nome do Estúdio</label>
            <input 
              type="text" 
              placeholder="Ex: Meu Estúdio Indie"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--studio-text-primary)' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--body-text)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Descrição do Estúdio</label>
            <textarea 
              rows={3} 
              placeholder="Criando jogos inovadores..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--studio-text-primary)' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--body-text)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Imagem de Perfil / GIF</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px dashed var(--card-border)', background: 'rgba(255,255,255,0.02)', color: 'var(--body-text)', fontSize: '0.8rem' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--body-text)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Banner Animado / Estático</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px dashed var(--card-border)', background: 'rgba(255,255,255,0.02)', color: 'var(--body-text)', fontSize: '0.8rem' }} 
            />
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            style={{ alignSelf: 'flex-start', background: 'var(--icon-accent)', color: '#fff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', cursor: isSaving ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: isSaving ? 0.7 : 1 }}
          >
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="studio-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.9rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Plano Atual</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'var(--studio-text-primary)', fontWeight: 700, fontSize: '1.1rem' }}>Indie Starter</p>
                <p style={{ color: 'var(--body-text)', fontSize: '0.8rem' }}>Gratuito - 5 membros, 500MB</p>
              </div>
              <button style={{ background: 'transparent', color: 'var(--icon-accent)', border: '1px solid var(--icon-accent)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                Upgrade
              </button>
            </div>
          </div>

          <div className="studio-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.9rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Aparência</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--body-text)', fontSize: '0.85rem' }}>Dark Mode</span>
              <div style={{ width: 40, height: 20, background: 'var(--icon-accent)', borderRadius: 20, position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%', position: 'absolute', right: 2, top: 2 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
