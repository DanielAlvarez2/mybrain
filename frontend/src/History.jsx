import { useState, useEffect } from 'react'
import './History.css'
import NavbarAdy from './components/NavbarAdy.jsx'

export default function History() {

    const BASE_URL =    (process.env.NODE_ENV == 'production') ? 
                        'https://mybrain-8bpo.onrender.com' :
                        'http://localhost:1111'

    const [history, setHistory] = useState([])
    useEffect(()=>getAppointments(),[])


    function getAppointments(){
        fetch(`${BASE_URL}/api/history`)
            .then(res=>res.json())
            .then(json=>setHistory(json))
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
            
              <NavbarAdy />
            
            <h2>History</h2>
            <h2>{Date().slice(0,10)}</h2><br/>

            {history.map(appointment=>{
                return(
                    <div key={appointment._id}>
                        <b>{appointment.month} {appointment.day} {appointment.year} &nbsp;
                        {appointment.hour}:
                        {appointment.minute < 10 ? '0'+appointment.minute : appointment.minute}
                        {appointment.ampm}</b><br/>
                        {appointment.title}<br/>
                        {appointment.description && <>appointment.description<br/></>}
                        {appointment.keep ? 'SAVE in History' : 'DELETE from History'}
                        <br/><br/>
                    </div>
                )
            })}



        </div>{/* .adys-phone */}
      </div>{/* .wrapper */}
    </>
  )
}
