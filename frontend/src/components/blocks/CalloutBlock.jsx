import { useState } from 'react'
import { RichText } from '../portableText/ptConfig.jsx'
import { urlFor } from '../../lib/sanity.js'
import './CalloutBlock.css'

export default function CalloutBlock({ eyebrow, title, subtitle, body, image }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <aside className="calloutBlock">
      {eyebrow ? <p className="calloutEyebrow">{eyebrow}</p> : null}
      {title ? <h3 className="calloutTitle">{title}</h3> : null}
      {subtitle ? <p className="calloutSubtitle">{subtitle}</p> : null}
      {image?.asset ? (
        <div className={`calloutImageWrap${imgLoaded ? ' calloutImageWrap--loaded' : ''}`}>
          <img
            className="calloutImage"
            src={urlFor(image).width(900).auto('format').url()}
            alt={image.alt ?? ''}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
        </div>
      ) : null}
      {body && body.length > 0 ? (
        <div className="calloutBody">
          <RichText value={body} />
        </div>
      ) : null}
    </aside>
  )
}
