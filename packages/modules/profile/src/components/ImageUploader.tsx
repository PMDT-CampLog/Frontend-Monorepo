'use client'

import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'

interface ImageUploaderProps {
  aspectRatio: number // 1 for avatar (square), 3 for cover (3:1)
  onCrop: (blob: Blob) => void
  onClose: () => void
  title?: string
}

export function ImageUploader({
  aspectRatio,
  onCrop,
  onClose,
  title = 'Recortar Imagem',
}: ImageUploaderProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setImageSrc(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleCropConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    const blob = await getCroppedImg(imageSrc, croppedAreaPixels)
    if (blob) {
      onCrop(blob)
      onClose()
    }
  }

  return (
    <div className="image-uploader-overlay" onClick={onClose}>
      <div className="image-uploader-modal" onClick={(e) => e.stopPropagation()}>
        <div className="image-uploader-header">
          <h3>{title}</h3>
          <button className="btn-close" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        {!imageSrc ? (
          <div className="image-uploader-dropzone">
            <label htmlFor="image-upload-input" className="dropzone-label">
              <span>📷 Clique para selecionar uma imagem</span>
              <span className="dropzone-hint">JPEG, PNG ou WebP</span>
            </label>
            <input
              id="image-upload-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
              hidden
            />
          </div>
        ) : (
          <>
            <div className="image-uploader-cropper">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                cropShape={aspectRatio === 1 ? 'round' : 'rect'}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="image-uploader-controls">
              <label className="zoom-label">
                Zoom
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                />
              </label>
            </div>

            <div className="image-uploader-actions">
              <button className="btn-cancel" onClick={() => setImageSrc(null)}>
                Trocar imagem
              </button>
              <button className="btn-confirm" onClick={handleCropConfirm}>
                Confirmar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/**
 * Recorta uma imagem usando Canvas e retorna como Blob.
 */
async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.9)
  })
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = url
  })
}
