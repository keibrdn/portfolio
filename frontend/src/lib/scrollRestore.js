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
