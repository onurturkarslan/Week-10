import './Note.css'

function Note({ note }) {
  return (
    <div className={"note "+note.color}>
      <p>{note.note}</p>
    </div>
  )
}

export default Note