import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default social image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site settings'}
    },
  },
})
