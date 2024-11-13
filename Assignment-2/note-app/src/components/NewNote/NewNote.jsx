import { useEffect, useState, uuid } from 'react'
import './NewNote.css'
import Palette from './Palette/Palette'

function NewNote({ data, setData }) {
  const [color, setColor] = useState(null);
  const [note, setNote] = useState("");
  const [uid, setUid] = useState(6);

  const handleChange = (e) => {
    setNote(e.target.value)
  }

  const addNewNote = () => {
    setUid(prev => prev + 1);
    setData(prev => [...prev, {id: uid + 1, note: note, color: color}])
  }

  useEffect(() => {
    return () => {
      console.log(data, color, note, uid);
    }
  },)

  return (
    <div className='new-note'>
      <textarea id="note-area" placeholder="Enter your note here..." value={note} onChange={handleChange}></textarea>
      <div className='controls'>
        <Palette setColor={setColor}/>
        <button className='add-btn' onClick={addNewNote}>ADD</button>
      </div>
    </div>
  )
}

export default NewNote