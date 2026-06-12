FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copiar arquivos de configuração do monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json turbo.json ./
COPY packages ./packages
COPY apps/studio ./apps/studio

# Instalar dependências e compilar a aplicação studio via turbo
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @camplog/studio build

EXPOSE 3001
CMD ["pnpm", "--filter", "@camplog/studio", "start"]
