import { Link } from 'react-router-dom'
import { urlFor } from '../lib/sanity.js'
import './CaseStudyCard.css'

function tagsFromProps(tags, skillsLine) {
  if (Array.isArray(tags) && tags.length > 0) {
    return tags.map(String).filter(Boolean)
  }
  if (typeof skillsLine === 'string' && skillsLine.trim()) {
    return skillsLine
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

export default function CaseStudyCard({
  slug,
  title,
  skillsLine,
  excerpt,
  featuredImage,
  tags,
}) {
  const href = `/work/${slug}`
  const imgUrl =
    featuredImage &&
    urlFor(featuredImage).width(900).height(560).fit('crop').auto('format').quality(85).url()

  const tagList = tagsFromProps(tags, skillsLine)

  return (
    <article className="caseStudyCard">
      <Link className="caseStudyCardLink" to={href}>
        {tagList.length > 0 ? (
          <div className="caseStudyCardTags" aria-label="Tags">
            {tagList.map((t) => (
              <span key={t} className="caseStudyCardTag">
                {t}
              </span>
            ))}
          </div>
        ) : null}
        <div className="caseStudyCardMedia">
          {imgUrl ? (
            <img
              className="caseStudyCardImg"
              src={imgUrl}
              alt={title ? `${title} preview` : 'Project preview'}
              loading="lazy"
            />
          ) : (
            <div className="caseStudyCardPlaceholder" aria-hidden="true" />
          )}
        </div>
        <div className="caseStudyCardBody">
          <h2 className="caseStudyCardTitle">{title}</h2>
          {excerpt ? <p className="caseStudyCardExcerpt">{excerpt}</p> : null}
        </div>
      </Link>
    </article>
  )
}
