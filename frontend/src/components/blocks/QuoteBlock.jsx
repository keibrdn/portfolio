import './QuoteBlock.css'

export default function QuoteBlock({ quote, attribution, variant }) {
  const v = variant === 'compact' ? 'compact' : 'pullQuote'

  return (
    <blockquote className={`quoteBlock quoteBlock_${v}`}>
      <p className="quoteBlockText">{quote}</p>
      {attribution ? (
        <cite className="quoteBlockAttr">{attribution}</cite>
      ) : null}
    </blockquote>
  )
}
