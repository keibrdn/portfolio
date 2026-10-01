import { RichText } from '../portableText/ptConfig.jsx'
import SearchTypingAnimation from '../SearchTypingAnimation.jsx'
import SurfaceFrame from '../SurfaceFrame.jsx'
import { urlFor } from '../../lib/sanity.js'
import { useImageLoaded } from '../../hooks/useImageLoaded.js'
import './RichTextBlock.css'

function SideFrame({ media, caption, embed, fit }) {
  const src =
    media &&
    urlFor(media).width(1200).auto('format').quality(85).url()
  const { loaded, onLoad, onError, ref } = useImageLoaded(src)
  const alt = caption || ''

  let inner = <div className="richTextSideSlot" aria-hidden="true" />
  if (embed === 'searchTyping') {
    inner = (
      <div className="richTextSideEmbed">
        <SearchTypingAnimation />
      </div>
    )
  } else if (src) {
    inner = (
      <div className={fit ? 'richTextSideEmbed richTextSideEmbed--fit' : 'richTextSideEmbed'}>
        <img
          ref={ref}
          className={loaded ? 'richTextSideImg richTextSideImg--loaded' : 'richTextSideImg'}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={onLoad}
          onError={onError}
        />
      </div>
    )
  }

  return <SurfaceFrame caption={caption}>{inner}</SurfaceFrame>
}

/** Sanity `caseStudyRichText` — optional eyebrow + title + portable text body */
export default function RichTextBlock({
  eyebrow,
  title,
  body,
  framed,
  sideFrame,
  sideMedia,
  sideCaption,
  sideEmbed,
  sideFit,
}) {
  const copy = (
    <div className="richTextBlockCopy">
      {eyebrow ? <p className="richTextBlockEyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="richTextBlockTitle">{title}</h2> : null}
      {body && body.length > 0 ? <RichText value={body} /> : null}
    </div>
  )

  if (!sideFrame && !sideMedia) {
    if (framed) {
      return (
        <div className="richTextBlock richTextBlock--framed">
          <SurfaceFrame>{copy}</SurfaceFrame>
        </div>
      )
    }
    return <div className="richTextBlock">{copy}</div>
  }

  const frame = (
    <SideFrame media={sideMedia} caption={sideCaption} embed={sideEmbed} fit={sideFit} />
  )

  return (
    <div
      className={
        sideFit
          ? 'richTextBlock richTextBlock--withFrame richTextBlock--sideFit'
          : 'richTextBlock richTextBlock--withFrame'
      }
    >
      {sideFit ? copy : frame}
      {sideFit ? frame : copy}
    </div>
  )
}
