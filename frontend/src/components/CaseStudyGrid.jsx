import CaseStudyCard from './CaseStudyCard.jsx'
import './CaseStudyGrid.css'

export default function CaseStudyGrid({ caseStudies, className = '', layout = 'vertical' }) {
  const items = Array.isArray(caseStudies) ? caseStudies : []

  if (items.length === 0) {
    return (
      <p className="caseStudyGridEmpty">
        No case studies yet — publish a document in Sanity.
      </p>
    )
  }

  return (
    <div className={['caseStudyGrid', className, layout === 'horizontal' ? 'caseStudyGrid--horizontal' : ''].filter(Boolean).join(' ')}>
      {items.map((cs) => (
        <CaseStudyCard
          key={cs._id}
          slug={cs.slug}
          title={cs.title}
          skillsLine={cs.skillsLine}
          excerpt={cs.excerpt}
          featuredImage={cs.featuredImage}
          tags={cs.tags}
          layout={layout}
        />
      ))}
    </div>
  )
}
