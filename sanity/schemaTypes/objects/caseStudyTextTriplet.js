import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudyTextTriplet',
  title: 'Text columns (2–3, minimal)',
  type: 'object',
  description:
    'Two or three side-by-side headings with short supporting text — lighter than a callout (no panel or heavy type).',
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'caseStudyTextTripletColumn',
          fields: [
            defineField({
              name: 'title',
              title: 'Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}) {
              return {title: title || 'Column'}
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(2).max(3).error('Add two or three columns.'),
    }),
  ],
  preview: {
    select: {columns: 'columns'},
    prepare({columns}) {
      const titles = Array.isArray(columns)
        ? columns.map((c) => c?.title).filter(Boolean)
        : []
      return {
        title: 'Text columns (2–3)',
        subtitle: titles.length ? titles.join(' · ') : 'Columns',
      }
    },
  },
})
