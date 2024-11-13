import Note from "./Note/Note"
import './Notes.css'

function Notes({ data }) {
  return (
    <>
      <h2>MY NOTES ({data.length})</h2>
      <div className="notes">
        {data.map((item) => {
          return (
            <Note  key={item.id} note={item}/>
          )
        })}
      </div>   
    </>

  )
}

export default Notes