import { useLayoutEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AppShell from '../components/layout/AppShell.jsx'
import CaseStudySection from '../components/CaseStudySection.jsx'
import { useCaseStudy } from '../hooks/useCaseStudy.js'
import { useCaseStudyTocActive } from '../hooks/useCaseStudyTocActive.js'
import { scrollToCaseStudySection } from '../lib/caseStudyScroll.js'
import { urlFor } from '../lib/sanity.js'
import './CaseStudy.css'

function skillsFromLine(line) {
  if (!line || typeof line !== 'string') return []
  return line
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function tocAnchorClick(e, sectionKey) {
  if (sectionKey == null) return
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  e.preventDefault()
  scrollToCaseStudySection(sectionKey)
}

function HeroCover({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`caseStudyHeroMedia${loaded ? ' caseStudyHeroMedia--loaded' : ''}`}>
      <img
        className="caseStudyHeroImg"
        src={src}
        alt={alt}
        loading="eager"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const { doc, isLoading, error, retry } = useCaseStudy(slug)

  const heroImg =
    doc?.featuredImage &&
    urlFor(doc.featuredImage).width(1800).fit('max').auto('format').quality(88).url()

  const sections = Array.isArray(doc?.sections) ? doc.sections : []
  const tocSections = useMemo(
    () => sections.filter((s) => s?.heading && String(s.heading).trim()),
    [sections],
  )
  const activeTocKey = useCaseStudyTocActive(tocSections)

  useLayoutEffect(() => {
    if (isLoading || error || !doc) return
    const m = window.location.hash.match(/^#section-(.+)$/)
    if (!m) return
    const id = `section-${m[1]}`
    if (!document.getElementById(id)) return
    requestAnimationFrame(() => {
      scrollToCaseStudySection(m[1])
    })
  }, [doc, slug, isLoading, error])

  const skillsLines = doc ? skillsFromLine(doc.skillsLine) : []
  const heroHeadline = doc?.subtitle?.trim() ? doc.subtitle.trim() : (doc?.title ?? '')

  if (error) {
    return (
      <AppShell fullBleed mainClassName="appShellMain--caseStudy">
        <div className="caseStudyMissing">
          <h1 className="caseStudyMissingTitle">Couldn&apos;t load this case study</h1>
          <p className="caseStudyMissingText">
            {error instanceof Error ? error.message : String(error)}
          </p>
          <p className="caseStudyMissingActions">
            <button type="button" className="caseStudyMissingRetry" onClick={retry}>
              Try again
            </button>
            <Link className="caseStudyMissingLink" to="/">
              Back to home
            </Link>
          </p>
        </div>
      </AppShell>
    )
  }

  if (!doc && !isLoading) {
    return (
      <AppShell fullBleed mainClassName="appShellMain--caseStudy">
        <div className="caseStudyMissing">
          <h1 className="caseStudyMissingTitle">Case study not found</h1>
          <p className="caseStudyMissingText">
            There isn&apos;t published content for{' '}
            <span className="caseStudyMissingSlug">{slug}</span> yet.
          </p>
          <Link className="caseStudyMissingLink" to="/">
            Back to home
          </Link>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell fullBleed mainClassName="appShellMain--caseStudy" showNav={false}>
      <article className="caseStudyArticle">
        <div className="caseStudyPage">
          <div className="caseStudyPageWhole">
            <aside className="caseStudyPageSidebar" aria-label="Case study navigation">
              <Link className="caseStudyBack" to="/">
                <svg
                  className="caseStudyBackIcon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                <span className="caseStudyBackLabel">home</span>
              </Link>
              {tocSections.length > 0 ? (
                <nav className="caseStudyToc" aria-label="Table of contents">
                  <ul className="caseStudyTocList">
                    {tocSections.map((section, index) => {
                      const anchor =
                        section._key != null ? `#section-${section._key}` : undefined
                      const title = String(section.heading).trim()
                      return (
                        <li
                          key={section._key || `toc-${index}`}
                          className="caseStudyTocItem"
                          style={{ '--i': index }}
                        >
                          {anchor ? (
                            <a
                              href={anchor}
                              className={
                                section._key === activeTocKey
                                  ? 'caseStudyTocLink caseStudyTocLink--active'
                                  : 'caseStudyTocLink'
                              }
                              aria-current={section._key === activeTocKey ? 'location' : undefined}
                              onClick={(e) => tocAnchorClick(e, section._key)}
                            >
                              {title}
                            </a>
                          ) : (
                            <span className="caseStudyTocLink">{title}</span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              ) : null}
            </aside>

            <div className="caseStudyPageMain">
              {doc && (
                <div className="caseStudyStack">
                  <h1 className="caseStudyHeroTitle">{heroHeadline}</h1>

                  {heroImg ? (
                    <HeroCover
                      key={heroImg}
                      src={heroImg}
                      alt={doc.title ? `${doc.title} cover` : 'Case study cover'}
                    />
                  ) : (
                    <div className="caseStudyHeroPlaceholder" aria-hidden="true" />
                  )}

                  {skillsLines.length > 0 || doc.role || doc.timeline || doc.team ? (
                    <dl className="caseStudyMeta">
                      {skillsLines.length > 0 ? (
                        <div className="caseStudyMetaGroup">
                          <dt className="caseStudyMetaLabel">Skills</dt>
                          <dd className="caseStudyMetaValue">
                            {skillsLines.map((line) => (
                              <p key={line} className="caseStudyMetaLine">
                                {line}
                              </p>
                            ))}
                          </dd>
                        </div>
                      ) : null}
                      {doc.role ? (
                        <div className="caseStudyMetaGroup">
                          <dt className="caseStudyMetaLabel">Role</dt>
                          <dd className="caseStudyMetaValue">
                            <p className="caseStudyMetaLine">{doc.role}</p>
                          </dd>
                        </div>
                      ) : null}
                      {doc.timeline ? (
                        <div className="caseStudyMetaGroup">
                          <dt className="caseStudyMetaLabel">Timeline</dt>
                          <dd className="caseStudyMetaValue">
                            <p className="caseStudyMetaLine">{doc.timeline}</p>
                          </dd>
                        </div>
                      ) : null}
                      {doc.team ? (
                        <div className="caseStudyMetaGroup">
                          <dt className="caseStudyMetaLabel">Team</dt>
                          <dd className="caseStudyMetaValue">
                            <p className="caseStudyMetaLine">{doc.team}</p>
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  ) : null}

                  <div className="caseStudySections">
                    {sections.map((section, i) => (
                      <CaseStudySection
                        key={section._key || `section-${i}`}
                        section={section}
                        style={{ '--i': i }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </AppShell>
  )
}
