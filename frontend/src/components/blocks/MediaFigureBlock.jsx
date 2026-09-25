import { urlFor } from '../../lib/sanity.js'
import { useImageLoaded } from '../../hooks/useImageLoaded.js'
import './MediaFigureBlock.css'

export default function MediaFigureBlock({ media, caption, alt, size }) {
  const src =
    media &&
    urlFor(media).width(1600).auto('format').quality(85).url()

  const altText = alt || caption || ''
  const { loaded, onLoad, onError, ref } = useImageLoaded(src)

  const sizeClass = size === 'small' ? ' mediaFigure--small' : size === 'medium' ? ' mediaFigure--medium' : ''

  return (
    <figure className={`mediaFigure${sizeClass}`}>
      <div className={`mediaFigureMain${loaded ? ' mediaFigureMain--loaded' : ''}`}>
        {src ? (
          <img
            ref={ref}
            className="mediaFigureImg"
            src={src}
            alt={altText}
            loading="lazy"
            onLoad={onLoad}
            onError={onError}
          />
        ) : (
          <div className="mediaFigureFallback" role="img" aria-label={altText} />
        )}
      </div>
      {caption ? (
        <figcaption className="mediaFigureCaption">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
