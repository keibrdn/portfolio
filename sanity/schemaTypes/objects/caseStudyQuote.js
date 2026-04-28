import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudyQuote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution (optional)',
      type: 'string',
      description: 'Speaker, role, or source label.',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Pull quote', value: 'pullQuote'},
          {title: 'Interview / compact', value: 'compact'},
        ],
        layout: 'radio',
      },
      initialValue: 'pullQuote',
    }),
  ],
  preview: {
    select: {quote: 'quote'},
    prepare({quote}) {
      return {
        title: quote ? `${quote.slice(0, 72)}${quote.length > 72 ? '…' : ''}` : 'Quote',
        subtitle: 'Quote block',
      }
    },
  },
})
