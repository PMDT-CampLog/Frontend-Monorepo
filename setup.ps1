$ErrorActionPreference = "Stop"
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH', 'Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH', 'User')

Write-Host "Iniciando setup do monorepo CampLog..." -ForegroundColor Cyan

$pnpmExists = Get-Command pnpm -ErrorAction SilentlyContinue

if (-not $pnpmExists) {
    Write-Host "Instalando pnpm globalmente..." -ForegroundColor Yellow
    npm install -g pnpm
}

Write-Host "pnpm versao: $(pnpm --version)" -ForegroundColor Green
Write-Host "Instalando dependencias do workspace..." -ForegroundColor Cyan

pnpm install

Write-Host ""
Write-Host "Setup concluido! Comandos disponiveis:" -ForegroundColor Green
Write-Host "  pnpm dev        -> Inicia todos os apps em modo desenvolvimento"
Write-Host "  pnpm build      -> Build de producao de todos os packages e apps"
Write-Host "  pnpm lint       -> Linting em todo o monorepo"
Write-Host "  pnpm type-check -> Verificacao de tipos TypeScript"
Write-Host "  pnpm format     -> Formata todos os arquivos com Prettier"
Write-Host ""
Write-Host "  apps/web    -> http://localhost:3000" -ForegroundColor Magenta
Write-Host "  apps/studio -> http://localhost:3001" -ForegroundColor Magenta
