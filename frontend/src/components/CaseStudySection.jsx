import { useLayoutEffect, useRef } from 'react'
import BlockRenderer from './BlockRenderer.jsx'
import FindingsAccordion from './FindingsAccordion.jsx'
import './CaseStudySection.css'

function isFramedFinding(block) {
  return (
    block?._type === 'caseStudyRichText' &&
    block.framed &&
    !block.sideFrame &&
    !block.sideMedia
  )
}

function mediaLabel(block) {
  return String(block?.alt || block?.caption || '').trim().toLowerCase()
}

function isBeforeAfterPair(run) {
  const labels = run.map(mediaLabel)
  return labels.includes('before') && labels.includes('after')
}

function orderBeforeAfter(run) {
  if (!isBeforeAfterPair(run)) return run
  return [...run].sort((a, b) => {
    const aLabel = mediaLabel(a)
    const bLabel = mediaLabel(b)
    if (aLabel === 'before' && bLabel === 'after') return -1
    if (aLabel === 'after' && bLabel === 'before') return 1
    return 0
  })
}

function isInSectionBreak(block) {
  if (block?._type !== 'caseStudyRichText') return false
  const eyebrow = String(block.eyebrow ?? '').trim().toLowerCase()
  const title = String(block.title ?? '').trim().toLowerCase()
  return eyebrow.startsWith('design decision') || title === 'felt presence'
}

function isThoughtsSupportPair(run) {
  const labels = run.map(mediaLabel)
  return (
    labels.includes('ephemeral notes fill a content gap') &&
    labels.includes('quickly join the conversation')
  )
}

function isFeltSupportPair(run) {
  if (run.length !== 2 || isBeforeAfterPair(run)) return false
  const labels = run.map(mediaLabel)
  return (
    labels.includes('live presence counter') ||
    labels.includes('belonging, visualized') ||
    labels.includes('new method of surfacing content')
  )
}

function peekMediaRun(blocks, start) {
  const run = []
  let j = start
  while (j < blocks.length && blocks[j]._type === 'caseStudyMediaFigure') {
    run.push(blocks[j])
    j += 1
  }
  return run
}

function MediaStack({ blocks }) {
  const rowKey = blocks.map((block) => block._key).join('-')
  return (
    <div className="caseStudyMediaStack">
      {blocks.map((block) => (
        <BlockRenderer key={block._key || rowKey} block={block} />
      ))}
    </div>
  )
}

function DemoCompose({ demo, stills, frameSelector }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return undefined

    const sync = () => {
      const demoFig = root.querySelector(frameSelector)
      if (!demoFig) return
      const height = demoFig.getBoundingClientRect().height
      if (height > 0) {
        root.style.setProperty('--demo-compose-height', `${height}px`)
      }
    }

    const observer = new ResizeObserver(sync)
    const demoFig = root.querySelector(frameSelector)
    if (demoFig) observer.observe(demoFig)
    const video = root.querySelector(`${frameSelector} video`)
    if (video) video.addEventListener('loadedmetadata', sync)
    sync()

    return () => {
      observer.disconnect()
      if (video) video.removeEventListener('loadedmetadata', sync)
    }
  }, [demo, stills, frameSelector])

  return (
    <div ref={ref} className="caseStudyDemoCompose">
      <BlockRenderer block={demo} />
      <MediaStack blocks={stills} />
    </div>
  )
}

function MediaRow({ blocks, matchHeight = false }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!matchHeight) return undefined
    const row = ref.current
    if (!row) return undefined

    const sync = () => {
      const imgs = [...row.querySelectorAll('.mediaFigureImg')]
      const after =
        imgs.find((img) => img.getAttribute('alt')?.trim().toLowerCase() === 'after') ||
        imgs[imgs.length - 1]
      if (!after) return
      const height = after.getBoundingClientRect().height
      if (height > 0) {
        row.style.setProperty('--media-row-img-height', `${height}px`)
      }

      imgs.forEach((img) => {
        const isAfter = img.getAttribute('alt')?.trim().toLowerCase() === 'after'
        img.style.removeProperty('width')
        img.style.removeProperty('height')
        if (isAfter || !img.naturalWidth || !img.naturalHeight || height <= 0) return

        const maxW = img.closest('.mediaFigureMain')?.getBoundingClientRect().width ?? 0
        const fittedW = height * (img.naturalWidth / img.naturalHeight)
        if (maxW > 0 && fittedW > maxW) {
          img.style.width = '100%'
          img.style.height = 'auto'
        }
      })
    }

    const observer = new ResizeObserver(sync)
    observer.observe(row)
    const imgs = [...row.querySelectorAll('.mediaFigureImg')]
    imgs.forEach((img) => {
      img.addEventListener('load', sync)
      if (img.complete) sync()
    })

    return () => {
      observer.disconnect()
      imgs.forEach((img) => {
        img.removeEventListener('load', sync)
        img.style.removeProperty('width')
        img.style.removeProperty('height')
      })
      row.style.removeProperty('--media-row-img-height')
    }
  }, [matchHeight, blocks])

  const rowKey = blocks.map((block) => block._key).join('-')

  return (
    <div
      ref={ref}
      className={
        matchHeight ? 'caseStudyMediaRow caseStudyMediaRow--equalHeight' : 'caseStudyMediaRow'
      }
      style={{ '--case-study-media-row-columns': blocks.length }}
    >
      {blocks.map((block) => (
        <BlockRenderer key={block._key || rowKey} block={block} />
      ))}
    </div>
  )
}

/** Consecutive media figures share a row; consecutive framed findings share an accordion. */
function renderGroupedSectionBlocks(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  const nodes = []
  let i = 0
  while (i < blocks.length) {
    const block = blocks[i]
    if (isFramedFinding(block)) {
      const run = []
      let j = i
      while (j < blocks.length && isFramedFinding(blocks[j])) {
        run.push(blocks[j])
        j++
      }
      if (run.length >= 2) {
        nodes.push(
          <FindingsAccordion
            key={run.map((item) => item._key).join('-')}
            items={run}
          />,
        )
      } else {
        nodes.push(<BlockRenderer key={run[0]._key} block={run[0]} />)
      }
      i = j
    } else if (block._type === 'caseStudyDemoPair') {
      const mediaRun = peekMediaRun(blocks, i + 1)
      if (isThoughtsSupportPair(mediaRun)) {
        nodes.push(
          <DemoCompose
            key={`${block._key}-thoughts-compose`}
            demo={{ ...block, right: null }}
            stills={mediaRun}
            frameSelector=".demoPair .surfaceFrame"
          />,
        )
        i += 1 + mediaRun.length
      } else {
        nodes.push(<BlockRenderer key={block._key} block={block} />)
        i += 1
      }
    } else if (block._type === 'caseStudyVideoFigure') {
      const mediaRun = peekMediaRun(blocks, i + 1)
      if (isFeltSupportPair(mediaRun)) {
        nodes.push(
          <DemoCompose
            key={`${block._key}-felt-compose`}
            demo={block}
            stills={mediaRun}
            frameSelector=".videoFigure"
          />,
        )
        i += 1 + mediaRun.length
      } else {
        nodes.push(<BlockRenderer key={block._key} block={block} />)
        i += 1
      }
    } else if (block._type === 'caseStudyMediaFigure') {
      const run = []
      let j = i
      while (j < blocks.length && blocks[j]._type === 'caseStudyMediaFigure') {
        run.push(blocks[j])
        j++
      }
      if (run.length >= 2 && (isThoughtsSupportPair(run) || isFeltSupportPair(run))) {
        nodes.push(<MediaStack key={run.map((b) => b._key).join('-')} blocks={run} />)
      } else if (run.length >= 2) {
        const ordered = orderBeforeAfter(run)
        const rowKey = ordered.map((b) => b._key).join('-')
        nodes.push(
          <MediaRow
            key={rowKey}
            blocks={ordered}
            matchHeight={isBeforeAfterPair(ordered)}
          />,
        )
      } else {
        nodes.push(<BlockRenderer key={run[0]._key} block={run[0]} />)
      }
      i = j
    } else {
      const rendered = <BlockRenderer key={block._key} block={block} />
      if (i > 0 && isInSectionBreak(block)) {
        nodes.push(
          <div key={`${block._key}-break`} className="caseStudySectionBreak">
            {rendered}
          </div>,
        )
      } else {
        nodes.push(rendered)
      }
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
