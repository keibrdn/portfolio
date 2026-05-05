import { Link, useParams } from 'react-router-dom'
import AppShell from '../components/layout/AppShell.jsx'
import CaseStudySection from '../components/CaseStudySection.jsx'
import { useCaseStudy } from '../hooks/useCaseStudy.js'
import { urlFor } from '../lib/sanity.js'
import './CaseStudy.css'

export default function CaseStudy() {
  const { slug } = useParams()
  const { doc, isLoading, error, retry } = useCaseStudy(slug)

  const heroImg =
    doc?.featuredImage &&
    urlFor(doc.featuredImage).width(1800).height(960).fit('crop').auto('format').quality(88).url()

  if (isLoading) {
    return (
      <AppShell>
        <p className="caseStudyPageLoading">Loading case study…</p>
      </AppShell>
    )
  }

  if (error) {
    return (
      <AppShell>
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
      <AppShell>
        <div className="caseStudyMissing">
          <h1 className="caseStudyMissingTitle">Case study not found</h1>
          <p className="caseStudyMissingText">
            There isn&apos;t published content for{" "}
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

  return (
    <AppShell>
      <article className="caseStudyArticle">
        <header className="caseStudyHero">
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
          <div className="caseStudyHeroText">
            <h1 className="caseStudyHeroTitle">{doc.title}</h1>
            {doc.subtitle ? (
              <p className="caseStudyHeroSubtitle">{doc.subtitle}</p>
            ) : null}
          </div>
        </header>

        {doc.skillsLine || doc.role || doc.team || doc.timeline ? (
          <dl className="caseStudyMeta">
            {doc.skillsLine ? (
              <>
                <dt className="caseStudyMetaLabel">Skills</dt>
                <dd className="caseStudyMetaValue">{doc.skillsLine}</dd>
              </>
            ) : null}
            {doc.role ? (
              <>
                <dt className="caseStudyMetaLabel">Role</dt>
                <dd className="caseStudyMetaValue">{doc.role}</dd>
              </>
            ) : null}
            {doc.team ? (
              <>
                <dt className="caseStudyMetaLabel">Team</dt>
                <dd className="caseStudyMetaValue">{doc.team}</dd>
              </>
            ) : null}
            {doc.timeline ? (
              <>
                <dt className="caseStudyMetaLabel">Timeline</dt>
                <dd className="caseStudyMetaValue">{doc.timeline}</dd>
              </>
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

        <footer className="caseStudyFooter">
          <Link className="caseStudyFooterLink" to="/work">
            ← All work
          </Link>
        </footer>
      </article>
    </AppShell>
  )
}
