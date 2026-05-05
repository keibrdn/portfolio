import BlockRenderer from './BlockRenderer.jsx'
import './CaseStudySection.css'

export default function CaseStudySection({ section }) {
  if (!section) return null

  const blocks = Array.isArray(section.blocks) ? section.blocks : []
  const hasSubheading = Boolean(section.subheading && String(section.subheading).trim())
  const baseId = section._key ? `caseStudy-section-${section._key}` : null
  const eyebrowId = baseId ? `${baseId}-eyebrow` : undefined
  const titleId = baseId ? `${baseId}-title` : undefined
  const sectionAnchorId = section._key ? `section-${section._key}` : undefined

  const labelledBy =
    hasSubheading && eyebrowId && titleId ? `${eyebrowId} ${titleId}` : titleId

  return (
    <section
      id={sectionAnchorId}
      className={[
        'caseStudySection',
        hasSubheading ? 'caseStudySection--withSub' : 'caseStudySection--leadOnly',
      ].join(' ')}
      aria-labelledby={labelledBy || undefined}
    >
      <header className="caseStudySectionHeader">
        {hasSubheading ? (
          <>
            <p id={eyebrowId} className="caseStudySectionEyebrow">
              {section.heading}
            </p>
            <h2 id={titleId} className="caseStudySectionTitle">
              {section.subheading}
            </h2>
          </>
        ) : (
          <h2 id={titleId} className="caseStudySectionLead">
            {section.heading}
          </h2>
        )}
      </header>
      <div className="caseStudySectionBlocks">
        {blocks.map((block) => (
          <BlockRenderer key={block._key} block={block} />
        ))}
      </div>
    </section>
  )
}
