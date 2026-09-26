import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudyVideoFigure',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'clip',
      title: 'WebM (keeps transparency)',
      type: 'file',
      options: {accept: 'video/webm'},
      description: 'Use this for Remotion demos with alpha. Mux flattens transparency to black.',
    }),
    defineField({
      name: 'clipHevc',
      title: 'HEVC / MOV with alpha (Safari, optional)',
      type: 'file',
      options: {accept: 'video/quicktime,video/mp4'},
    }),
    defineField({
      name: 'video',
      title: 'Mux video',
      type: 'mux.video',
      hidden: ({parent}) => Boolean(parent?.clip),
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
    select: {caption: 'caption', clip: 'clip'},
    prepare({caption, clip}) {
      return {
        title: caption || 'Video',
        subtitle: clip ? 'WebM' : 'Mux video',
      }
    },
  },
})
