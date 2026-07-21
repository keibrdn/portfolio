import { NavLink } from 'react-router-dom'
import './Nav.css'

const links = [
  { to: '/', label: 'home', end: true },
  { to: '/about', label: 'about' },
  { to: '/fun', label: 'fun' },
]

export default function Nav({ fullBleed = false }) {
  return (
    <header className={fullBleed ? 'nav nav--landing' : 'nav'}>
      <nav className="navLinks navLinks--text" aria-label="Primary">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={Boolean(end)}
            className={({ isActive }) =>
              isActive ? 'navTextLink navTextLinkActive' : 'navTextLink'
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
