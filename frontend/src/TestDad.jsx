import { useState, useEffect } from 'react'
import './App.css'

export default function TestDad() {

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

  const [showModal, setShowModal] = useState(false)
  const [visibilityState, setVisibilityState] = useState('visible')

  useEffect(()=>getNotes(),[])
  useEffect(()=>setVisibilityState(document.visibilityState),[document.visibilityState])
  setTimeout(function(){setShowModal(true)},5000)
  return (
    <>
        {visibilityState == 'hidden' && window.location.reload()}
      <div className='wrapper'>
        <div id='dads-phone'>
            {showModal && 
                <>
                    <div id='modal'>
                        <div style={{textAlign:'center'}}>
                            <h1>MYbrain</h1>
                            <img src='./brain.jpeg' width='300px' />
                            <div    onClick={()=>window.location.reload()}
                                    style={{border:'1px solid black',
                                            padding:'1em 2em',
                                            cursor:'pointer',
                                            borderRadius:'10px',
                                            background:'lightgrey',
                                            display:'inline-block'}}>Click to Enter</div>
                        </div>
                    </div>{/* .modal */}
                </>
            }
            <h1 style={{display:'flex',
                        alignItems:'center',
                        justifyContent:'center'}}>
                <img src='./brain.jpeg' width='60px' />
                <span>MYbrain</span>
            </h1>

          <hr/><br/>
          <h2>{Date().slice(0,10)}</h2><br/>

          {
            (Date().slice(0,3) == 'Sat' || Date().slice(0,3) == 'Sun') && 
              <>
                <div style={{ background:'red',
                              color:'white',
                              padding:'2px 0',
                              textAlign:'center'}}>
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
