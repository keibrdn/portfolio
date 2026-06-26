import { RichText } from '../portableText/ptConfig.jsx'
import './QuoteBlock.css'

export default function QuoteBlock({ quote, attribution, variant }) {
  const v = variant === 'compact' ? 'compact' : 'pullQuote'

  return (
    <blockquote className={`quoteBlock quoteBlock_${v}`}>
      <span className="quoteBlockQuoteMark quoteBlockQuoteMark--open" aria-hidden="true">&ldquo;</span>
      {Array.isArray(quote) ? (
        <div className="quoteBlockText">
          <RichText value={quote} />
        </div>
      ) : quote ? (
        <p className="quoteBlockText">{quote}</p>
      ) : null}
      <span className="quoteBlockQuoteMark quoteBlockQuoteMark--close" aria-hidden="true">&rdquo;</span>
      {attribution ? (
        <cite className="quoteBlockAttr">{attribution}</cite>
      ) : null}
    </blockquote>
  )
}
