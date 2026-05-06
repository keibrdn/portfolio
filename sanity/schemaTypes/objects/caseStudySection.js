import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudySection',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section heading',
      type: 'string',
      description: 'Primary section title (e.g. “The Problem”).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading (optional)',
      type: 'string',
      description: 'Secondary line under the heading.',
    }),
    defineField({
      name: 'blocks',
      title: 'Content blocks',
      description:
        'Ordered content: prose, captioned media, stats, quotes, and callouts. Order matches reading flow.',
      type: 'array',
      of: [
        defineArrayMember({type: 'caseStudyRichText'}),
        defineArrayMember({type: 'caseStudyMediaFigure'}),
        defineArrayMember({type: 'caseStudyVideoFigure'}),
        defineArrayMember({type: 'caseStudyStatGrid'}),
        defineArrayMember({type: 'caseStudyQuote'}),
        defineArrayMember({type: 'caseStudyCallout'}),
        defineArrayMember({type: 'caseStudyTextTriplet'}),
        defineArrayMember({type: 'caseStudyDivider'}),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading', subheading: 'subheading'},
    prepare({heading, subheading}) {
      return {
        title: heading || 'Section',
        subtitle: subheading,
      }
    },
  },
})
