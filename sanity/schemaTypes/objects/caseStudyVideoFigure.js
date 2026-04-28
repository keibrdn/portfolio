import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudyVideoFigure',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'video',
      title: 'Mux video',
      type: 'mux.video',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 3,
      description: 'Required — describes the clip for readers and context.',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {caption: 'caption'},
    prepare({caption}) {
      return {
        title: caption || 'Video',
        subtitle: 'Mux video',
      }
    },
  },
})
