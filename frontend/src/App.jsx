import { useState, useEffect } from 'react'

export default function App() {

  const [notes, setNotes] = useState([])

  const getNotes = ()=>{
    fetch('/api/note')
      .then(res=>res.json())
      .then(json=>setNotes(json))
      .catch(err=>console.log(err))
  }

  useEffect(()=>getNotes(),[])
  return (
    <>
      <div className='wrapper'>
        <div id='dads-phone'>
          {notes.map(data=>{
            return(
              <div key={data._id}>
                {data.note}<br/><br/>
              </div>
            )
          })}
        </div>{/* #dads-phone */}
      </div>{/* .wrapper */}
    </>
  )
}
