import { useState } from 'react';
import './App.css'
import NewNote from './components/NewNote/NewNote';
import Notes from './components/Notes/Notes';
import DATA from './assets/DATA';
function App() {
  const [notes, setNotes] = useState([...DATA])
  return (
    <>
     <h1>NOTES APP</h1>
     <NewNote  data={notes} setData={setNotes}/>
     <Notes data={notes} />
    </>
  )
  
}

export default App