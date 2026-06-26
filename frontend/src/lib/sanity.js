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
 * Route API through Vite’s /__sanity proxy (see vite.config.js) unless opted out with
 * VITE_SANITY_USE_PROXY=false. Used in dev and when serving a prod build on localhost
 * (vite preview) — the live domain is on Sanity CORS; localhost is not.
 */
function localSanityApiHost() {
  if (import.meta.env.VITE_SANITY_USE_PROXY === 'false') {
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
