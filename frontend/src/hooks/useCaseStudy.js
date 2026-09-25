import {useCallback, useEffect, useState} from 'react'
import {fetchSanity} from '../lib/sanity.js'
import {
  caseStudyMetaBySlugQuery,
  caseStudySectionsByIdQuery,
} from '../lib/queries.js'

/**
 * Full case study document for `/work/:slug`, merged from two GROQ queries in `lib/queries.js`.
 * @param {string | undefined} slug — route param, e.g. `telefishin`
 */
export function useCaseStudy(slug) {
  const [doc, setDoc] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(slug))
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!slug) {
      setDoc(null)
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const meta = await fetchSanity(caseStudyMetaBySlugQuery, {slug})
      if (!meta?._id) {
        setDoc(null)
        return
      }
      const sectionBundle = await fetchSanity(caseStudySectionsByIdQuery, {
        id: meta._id,
      })
      const sections = sectionBundle?.sections
      setDoc({
        ...meta,
        sections: Array.isArray(sections) ? sections : [],
      })
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)))
      setDoc(null)
    } finally {
      setIsLoading(false)
    }
  }, [slug])

  useEffect(() => {
    load()
  }, [load])

  return {doc, isLoading, error, retry: load}
}
