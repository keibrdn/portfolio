import { RichText } from '../portableText/ptConfig.jsx'
import './RichTextBlock.css'

/** Sanity `caseStudyRichText` — optional h2 title + portable text body */
export default function RichTextBlock({ title, body }) {
  return (
    <div className="richTextBlock">
      {title ? <h2 className="richTextBlockTitle">{title}</h2> : null}
      {body && body.length > 0 ? <RichText value={body} /> : null}
    </div>
  )
}
