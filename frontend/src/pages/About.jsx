import { useState } from 'react'
import AppShell from '../components/layout/AppShell.jsx'
import './About.css'

const A = {
  adult:             '/about/dcd222f392546fb2864b506b2c7a6e4beea9605f.png',
  baby:              '/about/5f6ac0ba9c1a20f615851418fddeeae91ad2eb1e.png',
  uwLogo:            '/about/e7815f6481b011737f7452cd497ef1cc3814ab3c.png',
  ucrLogo:           '/about/8c8cf0fa33446f929f8fd9f0009aae8dbc1b124b.png',
  tazMatcha:         '/about/59063ee506182d99e8822130984bb261f937984d.png',
  eyesPeeled:        '/about/82eedc1b72bb74d540335d95396db61a38ecfc44.png',
  condron:           '/about/ba203d6521e78a378ed271f141d2f4314f612985.png',
  lighthouseRoasters:'/about/0478886e1310b946795651cc62155c5db2f50e1a.png',
  moment:            '/about/b39f224a164156b490351e78d63b34d8e13d7c02.png',
  subject5:          '/about/358adb5da1ecede036fd6481f2b3032a2f4be65f.png',
  mexicoCity:        '/about/f5df3811854318a85ccbfc6f62ffa7aa47b18f60.png',
  uji:               '/about/7c4789d7135f7fc66dd191981dc0f7974bb33ab9.png',
  oaxaca:            '/about/122682a4dd5e3fb6cf55be0706bb1c33fc791820.png',
  la:                '/about/ed7daf4755fa01e896412eedf5f0a8202e664ab8.png',
  forest:            '/about/6a4c8870bc93c1c1182914d55263f0969eea7a83.png',
}

const TIPS = {
  adult:              'I love analog photobooths!',
  baby:               'The good old days',
  tazMatcha:          'Taz Matcha, Seattle',
  eyesPeeled:         'Eyes Peeled, LA',
  condron:            'Condron, Riverside, CA',
  lighthouseRoasters: 'Lighthouse Roasters, Seattle',
  moment:             'Moment Coffee, Seattle',
  subject5:           'Hoji, Redlands, CA',
  mexicoCity:         'Mexico City',
  uji:                'Uji, Japan',
  oaxaca:             'Oaxaca',
  la:                 'LA (SoCal is home!)',
  forest:             'Sequoia National Park',
}

function AboutEyebrow({ children }) {
  return <p className="aboutEyebrow">{children}</p>
}

export function AboutContent() {
  const [tooltip, setTooltip]   = useState(null) // { text, x, y } | null
  const [activeId, setActiveId] = useState(null) // currently hovered
  const [pinnedId, setPinnedId] = useState(null) // last hovered — stays elevated

  /* Returns merged style + event handlers for any hoverable photo */
  function ph(id, baseTransform, extraStyle = {}) {
    const isActive = activeId === id
    const isPinned = pinnedId === id && !isActive
    const scale    = isActive ? ' scale(1.2)' : ''
    const transform = baseTransform ? `${baseTransform}${scale}` : scale.trim() || undefined

    return {
      style: {
        ...extraStyle,
        transform,
        position: 'relative',
        zIndex: isActive ? 20 : isPinned ? 10 : 1,
        cursor: 'none',
        transition: 'transform 220ms ease-in-out',
      },
      onMouseEnter: () => { setActiveId(id); setPinnedId(id) },
      onMouseLeave: () => { setActiveId(null); setTooltip(null) },
      onMouseMove:  (e) => setTooltip({ text: TIPS[id], x: e.clientX, y: e.clientY }),
    }
  }

  return (
    <>
      <div className="aboutContent">

        {/* ── 1. Bio ───────────────────────────────────────────── */}
        <section className="aboutSection aboutBioSection">
          <h2 className="aboutHeadline">designer, tinkerer, caffeine enthusiast</h2>

          <div className="aboutBioRow">
            <div className="aboutBioBlock">
              <AboutEyebrow>Who is Keila?</AboutEyebrow>
              <div className="aboutBioText">
                <p>
                  I&apos;m Keila, a current student within the{' '}
                  <strong>Master of Human-Computer Interaction and Design</strong>{' '}
                  program at the <strong>University of Washington</strong>.
                </p>
                <p>
                  I harness everything from code, research, storytelling, and design to make
                  complex ideas come to life.
                </p>
                <p>
                  My love for creating goes way back. I fell in love with art and computers
                  and grew up feeling like I eventually had to choose one or the other. I was
                  halfway through undergrad, studying computer science, when I stumbled upon
                  product design. The only thing I could think of was, &ldquo;finally&rdquo;.
                  After that, everything melted into place.
                </p>
                <p>
                  When I&apos;m not sitting at my desk with terrible posture, I love visiting
                  faraway places, soaking in the sun, and creating extremely niche playlists
                  on Spotify.
                </p>
              </div>
            </div>

            <div className="aboutPhotoStack">
              <img className="aboutPhoto" src={A.adult} alt="Keila as an adult"
                {...ph('adult', 'rotate(10deg)')} />
              <img className="aboutPhoto" src={A.baby}  alt="Keila as a baby"
                {...ph('baby', 'rotate(-10deg)')} />
            </div>
          </div>
        </section>

        {/* ── 2. Design Philosophy ─────────────────────────────── */}
        <section className="aboutSection">
          <AboutEyebrow>Design philosophy</AboutEyebrow>
          <div className="aboutPhilosophyContainer">
            {['Curiosity', 'Elegance', 'Clarity'].map((word) => (
              <div key={word} className="aboutPhilosophyBlock">
                <span className="aboutPhilosophyWord">{word}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Education ─────────────────────────────────────── */}
        <section className="aboutSection">
          <AboutEyebrow>Education</AboutEyebrow>
          <div className="aboutEducationContainer">
            <div className="aboutEducationEntry">
              <img className="aboutEduLogo" src={A.uwLogo} alt="University of Washington logo" />
              <div className="aboutEduText">
                <p className="aboutEduDegree">Master of Human-Computer Interaction and Design</p>
                <p className="aboutEduYear">2026</p>
                <p className="aboutEduSchool">University of Washington</p>
              </div>
            </div>
            <div className="aboutEducationEntry">
              <img className="aboutEduLogo" src={A.ucrLogo} alt="UC Riverside logo" />
              <div className="aboutEduText">
                <p className="aboutEduDegree">Bachelor of Computer Science with Business Applications</p>
                <p className="aboutEduYear">2022</p>
                <p className="aboutEduSchool">University of California, Riverside</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Caffeinated beverages ─────────────────────────── */}
        <section className="aboutSection">
          <AboutEyebrow>My collection of caffeinated beverages</AboutEyebrow>
          <div className="aboutPhotoRow aboutPhotoRow--drinks">
            <img src={A.tazMatcha}          alt="Taz Matcha"          className="aboutDrinkPhoto"
              {...ph('tazMatcha',          'scaleX(-1)',        { width:  93, height: 124 })} />
            <img src={A.eyesPeeled}         alt="Eyes Peeled"         className="aboutDrinkPhoto"
              {...ph('eyesPeeled',         'rotate(15.7deg)',   { width: 150, height: 124 })} />
            <img src={A.condron}            alt="Condron"             className="aboutDrinkPhoto"
              {...ph('condron',            null,               { width: 126, height: 124 })} />
            <img src={A.lighthouseRoasters} alt="Lighthouse Roasters" className="aboutDrinkPhoto"
              {...ph('lighthouseRoasters', 'rotate(10deg)',    { width:  65, height: 124 })} />
            <img src={A.moment}             alt="Moment"              className="aboutDrinkPhoto"
              {...ph('moment',             'rotate(16.8deg)',  { width:  95, height: 124 })} />
            <img src={A.subject5}           alt="Subject 5"           className="aboutDrinkPhoto"
              {...ph('subject5',           null,               { width:  90, height: 124 })} />
          </div>
        </section>

        {/* ── 5. Places ────────────────────────────────────────── */}
        <section className="aboutSection">
          <AboutEyebrow>Places I&apos;ve been</AboutEyebrow>
          <div className="aboutPhotoRow aboutPhotoRow--places">
            <img src={A.mexicoCity} alt="Mexico City" className="aboutPlacePhoto"
              {...ph('mexicoCity', 'rotate(-10deg)', { marginRight: -29 })} />
            <img src={A.uji}        alt="Uji"         className="aboutPlacePhoto"
              {...ph('uji',        'rotate(10deg)',  { marginRight: -29 })} />
            <img src={A.oaxaca}     alt="Oaxaca"      className="aboutPlacePhoto"
              {...ph('oaxaca',     'rotate(-10deg)', { marginRight: -29 })} />
            <img src={A.la}         alt="LA"          className="aboutPlacePhoto"
              {...ph('la',         'rotate(10deg)',  { marginRight: -29 })} />
            <img src={A.forest}     alt="Forest"      className="aboutPlacePhoto"
              {...ph('forest',     'rotate(-10deg)')} />
          </div>
        </section>

      </div>

      {/* Cursor-following tooltip */}
      {tooltip && (
        <div
          className="aboutTooltip"
          style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  )
}

export default function About() {
  return (
    <AppShell fullBleed mainClassName="appShellMain--about" showNav={false}>
      <AboutContent />
    </AppShell>
  )
}
