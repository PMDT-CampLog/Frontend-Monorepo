// Ícone da logo — chama de campfire com código embaixo
function LogoIcon() {
  return (
    <span className="logo-icon" aria-hidden="true">
      <span className="logo-flame">🔥</span>
      <span className="logo-code">{'</>'}</span>
    </span>
  )
}

export default function HomePage() {
  return (
    <>
      {/* Blobs de bokeh — ficam fixed atrás de todo conteúdo */}
      <div className="blob blob-purple" aria-hidden="true" />
      <div className="blob blob-yellow" aria-hidden="true" />
      <div className="blob blob-purple2" aria-hidden="true" />

      {/* Navbar */}
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

      {/* Hero */}
      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <p className="hero-label" aria-hidden="true">
            CampLog
          </p>

          <h1 id="hero-heading" className="hero-title">
            Onde os devs e a comunidade se reuniem
          </h1>

          <p className="hero-description">
            Crie sua comunidade, se junte a uma, mantenha ou consulte uma wiki,
            controle e reporte bugs, tudo em um só lugar para você.
          </p>

          <a href="/cadastro" className="btn btn-faca-parte">
            Faça Parte
          </a>
        </section>
      </main>

      {/* Rodapé flutuante */}
      <footer className="page-footer">
        <p>
          Precisa de Ajuda?{' '}
          <a href="/contato">Contacte-nos</a>
        </p>
      </footer>
    </>
  )
}
