import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudyRichText',
  title: 'Rich text',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (optional)',
      type: 'string',
      description: 'Small uppercase label above the title, e.g. “The problem”.',
    }),
    defineField({
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
      description: 'Displays as an h4 above the body text.',
    }),
    defineField({
      name: 'framed',
      title: 'Wrap in a Surface frame',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.sideFrame,
    }),
    defineField({
      name: 'sideFrame',
      title: 'Surface frame on the left',
      type: 'boolean',
      initialValue: false,
      description: 'Places a Surface frame beside the title and body. Add an image later if you want.',
    }),
    defineField({
      name: 'sideMedia',
      title: 'Frame image (optional)',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => !parent?.sideFrame,
    }),
    defineField({
      name: 'sideCaption',
      title: 'Frame caption (optional)',
      type: 'string',
      hidden: ({parent}) => !parent?.sideFrame,
    }),
    defineField({
      name: 'sideEmbed',
      title: 'Frame animation (optional)',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: ''},
          {title: 'Search typing', value: 'searchTyping'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => !parent?.sideFrame,
    }),
    defineField({
      name: 'sideFit',
      title: '500px frame, image fits inside',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => !parent?.sideFrame,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
            {title: 'Pull quote', value: 'pullquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
})
