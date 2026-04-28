import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudyStatGrid',
  title: 'Statistics',
  type: 'object',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro (optional)',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Short lead above the stats.',
    }),
    defineField({
      name: 'stats',
      title: 'Stat rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'caseStudyStatItem',
          fields: [
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'label', title: 'Label', type: 'text', rows: 3},
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
            prepare({title, subtitle}) {
              return {title: title || 'Stat', subtitle}
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Statistics'}
    },
  },
})
