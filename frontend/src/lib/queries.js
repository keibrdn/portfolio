/** GROQ queries — all Sanity reads go through this file (used by hooks in `src/hooks/`). */

export const caseStudyListQuery = /* groq */ `
  *[_type == "caseStudy" && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt) desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    tags,
    skillsLine
  }
`

/**
 * Case study “shell” (no heavy blocks) — small request, case-insensitive slug.
 * Paired with `caseStudySectionsByIdQuery` in `useCaseStudy`.
 */
export const caseStudyMetaBySlugQuery = /* groq */ `
  *[_type == "caseStudy" && defined(slug.current) && lower(slug.current) == lower($slug)][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    tags,
    skillsLine,
    subtitle,
    role,
    team,
    timeline,
    publishedAt
  }
`

/**
 * Section blocks for a case study document — fetch by `_id` after meta resolves.
 */
export const caseStudySectionsByIdQuery = /* groq */ `
  *[_id == $id][0] {
    sections[] {
      _key,
      heading,
      subheading,
      blocks[] {
        _key,
        _type,
        _type == "caseStudyRichText" => {
          body
        },
        _type == "caseStudyMediaFigure" => {
          media,
          caption,
          alt
        },
        _type == "caseStudyVideoFigure" => {
          caption,
          video {
            asset-> {
              playbackId,
              data {
                playback_ids[] {
                  id,
                  policy
                }
              }
            }
          }
        },
        _type == "caseStudyStatGrid" => {
          intro,
          stats
        },
        _type == "caseStudyQuote" => {
          quote,
          attribution,
          variant
        },
        _type == "caseStudyCallout" => {
          eyebrow,
          title,
          subtitle,
          body
        },
        _type == "caseStudyTextTriplet" => {
          columns[] {
            _key,
            title,
            text
          }
        },
        _type == "caseStudyDivider" => {
          variant
        }
      }
    }
  }
`
