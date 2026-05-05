import { RichText } from '../portableText/ptConfig.jsx'
import './CalloutBlock.css'

export default function CalloutBlock({ eyebrow, title, subtitle, body }) {
  return (
    <aside className="calloutBlock">
      {eyebrow ? <p className="calloutEyebrow">{eyebrow}</p> : null}
      <h3 className="calloutTitle">{title}</h3>
      {subtitle ? <p className="calloutSubtitle">{subtitle}</p> : null}
      {body && body.length > 0 ? (
        <div className="calloutBody">
          <RichText value={body} />
        </div>
      ) : null}
    </aside>
  )
}
