import { useState, useEffect } from 'react'
import './Appointments.css'
import NavbarAdy from './components/NavbarAdy.jsx'

export default function DadView() {

    const BASE_URL =    (process.env.NODE_ENV == 'production') ? 
                        'https://mybrain-8bpo.onrender.com' :
                        'http://localhost:1111'

    const [page, setPage] = useState('')
    useEffect(()=>setPage('DadView'))

    const [appointments, setAppointments] = useState([])
    useEffect(()=>{
        getAppointments()
        setTimeout(()=>window.location.reload(),1800000)
    },[])
    const [birthdays, setBirthdays] = useState([])

    const getBirthdays = ()=>{
      fetch(`${BASE_URL}/api/birthday`)
        .then(res=>res.json())
        .then(json=>setBirthdays(json))
        .catch(err=>console.log(err))
    }
    useEffect(()=>getBirthdays(),[])


    function getAppointments(){
        fetch(`${BASE_URL}/api/appointments`)
            .then(res=>res.json())
            .then(json=>setAppointments(json))
            .catch(err=>console.log(err))
    }

  return (
    <>
      <div className='wrapper'>
        <div className='adys-phone'>
                    <h1 style={{display:'flex',
                                gap:'10px',
                                marginBottom:'5px',
                                alignItems:'center',
                                justifyContent:'center'}}>
                        <img src='./brain.jpeg' width='60px' />
                        <span>MYbrain</span>
                    </h1>
                    <hr/>     
            <NavbarAdy page={page} />   
            <h2>DadView</h2>
            <h2>{Date().slice(0,10)}</h2><br/>

            <div className='dad-font'>
            {appointments.map(appointment=>{
                return(
                    appointment.month == Date().slice(4,7) &&  
                    appointment.day == Date().slice(8,10) &&  
                    appointment.year == Date().slice(11,15) &&  
                    <div key={appointment._id}>
                                <b>
                                
                                {appointment.hour != '99' && 
                                    <>
                                      <span>
                                          {appointment.hour}:
                                          {appointment.minute < 10 ? '0'+appointment.minute : appointment.minute}
                                          {appointment.ampm}
                                      </span>
                                      <br/>                                    
                                    </>
                                } 

                                </b>
                                {appointment.title}<br/>
                                {appointment.description && <>{appointment.description}<br/></>}
                                
                                <br/>
                                
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
        </div>{/* .dad-font */}
        </div>{/* .adys-phone */}
      </div>{/* .wrapper */}
    </>
  )
}
