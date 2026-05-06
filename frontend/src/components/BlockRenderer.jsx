/**
 * Sanity → React bridge for modular case study blocks.
 * Each `block._type` from Studio maps to a component in `./blocks/`.
 * Used inside `CaseStudySection.jsx` for every item in `section.blocks`.
 */
import RichTextBlock from './blocks/RichTextBlock.jsx'
import MediaFigureBlock from './blocks/MediaFigureBlock.jsx'
import VideoFigureBlock from './blocks/VideoFigureBlock.jsx'
import StatGridBlock from './blocks/StatGridBlock.jsx'
import QuoteBlock from './blocks/QuoteBlock.jsx'
import CalloutBlock from './blocks/CalloutBlock.jsx'
import TextTripletBlock from './blocks/TextTripletBlock.jsx'
import DividerBlock from './blocks/DividerBlock.jsx'

export default function BlockRenderer({ block }) {
  if (!block || !block._type) return null

  switch (block._type) {
    case 'caseStudyRichText':
      return <RichTextBlock body={block.body} />

    case 'caseStudyMediaFigure':
      return (
        <MediaFigureBlock
          media={block.media}
          caption={block.caption}
          alt={block.alt}
        />
      )

    case 'caseStudyVideoFigure':
      return (
        <VideoFigureBlock video={block.video} caption={block.caption} />
      )

    case 'caseStudyStatGrid':
      return <StatGridBlock intro={block.intro} stats={block.stats} />

    case 'caseStudyQuote':
      return (
        <QuoteBlock
          quote={block.quote}
          attribution={block.attribution}
          variant={block.variant}
        />
      )

    case 'caseStudyCallout':
      return (
        <CalloutBlock
          eyebrow={block.eyebrow}
          title={block.title}
          subtitle={block.subtitle}
          body={block.body}
        />
      )

    case 'caseStudyTextTriplet':
      return <TextTripletBlock columns={block.columns} />

    case 'caseStudyDivider':
      return <DividerBlock variant={block.variant} />

    default:
      console.warn(`Unknown block type: ${block._type}`)
      return null
  }
}
