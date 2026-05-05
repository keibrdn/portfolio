import CaseStudyCard from './CaseStudyCard.jsx'
import './CaseStudyGrid.css'

export default function CaseStudyGrid({ caseStudies, className = '' }) {
  const items = Array.isArray(caseStudies) ? caseStudies : []

  if (items.length === 0) {
    return (
      <p className="caseStudyGridEmpty">
        No case studies yet — publish a document in Sanity.
      </p>
    )
  }

  return (
    <div className={['caseStudyGrid', className].filter(Boolean).join(' ')}>
      {items.map((cs) => (
        <CaseStudyCard
          key={cs._id}
          slug={cs.slug}
          title={cs.title}
          skillsLine={cs.skillsLine}
          excerpt={cs.excerpt}
          featuredImage={cs.featuredImage}
          tags={cs.tags}
        />
      ))}
    </div>
  )
}
