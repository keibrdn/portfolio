import AppShell from '../components/layout/AppShell.jsx'
import './About.css'

/** Exported from Figma (node 0:129) — filenames are stable asset hashes from MCP. */
const ABOUT_ASSETS = {
  portrait: '/about/dcd222f392546fb2864b506b2c7a6e4beea9605f.png',
  tape: '/about/7653fd09fa905816422366e7c5e907cbe6e514da.png',
  altoid: '/about/776de74d8a5a58cba59617133961d38d4dc6f0d8.png',
  matcha: '/about/457c9eb19731368fcc2bfaab5492bf699c0f5b5e.png',
  book: '/about/35b266796743d509b14989da4007529c2c65e9e7.png',
  chrome: '/about/ede1f7e4c43f1f424428b9c8c90472628d303d20.png',
  earbuds: '/about/e5456f5bbf57d6ba86b034c90e223987bbe74b2d.png',
  nbr: '/about/edaf6c254844886d74abe731711186763a263731.png',
  scrubjay: '/about/dd2d11c778310b3fe1ae9b74c43ef88ba02faea7.png',
  iconPin: '/about/74a1f855502330e16b049aef4efa6a6ea93dc58e.svg',
  iconGrad: '/about/e392e6b4dd516e7291cb22901cf4b756e059d0d7.svg',
}

function AboutPortrait() {
  return (
    <div className="aboutPortrait">
      <div className="aboutPortraitStage">
        <img
          className="aboutPortraitPhoto"
          src={ABOUT_ASSETS.portrait}
          alt="Portrait of Keila"
          width={196}
          height={263}
        />
        <img
          className="aboutPortraitTape aboutPortraitTape--one"
          src={ABOUT_ASSETS.tape}
          alt=""
          width={120}
          height={120}
        />
        <img
          className="aboutPortraitTape aboutPortraitTape--two"
          src={ABOUT_ASSETS.tape}
          alt=""
          width={120}
          height={120}
        />
      </div>
    </div>
  )
}

function AboutCollage() {
  return (
    <div className="aboutCollage" aria-hidden="true">
      <div className="aboutCollageStage">
        <div className="aboutCollageLayer aboutCollageLayer--book">
          <img src={ABOUT_ASSETS.book} alt="" />
        </div>
        <div className="aboutCollageLayer aboutCollageLayer--matcha">
          <img src={ABOUT_ASSETS.matcha} alt="" />
        </div>
        <div className="aboutCollageLayer aboutCollageLayer--altoid">
          <img src={ABOUT_ASSETS.altoid} alt="" />
        </div>
        <div className="aboutCollageLayer aboutCollageLayer--chromeOne">
          <img src={ABOUT_ASSETS.chrome} alt="" />
        </div>
        <div className="aboutCollageLayer aboutCollageLayer--chromeTwo">
          <img src={ABOUT_ASSETS.chrome} alt="" />
        </div>
        <div className="aboutCollageLayer aboutCollageLayer--earbuds">
          <img src={ABOUT_ASSETS.earbuds} alt="" />
        </div>
        <div className="aboutCollageLayer aboutCollageLayer--nbr">
          <img src={ABOUT_ASSETS.nbr} alt="" />
        </div>
        <div className="aboutCollageLayer aboutCollageLayer--scrubjay">
          <img src={ABOUT_ASSETS.scrubjay} alt="" />
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const mailto = import.meta.env.VITE_CONTACT_EMAIL
    ? `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`
    : null
  const linkedinUrl = import.meta.env.VITE_SOCIAL_LINKEDIN || ''
  const xUrl = import.meta.env.VITE_SOCIAL_X || ''

  return (
    <AppShell fullBleed mainClassName="appShellMain--about">
      <div className="aboutPage">
        <div className="aboutBody">
          <aside className="aboutSidebar" aria-label="Contact">
            <div className="aboutFlower">
              <img
                className="aboutFlowerImg"
                src="/landing-flower.svg"
                alt=""
                width={474}
                height={325}
              />
            </div>
            <div className="aboutConnect">
              <p className="aboutConnectTitle">let&apos;s connect!</p>
              <p className="aboutConnectLine">
                {mailto ? (
                  <a className="aboutConnectLink" href={mailto}>
                    email
                  </a>
                ) : (
                  <span className="aboutConnectMuted">email</span>
                )}
                <span className="aboutConnectSep"> * </span>
                {linkedinUrl ? (
                  <a
                    className="aboutConnectLink"
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    linkedin
                  </a>
                ) : (
                  <span className="aboutConnectMuted">linkedin</span>
                )}
                <span className="aboutConnectSep"> * </span>
                {xUrl ? (
                  <a className="aboutConnectLink" href={xUrl} target="_blank" rel="noreferrer noopener">
                    X
                  </a>
                ) : (
                  <span className="aboutConnectMuted">X</span>
                )}
              </p>
            </div>
          </aside>

          <div className="aboutMain">
            <div className="aboutGrid">
              <header className="aboutIntro">
                <h1 className="aboutHeadline">
                  {'design, development, & everything in-between'}
                </h1>
                <div className="aboutMeta">
                  <div className="aboutMetaGroup">
                    <img
                      className="aboutMetaIcon"
                      src={ABOUT_ASSETS.iconPin}
                      alt=""
                      width={19}
                      height={28}
                    />
                    <span className="aboutMetaText">Seattle, WA</span>
                  </div>
                  <div className="aboutMetaGroup aboutMetaGroup--edu">
                    <img
                      className="aboutMetaIcon aboutMetaIcon--grad"
                      src={ABOUT_ASSETS.iconGrad}
                      alt=""
                      width={28}
                      height={23}
                    />
                    <span className="aboutMetaText aboutMetaText--edu">
                      Master of Human-Computer Interaction + Design @ UW
                    </span>
                  </div>
                </div>
              </header>

              <div className="aboutBio">
                <section className="aboutBioBlock">
                  <h2 className="aboutSectionLabel">philosophy</h2>
                  <p className="aboutBodyText">
                    Design is rarely about one thing. That&apos;s why I use an{' '}
                    <strong className="aboutEmphasis">interdisciplinary lens</strong> to think about
                    the entire system — product, business, development, and user requirements — in
                    order to produce the right solution.
                  </p>
                </section>
                <section className="aboutBioBlock">
                  <h2 className="aboutSectionLabel">for fun!</h2>
                  <p className="aboutBodyText">
                    I&apos;m a matcha-lover who loves literary fiction, oldies, and bird-watching!
                    My favorite bird is the California Scrub Jay, a noisy little guy who reminds me of
                    home.
                  </p>
                </section>
              </div>

              <AboutPortrait />
              <AboutCollage />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
