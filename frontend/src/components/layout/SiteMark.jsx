import { Link } from 'react-router-dom'
import './SiteMark.css'

/** Fixed favicon mark, top-left, shown on every page — doubles as a home link. */
export default function SiteMark() {
  return (
    <Link to="/" className="siteMark" aria-label="Home">
      <img src="/favicon.png?v=4" alt="" className="siteMarkImg" aria-hidden="true" />
    </Link>
  )
}
