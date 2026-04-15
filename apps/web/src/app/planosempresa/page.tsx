import React from 'react'

import bg1 from '../../assets/bg-1.png'
import bg2 from '../../assets/bg-2.png'
import NoScroll from './NoScroll'

function LogoIcon() {
  return (
    <span className="logo-icon" aria-hidden="true">
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

type Plan = {
  title: string
  description: string
  includes: string[]
  cta: string
  featured?: boolean
}

const plans: Plan[] = [
  {
    title: 'Startup',
    description:
      'Empresa iniciando no mercado precisando de gerenciamento técnico e contato com seus clientes',
    cta: 'R$ 199,90 por mês',
    includes: [
      'Até 50 contribuidores',
      'Forum público e Bug tracker da comunidade',
      'Forum e Bug tracker interno para contribuidores',
      'Blog e changelog padrão',
      'Até 7 Wiki’s publicas',
      'Limite de upload de até 10 gb mensais',
      'Até 5 Wiki’s privadas',
      'Integração direta com Github e Jira',
      'Gestão visual de times no mural de créditos',
    ],
  },
  {
    title: 'Scale-up',
    description: 'Empresa em crescimento precisando de segurança, praticidade e eficiência',
    cta: 'R$ 399,90 por mês',
    featured: true,
    includes: [
      'Até 500 Contribuidores',
      'Tudo do plano Startup, mais:',
      'SSO (Single Sign-on), autenticação obrigatória com Google Workspace ou Microsoft Entra',
      'Trilhas de onboarding personalizadas para novos funcionarios',
      'Automação de Releases notes',
      'Painel analítico de tempo de resolução de Bugs',
      'Upgrade para 25 Wiki’s publicas ou privadas',
      'Upgrade para upload de até 25 gb mensais',
    ],
  },
  {
    title: 'Enterprise',
    description:
      'Empresa de Grande porte necessitando de gerenciamento rigoroso, auditoria, adequação e comunicação com seus usuários',
    cta: 'R$ 999,90 por mês',
    includes: [
      'Contribuidores ilimitados',
      'Tudo do plano Scale-up e mais:',
      'RBAC Completo: Permite criar subdivisões invisíveis entre si dentro da mesma empresa',
      'Logs de Auditoria',
      'White-Label absoluto: remover completamente a marca CampLog na pagina',
      'Painéis automáticos de Resolução de Bugs, contribuição de funcionários, e releases por equipe',
      'Upgrade para Wiki’s ilimitadas',
      'Upgrade para uploads ilimitados',
    ],
  },
]

export default function PlanosEmpresaPage() {
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

      <header aria-label="CampLog">
        <nav className="navbar navbar-centered" role="navigation" aria-label="Navegação principal">
          <a href="/" className="logo" aria-label="CampLog — página inicial">
            <LogoIcon />
            CampLog
          </a>
          <div className="nav-actions" aria-hidden="true" />
        </nav>
      </header>

      <main className="plans">
        <section className="plans-content" aria-label="Planos empresa">
          <p className="plans-eyebrow">Empresa e Organizações</p>
          <h1 className="plans-title">Qual o melhor plano para você?</h1>

          <div className="plans-grid" role="list" aria-label="Lista de planos">
            {plans.map((plan) => (
              <article
                key={plan.title}
                className={`plan-card${plan.featured ? ' plan-card-featured' : ''}`}
                role="listitem"
              >
                <header className="plan-head">
                  <h2 className="plan-title">{plan.title}</h2>
                  <p className="plan-desc">{plan.description}</p>
                </header>

                <div className="plan-body">
                  <p className="plan-includes">Incluso</p>
                  <ul className="plan-list">
                    {plan.includes.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>

                <footer className="plan-foot">
                  <a className="plan-cta" href="/app">
                    {plan.cta}
                  </a>
                </footer>
              </article>
            ))}
          </div>

          <p className="plans-note">Você pode trocar de plano a qualquer momento</p>
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

