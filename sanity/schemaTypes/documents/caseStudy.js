import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  groups: [
    {name: 'preview', title: 'Home / listing'},
    {name: 'story', title: 'Story & meta'},
    {name: 'content', title: 'Sections'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'preview',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
      group: 'preview',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      description: 'Shown on the home page card.',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      group: 'preview',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'preview',
    }),
    defineField({
      name: 'excerpt',
      title: 'Quick description',
      type: 'text',
      rows: 4,
      description: 'Short summary for the home page listing.',
      validation: (Rule) => Rule.required().max(400),
      group: 'preview',
    }),
    defineField({
      name: 'subtitle',
      title: 'Story subtitle',
      type: 'string',
      description: 'One-line pitch under the hero title on the case study page.',
      group: 'story',
    }),
    defineField({
      name: 'skillsLine',
      title: 'Skills',
      type: 'string',
      description: 'e.g. “design concept, vibe coding, user research”',
      group: 'story',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'story',
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'string',
      group: 'story',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      description: 'e.g. “October - December 2025”',
      group: 'story',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      group: 'story',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{type: 'caseStudySection'}],
      group: 'content',
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      excerpt: 'excerpt',
      media: 'featuredImage',
    },
    prepare({title, excerpt, media}) {
      return {
        title: title || 'Untitled',
        subtitle: excerpt,
        media,
      }
    },
  },
})
