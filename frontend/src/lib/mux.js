/**
 * Resolve Mux playback ID from a Sanity mux.video field (expanded asset in GROQ).
 * @param {{ asset?: Record<string, unknown> } | null | undefined} videoField
 * @returns {string | null}
 */
export function getPlaybackIdFromMuxField(videoField) {
  const asset = videoField?.asset
  if (!asset || typeof asset !== 'object') return null

  if (typeof asset.playbackId === 'string' && asset.playbackId.length > 0) {
    return asset.playbackId
  }

  const ids = asset.data?.playback_ids
  if (Array.isArray(ids) && ids[0] && typeof ids[0].id === 'string') {
    return ids[0].id
  }

  return null
}
