# CampLog — Monorepo

SaaS modular B2B/B2C para desenvolvedores e comunidades. Unifica Wikis, Fóruns, Bug Trackers e Devlogs numa plataforma centralizada.

## Estrutura

```
camplog/
├── apps/
│   ├── web/       # Pública — Landing, wikis, vitrines (Next.js SSR/SEO)
│   └── studio/    # Privada — Dashboard, CMS, Kanban (Next.js CSR)
├── packages/
│   ├── ui/        # Design System — componentes base (Tailwind CSS)
│   ├── modules/   # Regras de negócio por feature
│   │   ├── wiki/
│   │   ├── forum/
│   │   └── bug-tracker/
│   ├── api/       # Camada HTTP — clients, queries, tipagens
│   ├── types/     # Tipagens TypeScript globais
│   └── config/    # ESLint, Prettier, TS e Tailwind compartilhados
└── turbo.json
```

## Pré-requisitos

- Node.js >= 20
- pnpm >= 9

## Setup

```bash
# Instalar dependências
pnpm install

# Desenvolvimento (todos os apps em paralelo)
pnpm dev

# Build de produção
pnpm build

# Lint
pnpm lint
```