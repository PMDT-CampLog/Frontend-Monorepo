import React from 'react';
import Navbar from '../components/Navbar'; // Ajuste o caminho se necessário

import bg1 from '../assets/bg-1.png';
import bg2 from '../assets/bg-2.png';

function LogoIcon() {
  return (
    <span className="logo-icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <path
          id="color_1_flame"
          d="M 200 60 C 200 60 130 130 135 200 C 140 250 215 265 250 225 C 270 200 260 160 260 160 C 260 160 240 190 220 190 C 195 190 200 140 200 140 C 200 140 220 110 200 60 Z"
        />
        <g id="color_2_base">
          <path d="M 140 270 L 151 281 L 112 305 L 151 329 L 140 340 L 89 305 Z" />
          <path d="M 185 345 L 175 340 L 215 255 L 225 260 Z" />
          <path d="M 260 270 L 311 305 L 260 340 L 249 329 L 288 305 L 249 281 Z" />
        </g>
      </svg>
    </span>
  )
}

export default function HomePage() {
  const bg1Url = bg1.src;
  const bg2Url = bg2.src;

  return (
    <>
      {/* Background com imagens inline style */}
      <div
        className="custom-bg"
        aria-hidden="true"
        style={{
          backgroundImage: `url('${bg1Url}'), url('${bg2Url}')`
        }}
      />

      <header>
        <nav className="navbar" role="navigation" aria-label="Navegação principal">
          <a href="/" className="logo" aria-label="CampLog — página inicial">
            <LogoIcon />
            CampLog
          </a>

          <div className="nav-actions">
            <a href="/login" className="btn btn-entrar">
              Entrar
            </a>
            <a href="/cadastro" className="btn btn-cadastre">
              Cadastre-se
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <p className="hero-label" aria-hidden="true">
            CampLog
          </p>

          <h1 id="hero-heading" className="hero-title">
            Onde os devs e a comunidade se reúnem
          </h1>

          <p className="hero-description">
            Crie sua comunidade, se junte a uma, mantenha ou consulte uma wiki,
            controle e reporte bugs, tudo em um só lugar para você.
          </p>

          <div>
            <a href="/cadastro" className="btn btn-faca-parte">
              Faça Parte
            </a>
          </div>
        </section>
      </main>

      <footer className="page-footer">
        <p>
          Precisa de Ajuda?{' '}
          <a href="/contato">Contacte-nos</a>
        </p>
      </footer>
    </>
  )
}
