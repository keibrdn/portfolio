import { useState } from 'react'
import { urlFor } from '../../lib/sanity.js'
import './MediaFigureBlock.css'

export default function MediaFigureBlock({ media, caption, alt, size }) {
  const src =
    media &&
    urlFor(media).width(1600).auto('format').quality(85).url()

  const altText = alt || caption || ''
  const [imgLoaded, setImgLoaded] = useState(false)

  const sizeClass = size === 'small' ? ' mediaFigure--small' : size === 'medium' ? ' mediaFigure--medium' : ''

  return (
    <figure className={`mediaFigure${sizeClass}`}>
      <div className={`mediaFigureMain${imgLoaded ? ' mediaFigureMain--loaded' : ''}`}>
        {src ? (
          <img
            className="mediaFigureImg"
            src={src}
            alt={altText}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
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
