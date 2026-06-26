import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudyQuote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [],
          },
        },
      ],
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
    select: {quote: 'quote', attribution: 'attribution'},
    prepare({quote, attribution}) {
      const text = quote?.[0]?.children?.[0]?.text ?? ''
      return {
        title: text ? `${text.slice(0, 72)}${text.length > 72 ? '…' : ''}` : 'Quote',
        subtitle: attribution ?? 'Quote block',
      }
    },
  },
})
