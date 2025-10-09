import { useState, useEffect } from 'react'
import './App.css'

export default function App() {

  const BASE_URL =  (process.env.NODE_ENV == 'production') ? 
                    'https://mybrain-8bpo.onrender.com' :
                    'http://localhost:1111'

  const [notes, setNotes] = useState([])
  const [birthdays, setBirthdays] = useState([])

  const getBirthdays = ()=>{
    fetch(`${BASE_URL}/api/birthday`)
      .then(res=>res.json())
      .then(json=>setBirthdays(json))
      .catch(err=>console.log(err))
  }
  const getNotes = ()=>{
    fetch(`${BASE_URL}/api/note`)
      .then(res=>res.json())
      .then(json=>setNotes(json))
      .catch(err=>console.log(err))
  }

  useEffect(()=>getNotes(),[])
  useEffect(()=>getBirthdays(),[])


  function reloadPage(){
    setTimeout(()=>window.location.reload(),1800000)
  }
  return (
    <>
      
      <div className='wrapper'>
        <div id='dads-phone'>
                    <h1 style={{display:'flex',
                                gap:'10px',
                                marginBottom:'5px',
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

          {birthdays.map(bday=>{
            return(
                (Date().slice(4,7) == bday.month && Date().slice(8,11) == bday.day) &&
                    <div key={bday._id}>
                      <div className='dad-display-bday'>
                        Today is {bday.name}'s Birthday!<br/>
                        {bday.year &&  <>
                                          Turning {Date().slice(11,15)-bday.year} today<br/>
                                        </>}
                      </div>                      
                      <br/>
                    </div>              
            )
          })}

          {
            reloadPage()
          }       
        </div>{/* #dads-phone */}
      </div>{/* .wrapper */}
    </>
  )
}
