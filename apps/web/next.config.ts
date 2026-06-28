import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Transpila os pacotes internos do monorepo (necessário para importar .tsx de workspace:*)
  transpilePackages: [
    '@camplog/ui',
    '@camplog/module-wiki',
    '@camplog/module-forum',
    '@camplog/module-profile',
    '@camplog/module-social',
    '@camplog/api',
  ],
}

export default nextConfig
