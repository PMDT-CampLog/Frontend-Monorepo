FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copiar arquivos de configuração do monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json turbo.json ./
COPY packages ./packages
COPY apps/web ./apps/web

# Instalar dependências e compilar a aplicação web via turbo
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @camplog/web build

EXPOSE 3000
CMD ["pnpm", "--filter", "@camplog/web", "start"]
