import { urlFor } from '../../lib/sanity.js'
import './MediaFigureBlock.css'

export default function MediaFigureBlock({ media, caption, alt }) {
  const src =
    media &&
    urlFor(media).width(1600).auto('format').quality(85).url()

  const altText = alt || caption || ''

  return (
    <figure className="mediaFigure">
      {src ? (
        <img className="mediaFigureImg" src={src} alt={altText} loading="lazy" />
      ) : (
        <div className="mediaFigureFallback" role="img" aria-label={altText} />
      )}
      {caption ? (
        <figcaption className="mediaFigureCaption">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
