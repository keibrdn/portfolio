import {useCallback, useEffect, useState} from 'react'
import {
  prefetchCaseStudy,
  readCaseStudyCache,
  resetCaseStudyCache,
} from '../lib/caseStudyLoad.js'

/**
 * Full case study document for `/work/:slug`.
 * Uses the shared prefetch cache so home-card hover can finish before navigation.
 * @param {string | undefined} slug — route param, e.g. `telefishin`
 */
export function useCaseStudy(slug) {
  const cached = slug ? readCaseStudyCache(slug) : null
  const [doc, setDoc] = useState(cached?.doc ?? null)
  const [isLoading, setIsLoading] = useState(Boolean(slug) && !cached?.doc && !cached?.error)
  const [error, setError] = useState(cached?.error ?? null)

  const load = useCallback(
    async ({bust = false} = {}) => {
      if (!slug) {
        setDoc(null)
        setIsLoading(false)
        setError(null)
        return
      }
      if (bust) resetCaseStudyCache(slug)
      const hit = readCaseStudyCache(slug)
      if (hit?.doc && !bust) {
        setDoc(hit.doc)
        setError(null)
        setIsLoading(false)
        return
      }
      setDoc(null)
      setIsLoading(true)
      setError(null)
      try {
        const next = await prefetchCaseStudy(slug)
        setDoc(next)
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)))
        setDoc(null)
      } finally {
        setIsLoading(false)
      }
    },
    [slug],
  )

  useEffect(() => {
    load()
  }, [load])

  const retry = useCallback(() => load({bust: true}), [load])

  return {doc, isLoading, error, retry}
}
