import React from 'react'

import bg1 from '../../assets/bg-1.png'
import bg2 from '../../assets/bg-2.png'
import NoScroll from './NoScroll'

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

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.775 32.657 29.248 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.965 3.035l5.657-5.657C34.047 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691 12.873 19.51C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.965 3.035l5.657-5.657C34.047 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.174-5.227C29.188 35.091 26.715 36 24 36c-5.227 0-9.744-3.318-11.272-7.946l-6.518 5.02C9.517 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 0 1-4.068 5.576h.003l6.174 5.227C36.975 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 .5C5.73.5.75 5.6.75 12c0 5.2 3.438 9.612 8.205 11.168.6.115.82-.268.82-.595 0-.293-.01-1.068-.016-2.096-3.338.745-4.042-1.648-4.042-1.648-.546-1.415-1.333-1.792-1.333-1.792-1.09-.77.083-.754.083-.754 1.205.086 1.84 1.267 1.84 1.267 1.07 1.874 2.807 1.333 3.492 1.02.108-.8.418-1.333.762-1.64-2.665-.312-5.467-1.364-5.467-6.07 0-1.34.465-2.435 1.235-3.293-.124-.312-.536-1.57.116-3.272 0 0 1.01-.33 3.3 1.257a11.1 11.1 0 0 1 3.003-.418c1.02.005 2.047.144 3.003.418 2.29-1.588 3.298-1.257 3.298-1.257.653 1.702.24 2.96.118 3.272.77.858 1.233 1.953 1.233 3.293 0 4.718-2.807 5.755-5.48 6.06.43.38.814 1.13.814 2.28 0 1.646-.014 2.972-.014 3.376 0 .33.216.716.825.594C19.815 21.607 23.25 17.196 23.25 12 23.25 5.6 18.27.5 12 .5z"
      />
    </svg>
  )
}

export default function CadastroPage() {
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
            <a href="/login" className="btn btn-entrar">
              Entrar
            </a>
          </div>
        </nav>
      </header>

      <main className="auth">
        <section className="auth-card" aria-label="Cadastro">
          <div className="auth-brand">
            <div className="auth-brand-top">
              <LogoIcon />
              <span className="auth-brand-name">CampLog</span>
            </div>
            <span className="auth-brand-subtitle">Insira seus dados</span>
          </div>

          <form className="auth-form" action="#" method="post">
            <label className="auth-field">
              <span className="auth-label">Nome completo</span>
              <input className="auth-input" name="name" autoComplete="name" placeholder="Nome completo" />
            </label>

            <label className="auth-field">
              <span className="auth-label">E-mail</span>
              <input
                className="auth-input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="usuario@email.com"
              />
            </label>

            <label className="auth-field">
              <span className="auth-label">Crie sua Senha</span>
              <input
                className="auth-input"
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="Sua senha"
              />
            </label>

            <label className="auth-field">
              <span className="auth-label">Confirme sua Senha</span>
              <input
                className="auth-input"
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="Sua senha novamente"
              />
            </label>

            <button type="submit" className="auth-primary">
              Continuar para cadastrar
            </button>

            <div className="auth-divider" aria-hidden="true">
              <span />
            </div>

            <div className="auth-social">
              <button type="button" className="auth-social-btn">
                <GoogleIcon />
                Google
              </button>
              <button type="button" className="auth-social-btn auth-social-github">
                <GitHubIcon />
                GitHub
              </button>
            </div>
          </form>
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

