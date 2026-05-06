import './TextTripletBlock.css'

export default function TextTripletBlock({ columns }) {
  if (!Array.isArray(columns) || columns.length === 0) return null

  const colCount = columns.length >= 2 && columns.length <= 3 ? columns.length : 3

  return (
    <div className="textTripletBlock" role="group">
      <div className="textTripletGrid" data-cols={String(colCount)}>
        {columns.map((col, index) => (
          <div
            key={col._key ?? `col-${index}`}
            className="textTripletCol"
          >
            {col.title ? (
              <h3 className="textTripletTitle">{col.title}</h3>
            ) : null}
            {col.text ? <p className="textTripletBody">{col.text}</p> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
