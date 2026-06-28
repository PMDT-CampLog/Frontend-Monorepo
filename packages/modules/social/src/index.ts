/**
 * Barrel exports do pacote @camplog/module-social.
 *
 * Este pacote encapsula toda a lógica de conexões sociais (follow/unfollow)
 * do CampLog, fornecendo:
 *
 * - FollowButton: componente pronto para uso em páginas de perfil
 * - useFollowConnection: hook para cenários customizados (ex: cards, listas)
 * - connectionKeys: query key factory para integração com React Query
 *
 * Importação:
 * ```tsx
 * import { FollowButton, useFollowConnection } from '@camplog/module-social'
 * import '@camplog/module-social/styles.css'
 * ```
 */

// Componentes
export { FollowButton, type FollowButtonProps } from './components/FollowButton'

// Hooks
export {
  useFollowConnection,
  connectionKeys,
  type UseFollowConnectionProps,
} from './hooks/useFollowConnection'
