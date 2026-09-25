import { Link } from 'react-router-dom'
import { urlFor } from '../lib/sanity.js'
import { useImageLoaded } from '../hooks/useImageLoaded.js'
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
  layout = 'vertical', // 'vertical' | 'horizontal'
}) {
  const href = `/work/${slug}`
  const imgUrl =
    featuredImage &&
    urlFor(featuredImage).width(1800).fit('max').auto('format').quality(85).url()

  const tagList = tagsFromProps(tags, skillsLine)
  const { loaded: imgLoaded, onLoad, onError, ref: imgRef } = useImageLoaded(imgUrl)

  if (layout === 'horizontal') {
    return (
      <article className="caseStudyCard caseStudyCard--horizontal">
        <Link className="caseStudyCardLink caseStudyCardLink--horizontal" to={href}>
          <div className={`caseStudyCardMedia caseStudyCardMedia--h${imgLoaded ? ' caseStudyCardMedia--loaded' : ''}`}>
            {imgUrl ? (
              <img
                className="caseStudyCardImg caseStudyCardImg--h"
                src={imgUrl}
                alt={title ? `${title} preview` : 'Project preview'}
                ref={imgRef}
                loading="lazy"
                onLoad={onLoad}
                onError={onError}
              />
            ) : (
              <div className="caseStudyCardPlaceholder caseStudyCardPlaceholder--h" aria-hidden="true" />
            )}
          </div>
          <div className="caseStudyCardBody--h">
            {title ? <h3 className="caseStudyCardName--h">{title}</h3> : null}
            {excerpt?.trim() ? (
              <p className="caseStudyCardTitle--h">{excerpt.trim()}</p>
            ) : null}
            {tagList.length > 0 ? (
              <ul className="caseStudyCardTagList" aria-label="Tags">
                {tagList.map((tag) => (
                  <li key={tag} className="caseStudyCardTag">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Link>
      </article>
    )
  }

  // Default vertical layout (used on other pages)
  return (
    <article className="caseStudyCard">
      <Link className="caseStudyCardLink" to={href}>
        <div className={`caseStudyCardMedia${imgLoaded ? ' caseStudyCardMedia--loaded' : ''}`}>
          {imgUrl ? (
            <img
              className="caseStudyCardImg"
              src={imgUrl}
              alt={title ? `${title} preview` : 'Project preview'}
              ref={imgRef}
              loading="lazy"
              onLoad={onLoad}
              onError={onError}
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
          <h4 className="caseStudyCardTitle">{title}</h4>
          {excerpt ? <p className="caseStudyCardExcerpt">{excerpt}</p> : null}
        </div>
      </Link>
    </article>
  )
}
