import AlphaLoopVideo from '../AlphaLoopVideo.jsx'
import SurfaceFrame from '../SurfaceFrame.jsx'
import './DemoPairBlock.css'

function clipUrl(file) {
  return file?.asset?.url || null
}

function DemoCard({ item, fit }) {
  const src = clipUrl(item?.clip)
  const hevcSrc = clipUrl(item?.clipHevc)
  const caption = item?.caption?.trim() || ''
  if (!src) return null

  return (
    <SurfaceFrame fit={fit} caption={caption}>
      <div className="demoPairStage">
        <AlphaLoopVideo src={src} hevcSrc={hevcSrc} label={caption} />
      </div>
    </SurfaceFrame>
  )
}

export default function DemoPairBlock({ left, right }) {
  const items = [left, right].filter((item) => clipUrl(item?.clip))
  if (items.length === 0) return null
  const single = items.length === 1

  return (
    <div
      className={single ? 'demoPair demoPair--single' : 'demoPair'}
      role="group"
    >
      {items.map((item, index) => (
        <DemoCard key={item.caption || `demo-${index}`} item={item} fit={single} />
      ))}
    </div>
  )
}
