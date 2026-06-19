import React, { Suspense } from 'react'
import bg1 from '../../assets/bg-1.png'
import bg2 from '../../assets/bg-2.png'
import NoScroll from './NoScroll'
import LoginForm from './LoginForm'
import '@/styles/auth.css'

function LogoIcon() {
  return (
    <span className="auth-logo-icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <path
          d="M 200 60 C 200 60 130 130 135 200 C 140 250 215 265 250 225 C 270 200 260 160 260 160 C 260 160 240 190 220 190 C 195 190 200 140 200 140 C 200 140 220 110 200 60 Z"
          fill="currentColor"
        />
        <g fill="currentColor">
          <path d="M 140 270 L 151 281 L 112 305 L 151 329 L 140 340 L 89 305 Z" />
          <path d="M 185 345 L 175 340 L 215 255 L 225 260 Z" />
          <path d="M 260 270 L 311 305 L 260 340 L 249 329 L 288 305 L 249 281 Z" />
        </g>
      </svg>
    </span>
  )
}

export default function LoginPage() {
  const bg1Url = bg1.src
  const bg2Url = bg2.src

  return (
    <>
      <NoScroll />
      <div
        className="custom-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url('${bg1Url}'), url('${bg2Url}')` }}
      />

      <header>
        <nav className="navbar" role="navigation" aria-label="Navegação principal">
          <a href="/" className="logo" aria-label="CampLog — página inicial">
            <span className="logo-icon" aria-hidden="true">
              <LogoIcon />
            </span>
            CampLog
          </a>
          <div className="nav-actions">
            <a href="/cadastro" className="btn btn-cadastre">
              Cadastre-se
            </a>
          </div>
        </nav>
      </header>

      <main className="auth">
        <section className="auth-card" aria-label="Login">
          <div className="auth-brand">
            <div className="auth-brand-top">
              <LogoIcon />
              <span className="auth-brand-name">CampLog</span>
            </div>
            <span className="auth-brand-subtitle">Insira suas credenciais</span>
          </div>

          <Suspense fallback={
            <div className="auth-spinner-container" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <svg className="auth-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: '30px', height: '30px' }}>
                <circle cx="12" cy="12" r="10" strokeDasharray="42" strokeDashoffset="14" />
              </svg>
            </div>
          }>
            <LoginForm />
          </Suspense>
        </section>
      </main>

      <footer className="page-footer">
        <p>
          Precisa de Ajuda? <a href="/contato">Contacte-nos</a>
        </p>
      </footer>
    </>
  )
}
