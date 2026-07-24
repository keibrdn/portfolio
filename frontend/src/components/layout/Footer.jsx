import './Footer.css'

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
            linkedin
          </a>
          <a
            className="siteFooterLink"
            href="https://github.com/keibrdn"
            target="_blank"
            rel="noreferrer noopener"
          >
            github
          </a>
          <a className="siteFooterLink" href="mailto:keilabraden@gmail.com">
            email
          </a>
        </nav>
      </div>
    </footer>
  )
}
