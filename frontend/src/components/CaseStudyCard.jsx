import { useState } from 'react'
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
    urlFor(featuredImage).width(1800).fit('max').auto('format').quality(85).url()

  const tagList = tagsFromProps(tags, skillsLine)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <article className="caseStudyCard">
      <Link className="caseStudyCardLink" to={href}>
        <div className={`caseStudyCardMedia${imgLoaded ? ' caseStudyCardMedia--loaded' : ''}`}>
          {imgUrl ? (
            <img
              className="caseStudyCardImg"
              src={imgUrl}
              alt={title ? `${title} preview` : 'Project preview'}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
            />
          ) : (
            <div className="caseStudyCardPlaceholder" aria-hidden="true" />
          )}
        </div>
        {tagList.length > 0 ? (
          <p className="caseStudyCardTags" aria-label="Tags">
            {tagList.join(' / ')}
          </p>
        ) : null}
        <div className="caseStudyCardBody">
          <h2 className="caseStudyCardTitle">{title}</h2>
          {excerpt ? <p className="caseStudyCardExcerpt">{excerpt}</p> : null}
        </div>
      </Link>
    </article>
  )
}
