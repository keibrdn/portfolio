import {defineField, defineType} from 'sanity'

const clipFields = [
  defineField({
    name: 'clip',
    title: 'WebM (keeps transparency)',
    type: 'file',
    options: {accept: 'video/webm'},
  }),
  defineField({
    name: 'clipHevc',
    title: 'HEVC / MOV with alpha (Safari, optional)',
    type: 'file',
    options: {accept: 'video/quicktime,video/mp4'},
    description: 'Safari cannot play WebM alpha. Add a Remotion HEVC-with-alpha export if you need Safari transparency.',
  }),
  defineField({
    name: 'caption',
    title: 'Caption',
    type: 'string',
  }),
]

export default defineType({
  name: 'caseStudyDemoPair',
  title: 'Demo pair',
  type: 'object',
  fields: [
    defineField({
      name: 'left',
      title: 'Left demo',
      type: 'object',
      fields: clipFields,
    }),
    defineField({
      name: 'right',
      title: 'Right demo (optional)',
      type: 'object',
      fields: clipFields,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (value?.left?.clip || value?.right?.clip) return true
      return 'Add at least one WebM'
    }),
  preview: {
    select: {left: 'left.caption', right: 'right.caption'},
    prepare({left, right}) {
      return {
        title: [left, right].filter(Boolean).join(' · ') || 'Demo pair',
        subtitle: 'Side-by-side WebM',
      }
    },
  },
})
