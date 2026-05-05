import { Link, useParams } from 'react-router-dom'
import AppShell from '../components/layout/AppShell.jsx'
import CaseStudySection from '../components/CaseStudySection.jsx'
import { useCaseStudy } from '../hooks/useCaseStudy.js'
import { urlFor } from '../lib/sanity.js'
import './CaseStudy.css'

function skillsFromLine(line) {
  if (!line || typeof line !== 'string') return []
  return line
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export default function CaseStudy() {
  const { slug } = useParams()
  const { doc, isLoading, error, retry } = useCaseStudy(slug)

  const heroImg =
    doc?.featuredImage &&
    urlFor(doc.featuredImage).width(1800).fit('max').auto('format').quality(88).url()

  if (isLoading) {
    return (
      <AppShell fullBleed mainClassName="appShellMain--caseStudy">
        <p className="caseStudyPageLoading">Loading case study…</p>
      </AppShell>
    )
  }

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
            <Link className="caseStudyMissingLink" to="/work">
              Back to work
            </Link>
          </p>
        </div>
      </AppShell>
    )
  }

  if (!doc) {
    return (
      <AppShell fullBleed mainClassName="appShellMain--caseStudy">
        <div className="caseStudyMissing">
          <h1 className="caseStudyMissingTitle">Case study not found</h1>
          <p className="caseStudyMissingText">
            There isn&apos;t published content for{' '}
            <span className="caseStudyMissingSlug">{slug}</span> yet.
          </p>
          <Link className="caseStudyMissingLink" to="/work">
            Back to work
          </Link>
        </div>
      </AppShell>
    )
  }

  const sections = Array.isArray(doc.sections) ? doc.sections : []
  const tocSections = sections.filter((s) => s?.heading && String(s.heading).trim())
  const skillsLines = skillsFromLine(doc.skillsLine)

  const heroHeadline = doc.subtitle?.trim() ? doc.subtitle.trim() : doc.title

  return (
    <AppShell fullBleed mainClassName="appShellMain--caseStudy">
      <article className="caseStudyArticle">
        <div className="caseStudyPage">
          <div className="caseStudyPageWhole">
            <aside className="caseStudyPageSidebar" aria-label="Case study navigation">
              <Link className="caseStudyBack" to="/work">
                {'<- BACK'}
              </Link>
              {tocSections.length > 0 ? (
                <nav className="caseStudyToc" aria-label="Table of contents">
                  <ul className="caseStudyTocList">
                    {tocSections.map((section, index) => {
                      const anchor =
                        section._key != null ? `#section-${section._key}` : undefined
                      const title = String(section.heading).trim()
                      return (
                        <li key={section._key || `toc-${index}`} className="caseStudyTocItem">
                          {anchor ? (
                            <a
                              href={anchor}
                              className={
                                index === 0
                                  ? 'caseStudyTocLink caseStudyTocLink--primary'
                                  : 'caseStudyTocLink'
                              }
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
              <div className="caseStudyStack">
                <h1 className="caseStudyHeroTitle">{heroHeadline}</h1>

                {heroImg ? (
                  <div className="caseStudyHeroMedia">
                    <img
                      className="caseStudyHeroImg"
                      src={heroImg}
                      alt={doc.title ? `${doc.title} cover` : 'Case study cover'}
                      loading="eager"
                    />
                  </div>
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
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </AppShell>
  )
}
