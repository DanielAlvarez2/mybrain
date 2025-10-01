import { useState, useEffect } from 'react'
import './App.css'

export default function App() {

  const BASE_URL =  (process.env.NODE_ENV == 'production') ? 
                    'https://mybrain-8bpo.onrender.com' :
                    'http://localhost:1111'

  const [notes, setNotes] = useState([])

  const getNotes = ()=>{
    fetch(`${BASE_URL}/api/note`)
      .then(res=>res.json())
      .then(json=>setNotes(json))
      .catch(err=>console.log(err))
  }

  useEffect(()=>getNotes(),[])
  return (
    <>
      <div className='wrapper'>
        <div id='dads-phone'>
          <h1>MYbrain</h1>
          <hr/><br/>
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
