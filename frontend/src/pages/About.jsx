import { useState, useRef, useEffect } from 'react'
import AppShell from '../components/layout/AppShell.jsx'
import { urlFor } from '../lib/sanity.js'
import './About.css'

const ASSETS = {
  adult:              { _type: 'reference', _ref: 'image-dcd222f392546fb2864b506b2c7a6e4beea9605f-1648x2219-jpg' },
  baby:               { _type: 'reference', _ref: 'image-5f6ac0ba9c1a20f615851418fddeeae91ad2eb1e-1513x1077-jpg' },
  uwLogo:             { _type: 'reference', _ref: 'image-a78b6ffdda1210c61a9a070f771115b46ba7ff71-156x147-png' },
  ucrLogo:            { _type: 'reference', _ref: 'image-19a2b0ca4273058e93b9f9984d0d39c664636945-496x477-png' },
  tazMatcha:          { _type: 'reference', _ref: 'image-59063ee506182d99e8822130984bb261f937984d-2109x2812-png' },
  eyesPeeled:         { _type: 'reference', _ref: 'image-82eedc1b72bb74d540335d95396db61a38ecfc44-2653x2206-png' },
  condron:            { _type: 'reference', _ref: 'image-ba203d6521e78a378ed271f141d2f4314f612985-1024x1003-png' },
  lighthouseRoasters: { _type: 'reference', _ref: 'image-0478886e1310b946795651cc62155c5db2f50e1a-1742x3324-png' },
  moment:             { _type: 'reference', _ref: 'image-b39f224a164156b490351e78d63b34d8e13d7c02-832x1095-png' },
  subject5:           { _type: 'reference', _ref: 'image-358adb5da1ecede036fd6481f2b3032a2f4be65f-1675x2301-png' },
  mexicoCity:         { _type: 'reference', _ref: 'image-f5df3811854318a85ccbfc6f62ffa7aa47b18f60-2374x1696-jpg' },
  uji:                { _type: 'reference', _ref: 'image-7c4789d7135f7fc66dd191981dc0f7974bb33ab9-3130x2075-jpg' },
  oaxaca:             { _type: 'reference', _ref: 'image-122682a4dd5e3fb6cf55be0706bb1c33fc791820-2955x2111-jpg' },
  la:                 { _type: 'reference', _ref: 'image-ed7daf4755fa01e896412eedf5f0a8202e664ab8-1713x1136-jpg' },
  forest:             { _type: 'reference', _ref: 'image-6a4c8870bc93c1c1182914d55263f0969eea7a83-3130x2075-jpg' },
}

// Pre-build optimised CDN URLs — auto WebP/AVIF, capped to display size @2x
function img(key, width) {
  return urlFor(ASSETS[key]).width(width).auto('format').quality(85).url()
}

const A = {
  adult:              img('adult',              320),
  baby:               img('baby',               320),
  uwLogo:             img('uwLogo',             200),
  ucrLogo:            img('ucrLogo',            200),
  tazMatcha:          img('tazMatcha',          300),
  eyesPeeled:         img('eyesPeeled',         400),
  condron:            img('condron',            300),
  lighthouseRoasters: img('lighthouseRoasters', 200),
  moment:             img('moment',             300),
  subject5:           img('subject5',           300),
  mexicoCity:         img('mexicoCity',         500),
  uji:                img('uji',                500),
  oaxaca:             img('oaxaca',             500),
  la:                 img('la',                 500),
  forest:             img('forest',             500),
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
  oaxaca:             'Monte Albán, Oaxaca',
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

  const headlineRef = useRef(null)
  const bioTextRef  = useRef(null)

  useEffect(() => {
    const headline = headlineRef.current
    const bioText  = bioTextRef.current
    if (!headline || !bioText) return

    function fitText() {
      headline.style.fontSize = '100px'
      const ratio = bioText.offsetWidth / headline.scrollWidth
      headline.style.fontSize = (100 * ratio) + 'px'
    }

    fitText()
    const observer = new ResizeObserver(fitText)
    observer.observe(bioText)
    return () => observer.disconnect()
  }, [])

  /* Returns merged style + event handlers for any hoverable photo */
  function ph(id, baseTransform, extraStyle = {}, hoverScale = 1.2) {
    const isActive = activeId === id
    const isPinned = pinnedId === id && !isActive
    const scale    = isActive ? ` scale(${hoverScale})` : ''
    const transform = baseTransform ? `${baseTransform}${scale}` : scale.trim() || undefined

    return {
      style: {
        ...extraStyle,
        transform,
        position: 'relative',
        zIndex: isActive ? 20 : isPinned ? 10 : 1,
        cursor: 'none',
        transition: 'transform 500ms cubic-bezier(0.34, 1.82, 0.64, 1)',
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
          <h2 className="aboutHeadline" ref={headlineRef} data-reveal style={{ '--reveal-delay': '0ms' }}>
            designer, tinkerer, caffeine enthusiast
          </h2>

          <div className="aboutBioRow">
            <div className="aboutBioBlock">
              <p className="aboutEyebrow" data-reveal style={{ '--reveal-delay': '100ms' }}>
                Who is Keila?
              </p>
              <div className="aboutBioText" ref={bioTextRef}>
                <p data-reveal style={{ '--reveal-delay': '200ms' }}>
                  I&apos;m Keila, a current student within the{' '}
                  <strong>Master of Human-Computer Interaction and Design</strong>{' '}
                  program at the <strong>University of Washington</strong>.
                </p>
                <p data-reveal style={{ '--reveal-delay': '300ms' }}>
                  I harness everything from code, research, storytelling, and design to make
                  complex ideas come to life.
                </p>
                <p data-reveal style={{ '--reveal-delay': '500ms' }}>
                  My love for creating goes way back. I fell in love with art and computers
                  and grew up feeling like I eventually had to choose one or the other. I was
                  halfway through undergrad, studying computer science, when I stumbled upon
                  product design. The only thing I could think of was, &ldquo;finally&rdquo;.
                  After that, everything melted into place.
                </p>
                <p data-reveal style={{ '--reveal-delay': '650ms' }}>
                  When I&apos;m not sitting at my desk with terrible posture, I love visiting
                  faraway places, soaking in the sun, and creating extremely niche playlists
                  on Spotify.
                </p>
              </div>
            </div>

            <div className="aboutPhotoStack">
              <div className="aboutPhotoReveal" data-reveal style={{ '--reveal-delay': '400ms' }}>
                <img className="aboutPhoto" src={A.adult} alt="Keila as an adult"
                  {...ph('adult', 'rotate(10deg)')} />
              </div>
              <div className="aboutPhotoReveal" data-reveal style={{ '--reveal-delay': '700ms' }}>
                <img className="aboutPhoto" src={A.baby}  alt="Keila as a baby"
                  {...ph('baby', 'rotate(-10deg)')} />
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Education ─────────────────────────────────────── */}
        <section className="aboutSection" data-reveal style={{ '--reveal-delay': '200ms' }}>
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
        <section className="aboutSection" data-reveal style={{ '--reveal-delay': '300ms' }}>
          <AboutEyebrow>My collection of caffeinated beverages</AboutEyebrow>
          <div className="aboutPhotoRow aboutPhotoRow--drinks">
            <img src={A.tazMatcha}          alt="Taz Matcha"          className="aboutDrinkPhoto"
              {...ph('tazMatcha',          'scaleX(-1)',        { width:  93, height: 124 }, 1.5)} />
            <img src={A.eyesPeeled}         alt="Eyes Peeled"         className="aboutDrinkPhoto"
              {...ph('eyesPeeled',         'rotate(15.7deg)',   { width: 150, height: 124 }, 1.5)} />
            <img src={A.condron}            alt="Condron"             className="aboutDrinkPhoto"
              {...ph('condron',            null,               { width: 126, height: 124 }, 1.5)} />
            <img src={A.lighthouseRoasters} alt="Lighthouse Roasters" className="aboutDrinkPhoto"
              {...ph('lighthouseRoasters', 'rotate(10deg)',    { width:  65, height: 124 }, 1.5)} />
            <img src={A.moment}             alt="Moment"              className="aboutDrinkPhoto"
              {...ph('moment',             'rotate(16.8deg)',  { width:  95, height: 124 }, 1.5)} />
            <img src={A.subject5}           alt="Subject 5"           className="aboutDrinkPhoto"
              {...ph('subject5',           null,               { width:  90, height: 124 }, 1.5)} />
          </div>
        </section>

        {/* ── 5. Places ────────────────────────────────────────── */}
        <section className="aboutSection" data-reveal style={{ '--reveal-delay': '400ms' }}>
          <AboutEyebrow>Places I&apos;ve been</AboutEyebrow>
          <div className="aboutPhotoRow aboutPhotoRow--places">
            <img src={A.mexicoCity} alt="Mexico City" className="aboutPlacePhoto"
              {...ph('mexicoCity', 'rotate(-10deg)', { marginRight: -29 }, 1.5)} />
            <img src={A.uji}        alt="Uji"         className="aboutPlacePhoto"
              {...ph('uji',        'rotate(10deg)',  { marginRight: -29 }, 1.5)} />
            <img src={A.oaxaca}     alt="Oaxaca"      className="aboutPlacePhoto"
              {...ph('oaxaca',     'rotate(-10deg)', { marginRight: -29 }, 1.5)} />
            <img src={A.la}         alt="LA"          className="aboutPlacePhoto"
              {...ph('la',         'rotate(10deg)',  { marginRight: -29 }, 1.5)} />
            <img src={A.forest}     alt="Forest"      className="aboutPlacePhoto"
              {...ph('forest',     'rotate(-10deg)', {}, 1.5)} />
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
