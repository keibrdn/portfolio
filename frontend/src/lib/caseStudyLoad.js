import { caseStudyBySlugQuery } from './queries.js'
import { fetchSanity, urlFor } from './sanity.js'

const HERO_PRELOAD_MS = 2500

/** @type {Map<string, { promise: Promise<unknown>, doc?: object | null, error?: Error }>} */
const cache = new Map()

function normalizeSlug(slug) {
  return String(slug || '')
    .trim()
    .toLowerCase()
}

export function caseStudyHeroUrl(doc) {
  if (!doc?.featuredImage) return null
  return urlFor(doc.featuredImage).width(2880).fit('max').auto('format').quality(88).url()
}

function preloadImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve()
      return
    }
    const img = new Image()
    const done = () => resolve()
    img.onload = done
    img.onerror = done
    img.src = src
    if (img.complete && img.naturalWidth > 0) resolve()
  })
}

export function readCaseStudyCache(slug) {
  return cache.get(normalizeSlug(slug)) ?? null
}

export function resetCaseStudyCache(slug) {
  cache.delete(normalizeSlug(slug))
}

/** Fetch + cache a case study, and warm the cover image before resolving. */
export function prefetchCaseStudy(slug) {
  const key = normalizeSlug(slug)
  if (!key) return Promise.resolve(null)

  const existing = cache.get(key)
  if (existing?.promise) return existing.promise

  const entry = {}
  entry.promise = (async () => {
    try {
      const raw = await fetchSanity(caseStudyBySlugQuery, { slug: key })
      if (!raw?._id) {
        entry.doc = null
        return null
      }
      const doc = {
        ...raw,
        sections: Array.isArray(raw.sections) ? raw.sections : [],
      }
      await Promise.race([
        preloadImage(caseStudyHeroUrl(doc)),
        new Promise((resolve) => {
          window.setTimeout(resolve, HERO_PRELOAD_MS)
        }),
      ])
      entry.doc = doc
      return doc
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e))
      entry.error = error
      throw error
    }
  })()

  cache.set(key, entry)
  return entry.promise
}
