import './Footer.css'

function IconLink() {
  return (
    <svg className="siteFooterIcon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconCopy() {
  return (
    <svg className="siteFooterIcon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="4.5" y="4.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7.5H2C1.44772 7.5 1 7.05228 1 6.5V2C1 1.44772 1.44772 1 2 1H6.5C7.05228 1 7.5 1.44772 7.5 2V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="siteFooterContent">
        <h3 className="siteFooterName">keila braden</h3>
        <p className="siteFooterMade">made with &lt;3</p>
        <nav className="siteFooterLinks" aria-label="Footer links">
          <a
            className="siteFooterLink"
            href="https://www.linkedin.com/in/keila-braden/"
            target="_blank"
            rel="noreferrer noopener"
          >
            linkedin<IconLink />
          </a>
          <a
            className="siteFooterLink"
            href="https://github.com/keibrdn"
            target="_blank"
            rel="noreferrer noopener"
          >
            github<IconLink />
          </a>
          <a className="siteFooterLink" href="mailto:keilabraden@gmail.com">
            email<IconCopy />
          </a>
        </nav>
      </div>
    </footer>
  )
}
