import './SurfaceFrame.css'

/** Neutral surface used for media, demos, and other framed content. */
export default function SurfaceFrame({ children, caption, fit = false, className = '' }) {
  return (
    <figure
      className={['surfaceFrame', fit ? 'surfaceFrame--fit' : null, className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
      {caption ? <figcaption className="surfaceFrameCaption">{caption}</figcaption> : null}
    </figure>
  )
}
