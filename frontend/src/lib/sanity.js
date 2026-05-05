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

/** In dev, route API through Vite’s /__sanity proxy (see vite.config.js) unless opted out with VITE_SANITY_USE_PROXY=false. */
function devSanityApiHost() {
  if (!import.meta.env.DEV || import.meta.env.VITE_SANITY_USE_PROXY === 'false') {
    return null
  }
  const origin = typeof globalThis !== 'undefined' ? globalThis.location?.origin : null
  return origin ? `${origin}/__sanity` : null
}

const apiHost = devSanityApiHost()

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: import.meta.env.PROD,
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
