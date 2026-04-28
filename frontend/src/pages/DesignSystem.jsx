import './DesignSystem.css'

const COLOR_TOKENS = [
  { token: '--color-bg', label: 'Background' },
  { token: '--color-surface', label: 'Surface' },
  { token: '--color-text-heading', label: 'Text heading' },
  { token: '--color-text-primary', label: 'Text primary' },
  { token: '--color-text-muted', label: 'Text muted' },
  { token: '--color-accent', label: 'Accent' },
  { token: '--color-accent-plum', label: 'Accent plum' },
  { token: '--color-accent-orange', label: 'Accent orange' },
  { token: '--color-accent-blue', label: 'Accent blue' },
  { token: '--color-accent-green', label: 'Accent green' },
  { token: '--color-border', label: 'Border' },
  { token: '--color-focus-ring', label: 'Focus ring' },
]

const SIZE_TOKENS = [
  '--size-xs',
  '--size-sm',
  '--size-base',
  '--size-md',
  '--size-lg',
  '--size-xl',
  '--size-2xl',
  '--size-3xl',
  '--size-4xl',
]

const SPACE_TOKENS = [
  '--space-xs',
  '--space-sm',
  '--space-md',
  '--space-lg',
  '--space-xl',
  '--space-2xl',
  '--space-section',
]

const RADIUS_TOKENS = ['--radius-none', '--radius-sm', '--radius-md', '--radius-lg']

const SAMPLE_LINE = 'The quick brown fox jumps over the lazy dog.'

export default function DesignSystem() {
  return (
    <div className="designSystem">
      <header className="designSystemHeader">
        <h1 className="designSystemTitle">Design system</h1>
        <p className="designSystemMeta">
          Live reference for tokens in <code>src/styles/tokens.css</code>
        </p>
      </header>

      <section className="section" aria-labelledby="colors-heading">
        <h2 id="colors-heading" className="sectionLabel">
          Colors
        </h2>
        <div className="colorRow">
          {COLOR_TOKENS.map(({ token, label }) => (
            <div key={token} className="colorSwatch">
              <div
                className="colorSwatchTile"
                style={{ backgroundColor: `var(${token})` }}
                role="img"
                aria-label={`${label}: ${token}`}
              />
              <span className="colorSwatchLabel">{label}</span>
              <span className="colorSwatchVar">{token}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="type-heading">
        <h2 id="type-heading" className="sectionLabel">
          Type scale
        </h2>
        <div className="typeScale">
          {SIZE_TOKENS.map((sizeVar) => (
            <div key={sizeVar} className="typeScaleRow">
              <div className="typeScaleToken">{sizeVar}</div>
              <div className="typeScaleSamples">
                <p
                  className="typeSampleHeading"
                  style={{ fontSize: `var(${sizeVar})` }}
                >
                  {SAMPLE_LINE}
                </p>
                <p
                  className="typeSampleBody"
                  style={{ fontSize: `var(${sizeVar})` }}
                >
                  {SAMPLE_LINE}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="spacing-heading">
        <h2 id="spacing-heading" className="sectionLabel">
          Spacing
        </h2>
        <div className="spacingRow">
          {SPACE_TOKENS.map((spaceVar) => (
            <div key={spaceVar} className="spacingItem">
              <div
                className="spacingSquare"
                style={{
                  width: `var(${spaceVar})`,
                  height: `var(${spaceVar})`,
                }}
              />
              <span className="spacingLabel">{spaceVar}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="radius-heading">
        <h2 id="radius-heading" className="sectionLabel">
          Radii
        </h2>
        <div className="radiusSection">
          {RADIUS_TOKENS.map((radiusVar) => (
            <div key={radiusVar} className="radiusStrip">
              <div
                className="radiusStripBar"
                style={{ borderRadius: `var(${radiusVar})` }}
              />
              <span className="radiusStripMeta">{radiusVar}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
