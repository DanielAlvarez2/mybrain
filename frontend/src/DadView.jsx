import { useState, useEffect } from 'react'
import './Appointments.css'
import NavbarAdy from './components/NavbarAdy'

export default function App() {

const BASE_URL = (process.env.NODE_ENV == 'production') ?
'https://mybrain-8bpo.onrender.com' :
'http://localhost:1111'


const [appointments, setAppointments] = useState([])
const [today, setToday] = useState(Date().slice(0,10))
useEffect(()=>{
getAppointments()
const updatePage = setInterval(()=>{
getAppointments()
setToday(Date().slice(0,10))
},1800000)
return ()=> clearInterval(updatePage)
},[])

const [birthdays, setBirthdays] = useState([])
const getBirthdays = ()=>{
fetch(`${BASE_URL}/api/birthday`)
.then(res=>res.json())
.then(json=>setBirthdays(json))
.catch(err=>console.log(err))
}
useEffect(()=>getBirthdays(),[])

const [pixels, setPixels] = useState('')
function getPixels(){
fetch(`${BASE_URL}/api/pixels`)
.then(res=>res.json())
.then(json=>setPixels(json))
.catch(err=>console.log(err))
}
useEffect(()=>getPixels(),[])


function getAppointments(){
fetch(`${BASE_URL}/api/appointments`)
.then(res=>res.json())
.then(json=>setAppointments(json))
.catch(err=>console.log(err))
}

function decreaseFont(){
if (pixels == 16) return
fetch(`${BASE_URL}/api/pixels/minus`)
.then(res=>res.json())
.then(data=>setPixels(data))
.catch(err=>console.log(err))
}

function increaseFont(){
fetch(`${BASE_URL}/api/pixels/plus`)
.then(res=>res.json())
.then(data=>setPixels(data))
.catch(err=>console.log(err))
}
return (
<>
<div className='wrapper'>
<div className='adys-phone' style={{position:'relative'}}>

<div id='font-size-control'
style={{position:'absolute',
right:'10px',
color:'grey',
top:'110px',
fontSize:'25px'}}>
font size<br/>
<span onClick={decreaseFont}>-</span>
&nbsp;{pixels}px&nbsp;
<span onClick={increaseFont}>+</span>
</div>{/* #font-size-control */}
<h1 style={{display:'flex',
gap:'10px',
marginBottom:'5px',
alignItems:'center',
justifyContent:'center'}}>
<img src='./brain.png' width='60px' />
<span>MYbrain</span>
</h1>
<hr/>
<NavbarAdy page='DadView' />
<h2>DadView</h2>
<h2>{today}</h2><br/>

<div className='dad-font' style={{fontSize:`${pixels}px`}}>

                {(Date().slice(0,3) == 'Sat' || Date().slice(0,3) == 'Sun') &&  <>
                                              <div style={{ background:'red',
                                                            
                                                            padding:'2px 0',
                                                            textAlign:'center',
                                                            color:'white'}}>
                                                The girls do NOT<br/> 
                                                have school today
                                              </div><br/>
                                            </>}


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
{bday.year && <>
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
