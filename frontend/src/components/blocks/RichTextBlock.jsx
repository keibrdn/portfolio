import { RichText } from '../portableText/ptConfig.jsx'
import './RichTextBlock.css'

/** Sanity `caseStudyRichText` — portable text body */
export default function RichTextBlock({ body }) {
  return (
    <div className="richTextBlock">
      <RichText value={body} />
    </div>
  )
}
