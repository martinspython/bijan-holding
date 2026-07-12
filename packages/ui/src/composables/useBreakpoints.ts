import { breakpointsTailwind, useBreakpoints as vueUseBreakpoints } from '@vueuse/core'

export function useBreakpoints() {
  const bp = vueUseBreakpoints(breakpointsTailwind)

  return {
    isMobile: bp.smaller('md'),
    isTablet: bp.between('md', 'lg'),
    isDesktop: bp.greaterOrEqual('lg'),
    sm: bp.smaller('sm'),
    md: bp.between('md', 'lg'),
    lg: bp.between('lg', 'xl'),
    xl: bp.greaterOrEqual('xl'),
  }
}
