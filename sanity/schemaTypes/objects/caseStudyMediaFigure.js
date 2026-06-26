import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudyMediaFigure',
  title: 'Image or GIF',
  type: 'object',
  fields: [
    defineField({
      name: 'media',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 3,
      description: 'Required for accessibility and context.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the image for screen readers (recommended).',
    }),
    defineField({
      name: 'size',
      title: 'Display size',
      type: 'string',
      options: {
        list: [
          {title: 'Full width (default)', value: 'full'},
          {title: 'Small (300px, centered)', value: 'small'},
          {title: 'Medium (500px, centered)', value: 'medium'},
        ],
        layout: 'radio',
      },
      initialValue: 'full',
    }),
  ],
  preview: {
    select: {caption: 'caption', media: 'media'},
    prepare({caption, media}) {
      return {
        title: caption || 'Image',
        subtitle: 'Media figure',
        media,
      }
    },
  },
})
