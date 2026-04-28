import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudyDivider',
  title: 'Divider',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Spacing',
      type: 'string',
      description: 'Sanity requires at least one field on objects; use this for optional visual weight.',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Large', value: 'large'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {variant: 'variant'},
    prepare({variant}) {
      return {
        title: 'Divider',
        subtitle: variant === 'large' ? 'Large spacing' : 'Default spacing',
      }
    },
  },
})
