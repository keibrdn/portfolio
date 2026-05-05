import { PortableText } from '@portabletext/react'
import './ptConfig.css'

const ptComponents = {
  block: {
    normal: ({ children }) => <p className="ptP">{children}</p>,
    h4: ({ children }) => <h4 className="ptH4">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="ptQuote">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="ptUl">{children}</ul>,
    number: ({ children }) => <ol className="ptOl">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="ptLi">{children}</li>,
    number: ({ children }) => <li className="ptLi">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="ptStrong">{children}</strong>,
    em: ({ children }) => <em className="ptEm">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const external = /^https?:\/\//i.test(href)
      return (
        <a
          className="ptLink"
          href={href}
          {...(external
            ? {rel: 'noopener noreferrer', target: '_blank'}
            : {})}
        >
          {children}
        </a>
      )
    },
  },
}

export function RichText({ value }) {
  if (!value || !Array.isArray(value) || value.length === 0) return null
  return <PortableText value={value} components={ptComponents} />
}
