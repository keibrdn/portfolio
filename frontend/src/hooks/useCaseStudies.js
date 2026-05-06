import {useCallback, useEffect, useState} from 'react'
import {client} from '../lib/sanity.js'
import {caseStudyListQuery} from '../lib/queries.js'

/** Placeholder cards when the dataset is empty or fetch fails (UI development). */
export const MOCK_CASE_STUDIES = [
  {
    _id: 'mock-telefishin',
    title: 'Telefishin',
    slug: 'telefishin',
    excerpt: 'A whimsical, low-tech solution to long-distance friendships',
    skillsLine: '',
    tags: ['concept design', 'user research', '0 to 1'],
    featuredImage: null,
    _mock: true,
  },
  {
    _id: 'mock-two',
    title: 'Case Study Title',
    slug: 'project-two',
    excerpt: 'A short description for case study',
    skillsLine: '',
    tags: ['tag 1', 'tag 2', 'tag 3'],
    featuredImage: null,
    _mock: true,
  },
  {
    _id: 'mock-three',
    title: 'Case Study Title',
    slug: 'project-three',
    excerpt: 'A short description for case study',
    skillsLine: '',
    tags: ['tag 1', 'tag 2', 'tag 3'],
    featuredImage: null,
    _mock: true,
  },
  {
    _id: 'mock-four',
    title: 'Case Study Title',
    slug: 'project-four',
    excerpt: 'A short description for case study',
    skillsLine: '',
    tags: ['tag 1', 'tag 2', 'tag 3'],
    featuredImage: null,
    _mock: true,
  },
]

/**
 * Fetches the case study index via `caseStudyListQuery` in `lib/queries.js`.
 * In development only, empty or failed fetches fall back to {@link MOCK_CASE_STUDIES}
 * for layout work. Production never shows those placeholders.
 */
export function useCaseStudies() {
  const [caseStudies, setCaseStudies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usedMock, setUsedMock] = useState(false)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    const allowMocks = import.meta.env.DEV
    try {
      const rows = await client.fetch(caseStudyListQuery)
      if (Array.isArray(rows) && rows.length > 0) {
        setCaseStudies(rows)
        setUsedMock(false)
      } else if (allowMocks) {
        setCaseStudies(MOCK_CASE_STUDIES)
        setUsedMock(true)
      } else {
        setCaseStudies([])
        setUsedMock(false)
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)))
      if (allowMocks) {
        setCaseStudies(MOCK_CASE_STUDIES)
        setUsedMock(true)
      } else {
        setCaseStudies([])
        setUsedMock(false)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return {caseStudies, isLoading, error, usedMock, retry: load}
}
