import MuxPlayer from '@mux/mux-player-react'
import AlphaLoopVideo from '../AlphaLoopVideo.jsx'
import SurfaceFrame from '../SurfaceFrame.jsx'
import { getPlaybackIdFromMuxField } from '../../lib/mux.js'
import './VideoFigureBlock.css'

export default function VideoFigureBlock({ video, clip, clipHevc, caption }) {
  const clipUrl = clip?.asset?.url
  const hevcUrl = clipHevc?.asset?.url
  const playbackId = getPlaybackIdFromMuxField(video)

  return (
    <SurfaceFrame className="videoFigure" caption={caption}>
      {clipUrl ? (
        <div className="videoFigurePlayer">
          <AlphaLoopVideo src={clipUrl} hevcSrc={hevcUrl} label={caption} />
        </div>
      ) : playbackId ? (
        <div className="videoFigurePlayer">
          <MuxPlayer
            playbackId={playbackId}
            streamType="on-demand"
            muted
            loop
            autoPlay="muted"
            playsInline
            nohotkeys
          />
        </div>
      ) : (
        <div className="videoFigureMissing">
          Video processing — playback ID not ready yet.
        </div>
      )}
    </SurfaceFrame>
  )
}
