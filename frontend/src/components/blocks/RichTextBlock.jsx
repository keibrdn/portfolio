import { RichText } from '../portableText/ptConfig.jsx'
import './RichTextBlock.css'

/** Sanity `caseStudyRichText` — optional eyebrow + title + portable text body */
export default function RichTextBlock({ eyebrow, title, body }) {
  return (
    <div className="richTextBlock">
      {eyebrow ? <p className="richTextBlockEyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="richTextBlockTitle">{title}</h2> : null}
      {body && body.length > 0 ? <RichText value={body} /> : null}
    </div>
  )
}
