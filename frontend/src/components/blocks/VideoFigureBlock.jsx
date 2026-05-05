import MuxPlayer from '@mux/mux-player-react'
import { getPlaybackIdFromMuxField } from '../../lib/mux.js'
import './VideoFigureBlock.css'

export default function VideoFigureBlock({ video, caption }) {
  const playbackId = getPlaybackIdFromMuxField(video)

  return (
    <figure className="videoFigure">
      {playbackId ? (
        <div className="videoFigurePlayer">
          <MuxPlayer playbackId={playbackId} streamType="on-demand" />
        </div>
      ) : (
        <div className="videoFigureMissing">
          Video processing — playback ID not ready yet.
        </div>
      )}
      {caption ? (
        <figcaption className="videoFigureCaption">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
