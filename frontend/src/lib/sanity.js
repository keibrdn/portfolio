import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

/** Pin API version to a dated release — bump intentionally when you adopt new API behavior. */
const apiVersion = '2025-04-01'

if (!projectId || !dataset) {
  throw new Error(
    'Missing VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET. Add them to frontend/.env (do not commit).',
  )
}

/**
 * Optional same-origin proxy (vite.config.js `/__sanity`). Default is direct
 * api.sanity.io now that localhost is on the project CORS list. Set
 * VITE_SANITY_USE_PROXY=true to force the proxy.
 */
function localSanityApiHost() {
  if (import.meta.env.VITE_SANITY_USE_PROXY !== 'true') {
    return null
  }
  const origin = typeof globalThis !== 'undefined' ? globalThis.location?.origin : null
  if (!origin) return null

  if (import.meta.env.DEV) {
    return `${origin}/__sanity`
  }

  try {
    const { hostname } = new URL(origin)
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${origin}/__sanity`
    }
  } catch {
    /* invalid origin */
  }

  return null
}

const apiHost = localSanityApiHost()

/** Prod defaults to CDN reads; skip CDN when proxied. `VITE_SANITY_USE_CDN=false` uses api.sanity.io (needs CORS). */
const useCdn =
  !apiHost &&
  import.meta.env.PROD &&
  import.meta.env.VITE_SANITY_USE_CDN !== 'false'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  ...(apiHost
    ? {
        useProjectHostname: false,
        apiHost,
      }
    : {}),
})

const builder = imageUrlBuilder({projectId, dataset})

/** Chain `.width()`, `.height()`, `.format()`, `.url()`, etc. See @sanity/image-url. */
export function urlFor(source) {
  return builder.image(source)
}

/** Retry transient proxy / network drops (ECONNRESET on the Vite Sanity proxy). */
export async function fetchSanity(query, params) {
  const attempts = 3
  let lastError
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await client.fetch(query, params)
    } catch (e) {
      lastError = e
      await new Promise((resolve) => setTimeout(resolve, 200 * (i + 1)))
    }
  }
  throw lastError
}
