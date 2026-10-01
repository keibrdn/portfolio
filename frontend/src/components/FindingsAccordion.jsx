import { useState } from 'react'
import { RichText } from './portableText/ptConfig.jsx'
import SurfaceFrame from './SurfaceFrame.jsx'
import './FindingsAccordion.css'

function FindingCopy({ item }) {
  return (
    <div className="richTextBlockCopy findingsAccordionCopy">
      {item.eyebrow ? <p className="richTextBlockEyebrow">{item.eyebrow}</p> : null}
      {item.title ? <h2 className="richTextBlockTitle">{item.title}</h2> : null}
      {item.body && item.body.length > 0 ? <RichText value={item.body} /> : null}
    </div>
  )
}

export default function FindingsAccordion({ items }) {
  const [open, setOpen] = useState(0)
  const [entering, setEntering] = useState(null)
  const [closing, setClosing] = useState(null)

  if (!Array.isArray(items) || items.length === 0) return null

  const select = (index) => {
    if (index === open) return
    setClosing(open)
    setOpen(index)
    setEntering(index)
  }

  const onItemTransitionEnd = (index, event) => {
    if (event.target !== event.currentTarget) return
    if (event.propertyName !== 'width' && event.propertyName !== 'height') return
    if (index === closing) setClosing(null)
    if (index === entering) setEntering(null)
  }

  return (
    <div
      className="findingsAccordion"
      role="list"
      style={{
        '--findings-strip-count': Math.max(items.length - 1, 0),
      }}
    >
      {items.map((item, index) => {
        const expanded = index === open
        const title = item.title || `Finding ${index + 1}`
        const mark = String(index + 1)
        const itemClass = [
          'findingsAccordionItem',
          expanded ? 'findingsAccordionItem--open' : null,
          entering === index ? 'findingsAccordionItem--entering' : null,
          closing === index ? 'findingsAccordionItem--closing' : null,
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <div
            key={item._key || `finding-${index}`}
            className={itemClass}
            role="listitem"
            onTransitionEnd={(event) => onItemTransitionEnd(index, event)}
          >
            <SurfaceFrame className="findingsAccordionFrame">
              <span className="findingsAccordionMark" aria-hidden="true">
                {mark}
              </span>
              <div aria-hidden={!expanded}>
                <FindingCopy item={item} />
              </div>
            </SurfaceFrame>
            {expanded ? null : (
              <button
                type="button"
                className="findingsAccordionHit"
                onClick={() => select(index)}
                aria-label={`Show finding ${mark}. ${title}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
