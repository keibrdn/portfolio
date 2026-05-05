import './PageWrapper.css'

export default function PageWrapper({
  children,
  fullBleed = false,
  /** Landing home only — pin shell to one viewport height */
  fullBleedViewportLock = false,
}) {
  const innerClassName = fullBleed
    ? [
        'pageWrapperInner',
        'pageWrapperInner--fullBleed',
        fullBleedViewportLock ? 'pageWrapperInner--fullBleedViewportLock' : '',
      ]
        .filter(Boolean)
        .join(' ')
    : 'pageWrapperInner'

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
