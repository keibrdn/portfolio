import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <main className="home">
      <h1 className="homeTitle">Portfolio</h1>
      <p className="homeIntro">
        <Link className="homeLink" to="/design">
          Open design system
        </Link>
      </p>
    </main>
  )
}
