import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@camplog/ui',
    '@camplog/module-wiki',
    '@camplog/module-forum',
    '@camplog/module-bug-tracker',
    '@camplog/api',
  ],
}

export default nextConfig
