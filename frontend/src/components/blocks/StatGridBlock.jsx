import { RichText } from '../portableText/ptConfig.jsx'
import './StatGridBlock.css'

export default function StatGridBlock({ intro, stats }) {
  const rows = Array.isArray(stats) ? stats : []

  return (
    <section className="statGridBlock">
      {intro && intro.length > 0 ? (
        <div className="statGridIntro">
          <RichText value={intro} />
        </div>
      ) : null}
      <dl className="statGridList">
        {rows.map((row, i) => (
          <div key={`stat-row-${i}`} className="statGridRow">
            <dt className="statGridValue">{row?.value}</dt>
            <dd className="statGridLabel">{row?.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
