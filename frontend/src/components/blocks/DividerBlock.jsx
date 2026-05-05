import './DividerBlock.css'

export default function DividerBlock({ variant }) {
  const size = variant === 'large' ? 'large' : 'default'
  return (
    <hr className={`dividerBlock dividerBlock_${size}`} aria-hidden="true" />
  )
}
