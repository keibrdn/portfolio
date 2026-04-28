import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudyCallout',
  title: 'Callout (key decision, highlight)',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'e.g. “Key Design Decision #1”',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (optional)',
      type: 'string',
      description: 'Smaller heading line under the title.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {title: 'title', eyebrow: 'eyebrow'},
    prepare({title, eyebrow}) {
      return {
        title: title || 'Callout',
        subtitle: eyebrow,
      }
    },
  },
})
