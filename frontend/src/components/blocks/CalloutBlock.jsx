import { RichText } from '../portableText/ptConfig.jsx'
import { urlFor } from '../../lib/sanity.js'
import { useImageLoaded } from '../../hooks/useImageLoaded.js'
import './CalloutBlock.css'

export default function CalloutBlock({ eyebrow, title, subtitle, body, image }) {
  const src = image?.asset ? urlFor(image).width(900).auto('format').url() : null
  const { loaded, onLoad, onError, ref } = useImageLoaded(src)

  return (
    <aside className="calloutBlock">
      {eyebrow ? <p className="calloutEyebrow">{eyebrow}</p> : null}
      {title ? <h3 className="calloutTitle">{title}</h3> : null}
      {subtitle ? <p className="calloutSubtitle">{subtitle}</p> : null}
      {src ? (
        <div className={`calloutImageWrap${loaded ? ' calloutImageWrap--loaded' : ''}`}>
          <img
            ref={ref}
            className="calloutImage"
            src={src}
            alt={image.alt ?? ''}
            loading="lazy"
            onLoad={onLoad}
            onError={onError}
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
