import './PageWrapper.css'

export default function PageWrapper({
  children,
  fullBleed = false,
  /** Landing home only — pin shell to one viewport height */
  fullBleedViewportLock = false,
  /** Strip all wrapper padding — page owns its own spacing */
  noPadding = false,
}) {
  const innerClassName = fullBleed
    ? [
        'pageWrapperInner',
        'pageWrapperInner--fullBleed',
        fullBleedViewportLock ? 'pageWrapperInner--fullBleedViewportLock' : '',
        noPadding ? 'pageWrapperInner--noPadding' : '',
      ]
        .filter(Boolean)
        .join(' ')
    : ['pageWrapperInner', noPadding ? 'pageWrapperInner--noPadding' : '']
        .filter(Boolean)
        .join(' ')

  const outerClassName = [
    'pageWrapper',
    fullBleedViewportLock ? 'pageWrapper--viewportLock' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={outerClassName}>
      <div className={innerClassName}>{children}</div>
    </div>
  )
}
