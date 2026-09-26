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
 * Full case study for `/work/:slug` — one request so the page can wait,
 * then slide in only after document + cover are ready.
 */
export const caseStudyBySlugQuery = /* groq */ `
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
    publishedAt,
    sections[] {
      _key,
      heading,
      subheading,
      blocks[] {
        _key,
        _type,
        _type == "caseStudyRichText" => {
          eyebrow,
          title,
          body
        },
        _type == "caseStudyMediaFigure" => {
          media,
          caption,
          alt
        },
        _type == "caseStudyVideoFigure" => {
          caption,
          clip { asset->{ url, mimeType } },
          clipHevc { asset->{ url, mimeType } },
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
        _type == "caseStudyDemoPair" => {
          left {
            caption,
            clip { asset->{ url, mimeType } },
            clipHevc { asset->{ url, mimeType } }
          },
          right {
            caption,
            clip { asset->{ url, mimeType } },
            clipHevc { asset->{ url, mimeType } }
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
          body,
          image
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
