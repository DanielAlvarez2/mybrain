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
            <h1 style={{display:'flex',
                        alignItems:'center',
                        justifyContent:'center'}}>
                <img src='./brain.jpeg' width='60px' />
                <span>MYbrain</span>
            </h1>

          <hr/><br/>
          <h2>{Date().slice(0,10)}</h2><br/>

          {
            Date().slice(0,3) == 'Sat' || Date().slice(0,3) == 'Sun' && 
              <>
                <div style={{background:'red',color:'white',textAlign:'center'}}>
                  The girls do NOT have school today
                </div><br/>
              </>
          }
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
