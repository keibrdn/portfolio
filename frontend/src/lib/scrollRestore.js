const STORAGE_KEY = 'portfolio:window-scroll'

export function persistWindowScroll() {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        path: window.location.pathname,
        y: window.scrollY,
      }),
    )
  } catch {
    /* private mode / quota */
  }
}

export function readPersistedWindowScroll(path) {
  try {
    const data = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
    if (!data || data.path !== path) return null
    const y = Number(data.y)
    return Number.isFinite(y) ? y : null
  } catch {
    return null
  }
}

export function isReloadNavigation() {
  const nav = performance.getEntriesByType?.('navigation')?.[0]
  return nav?.type === 'reload'
}

const RELOAD_RESTORE_KEY = 'portfolio:reload-restore'

/** True only for the first route after a full refresh (Strict remounts included). */
export function shouldRestoreScrollOnReload(path) {
  if (!isReloadNavigation()) return false
  const origin = String(performance.timeOrigin)
  try {
    const data = JSON.parse(sessionStorage.getItem(RELOAD_RESTORE_KEY) || 'null')
    if (data?.origin !== origin) {
      sessionStorage.setItem(RELOAD_RESTORE_KEY, JSON.stringify({ origin, path }))
      return true
    }
    return data.path === path
  } catch {
    return true
  }
}
