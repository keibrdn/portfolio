import BlockRenderer from './BlockRenderer.jsx'
import './CaseStudySection.css'

/** Consecutive `caseStudyMediaFigure` blocks render in one horizontal row (stacks on small viewports). */
function renderGroupedSectionBlocks(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  const nodes = []
  let i = 0
  while (i < blocks.length) {
    const block = blocks[i]
    if (block._type === 'caseStudyMediaFigure') {
      const run = []
      let j = i
      while (j < blocks.length && blocks[j]._type === 'caseStudyMediaFigure') {
        run.push(blocks[j])
        j++
      }
      if (run.length >= 2) {
        const rowKey = run.map((b) => b._key).join('-')
        nodes.push(
          <div
            key={rowKey}
            className="caseStudyMediaRow"
            style={{ '--case-study-media-row-columns': run.length }}
          >
            {run.map((b) => (
              <BlockRenderer key={b._key} block={b} />
            ))}
          </div>,
        )
      } else {
        nodes.push(<BlockRenderer key={run[0]._key} block={run[0]} />)
      }
      i = j
    } else {
      nodes.push(<BlockRenderer key={block._key} block={block} />)
      i++
    }
  }
  return nodes
}

export default function CaseStudySection({ section, style }) {
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
      data-reveal
      style={style}
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
      <div className="caseStudySectionBlocks">{renderGroupedSectionBlocks(blocks)}</div>
    </section>
  )
}
