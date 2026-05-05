import BlockRenderer from './BlockRenderer.jsx'
import './CaseStudySection.css'

export default function CaseStudySection({ section }) {
  if (!section) return null

  const blocks = Array.isArray(section.blocks) ? section.blocks : []

  return (
    <section className="caseStudySection" aria-labelledby={section._key ? `section-${section._key}` : undefined}>
      <header className="caseStudySectionHeader">
        <h2
          id={section._key ? `section-${section._key}` : undefined}
          className="caseStudySectionHeading"
        >
          {section.heading}
        </h2>
        {section.subheading ? (
          <p className="caseStudySectionSub">{section.subheading}</p>
        ) : null}
      </header>
      <div className="caseStudySectionBlocks">
        {blocks.map((block) => (
          <BlockRenderer key={block._key} block={block} />
        ))}
      </div>
    </section>
  )
}
