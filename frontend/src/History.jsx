import { useState, useEffect } from 'react'
import './Appointments.css'
import NavbarAdy from './components/NavbarAdy.jsx'

export default function History() {

    const BASE_URL =    (process.env.NODE_ENV == 'production') ? 
                        'https://mybrain-8bpo.onrender.com' :
                        'http://localhost:1111'

    const todayYear = Date().slice(11,15)
    let todayMonth = Date().slice(4,7)
    const todayDay = Date().slice(8,10)
    if (todayMonth == 'Jan') todayMonth = '01'
    if (todayMonth == 'Feb') todayMonth = '02'
    if (todayMonth == 'Mar') todayMonth = '03'
    if (todayMonth == 'Apr') todayMonth = '04'
    if (todayMonth == 'May') todayMonth = '05'
    if (todayMonth == 'Jun') todayMonth = '06'
    if (todayMonth == 'Jul') todayMonth = '07'
    if (todayMonth == 'Aug') todayMonth = '08'
    if (todayMonth == 'Sep') todayMonth = '09'
    if (todayMonth == 'Oct') todayMonth = '10'
    if (todayMonth == 'Nov') todayMonth = '11'
    if (todayMonth == 'Dec') todayMonth = '12'
    const todaySequence = todayYear + todayMonth + todayDay + '0000'

    const [appointments, setAppointments] = useState([])
    useEffect(()=>{
        getAppointments()
        setTimeout(()=>window.location.reload(),3600000)
    },[])

    const [today, setToday] = useState(Date().slice(0,10))
    useEffect(()=>{
        const updatePage = setInterval(()=>{
          setToday(Date().slice(0,10))
        },1800000)
        return ()=> clearInterval(updatePage)
    },[])


    async function editAppointment(formData){
        console.log(formData.get('id'))
        await fetch(`${BASE_URL}/api/appointment/${formData.get('id')}`,{   method:'PUT',
                                                                            headers:{'Content-Type':'application/json'},
                                                                            body:JSON.stringify({
                                                                                title:formData.get('title'),
                                                                                description:formData.get('description'),
                                                                                year:formData.get('year'),
                                                                                month:formData.get('month'),
                                                                                day:formData.get('day'),
                                                                                hour:formData.get('hour'),
                                                                                minute:formData.get('minute'),
                                                                                ampm:formData.get('ampm'),
                                                                                keep:formData.get(`keep-${formData.get('id')}`)
                                                                            })
        })
        .then(closeEditAppointmentForm(formData.get('id')))
        .then(getAppointments)
        .catch(err=>console.log(err))
    }

    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        editAppointment(formData)
    }

    function displayEditAppointmentForm(id){
        document.querySelectorAll('.edit-appointment-forms').forEach(event=>event.style.display = 'none')
        document.querySelector(`#edit-appointment-${id}`).style.display = 'block'
        document.querySelectorAll(`.appointment-control-btns`).forEach(event=>event.style.display = 'block')
        document.querySelector(`#appointment-control-btns-${id}`).style.display = 'none'
    }

    function closeEditAppointmentForm(id){
        document.querySelector(`#edit-appointment-${id}`).style.display = 'none'
        document.querySelector(`#appointment-control-btns-${id}`).style.display = 'block'
    }

    function getAppointments(){
        fetch(`${BASE_URL}/api/history`)
            .then(res=>res.json())
            .then(json=>setAppointments(json))
            .catch(err=>console.log(err))
    }
    async function deleteAppointment(id){
        await fetch(`${BASE_URL}/api/appointment/${id}`,{method:'DELETE'})
            .then(getAppointments)
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
            
              <NavbarAdy page='History' />
            
            <h2>History</h2>
            <h2>{today}</h2><br/>

            {appointments.map(appointment=>{
                return(
                    appointment.sequence < todaySequence && appointment.keep && 
                    <div key={appointment._id}>
                                <b>{appointment.month} {appointment.day} {appointment.year} &nbsp;
                                
                                {appointment.hour != '99' && 
                                    <span>
                                        {appointment.hour}:
                                        {appointment.minute < 10 ? '0'+appointment.minute : appointment.minute}
                                        {appointment.ampm}
                                    </span>
                                } 

                                </b>
                                <br/>
                                {appointment.title}<br/>
                                {appointment.description && <>{appointment.description}<br/></>}
                                
                                
                                <form onSubmit={handleSubmit}>

                                    <input  type='hidden' 
                                            name='id'
                                            value={appointment._id} />
                                    <div    className='edit-appointment-forms' 
                                            style={{background:'lightgrey',
                                                    borderRadius:'10px',
                                                    padding:'5px'}}
                                            id={`edit-appointment-${appointment._id}`}>
                                        <span style={{color:'blue'}}>CHANGE TO:</span><br/>

                                        <div style={{display:'flex'}}>
                                            <div style={{display:'flex',gap:'20px'}}>
                                                <label>
                                                    Month:<br/>
                                                    <select name='month' 
                                                            required 
                                                            defaultValue={appointment.month}>
                                                        <option value='' disabled>---</option>
                                                        <option value='Jan'>Jan</option>
                                                        <option value='Feb'>Feb</option>
                                                        <option value='Mar'>Mar</option>
                                                        <option value='Apr'>Apr</option>
                                                        <option value='May'>May</option>
                                                        <option value='Jun'>Jun</option>
                                                        <option value='Jul'>Jul</option>
                                                        <option value='Aug'>Aug</option>
                                                        <option value='Sep'>Sep</option>
                                                        <option value='Oct'>Oct</option>
                                                        <option value='Nov'>Nov</option>
                                                        <option value='Dec'>Dec</option>
                                                    </select>
                                                </label>
                                                
                                                <label>
                                                    Day:<br/>
                                                    <select name='day' 
                                                            required 
                                                            defaultValue={appointment.day}>
                                                        <option value='' disabled>--</option>
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                        <option value='4'>4</option>
                                                        <option value='5'>5</option>
                                                        <option value='6'>6</option>
                                                        <option value='7'>7</option>
                                                        <option value='8'>8</option>
                                                        <option value='9'>9</option>
                                                        <option value='10'>10</option>
                                                        <option value='11'>11</option>
                                                        <option value='12'>12</option>
                                                        <option value='13'>13</option>
                                                        <option value='14'>14</option>
                                                        <option value='15'>15</option>
                                                        <option value='16'>16</option>
                                                        <option value='17'>17</option>
                                                        <option value='18'>18</option>
                                                        <option value='19'>19</option>
                                                        <option value='20'>20</option>
                                                        <option value='21'>21</option>
                                                        <option value='22'>22</option>
                                                        <option value='23'>23</option>
                                                        <option value='24'>24</option>
                                                        <option value='25'>25</option>
                                                        <option value='26'>26</option>
                                                        <option value='27'>27</option>
                                                        <option value='28'>28</option>
                                                        <option value='29'>29</option>
                                                        <option value='30'>30</option>
                                                        <option value='31'>31</option>
                                                    </select>
                                                </label>
                                                
                                                <label>
                                                    Year:<br/>
                                                    <select name='year' 
                                                            required 
                                                            defaultValue={appointment.year}>
                                                        <option value='' disabled>----</option>
                                                        <option value={Date().slice(11,15)}>{Date().slice(11,15)}</option>
                                                        <option value={Number(Date().slice(11,15))+1}>{Number(Date().slice(11,15))+1}</option>
                                                    </select>
                                                </label>

                                            </div>
                                            <div style={{marginLeft:'auto'}}>
                                                <label>
                                                    Time: (optional)<br/>
                                                    <select name='hour' 
                                                            
                                                            defaultValue={appointment.hour}>
                                                        <option value='99'>--</option>
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                        <option value='4'>4</option>
                                                        <option value='5'>5</option>
                                                        <option value='6'>6</option>
                                                        <option value='7'>7</option>
                                                        <option value='8'>8</option>
                                                        <option value='9'>9</option>
                                                        <option value='10'>10</option>
                                                        <option value='11'>11</option>
                                                        <option value='12'>12</option>
                                                    </select>
                                                    :
                                                    <select name='minute' 
                                                            
                                                            defaultValue={appointment.minute < 10 ? `0${appointment.minute}` : appointment.minute}>
                                                        <option value='99' >--</option>
                                                        <option value='00'>00</option>
                                                        <option value='01'>01</option>
                                                        <option value='02'>02</option>
                                                        <option value='03'>03</option>
                                                        <option value='04'>04</option>
                                                        <option value='05'>05</option>
                                                        <option value='06'>06</option>
                                                        <option value='07'>07</option>
                                                        <option value='08'>08</option>
                                                        <option value='09'>09</option>
                                                        <option value='10'>10</option>
                                                        <option value='11'>11</option>
                                                        <option value='12'>12</option>
                                                        <option value='13'>13</option>
                                                        <option value='14'>14</option>
                                                        <option value='15'>15</option>
                                                        <option value='16'>16</option>
                                                        <option value='17'>17</option>
                                                        <option value='18'>18</option>
                                                        <option value='19'>19</option>
                                                        <option value='20'>20</option>
                                                        <option value='21'>21</option>
                                                        <option value='22'>22</option>
                                                        <option value='23'>23</option>
                                                        <option value='24'>24</option>
                                                        <option value='25'>25</option>
                                                        <option value='26'>26</option>
                                                        <option value='27'>27</option>
                                                        <option value='28'>28</option>
                                                        <option value='29'>29</option>
                                                        <option value='30'>30</option>
                                                        <option value='31'>31</option>
                                                        <option value='32'>32</option>
                                                        <option value='33'>33</option>
                                                        <option value='34'>34</option>
                                                        <option value='35'>35</option>
                                                        <option value='36'>36</option>
                                                        <option value='37'>37</option>
                                                        <option value='38'>38</option>
                                                        <option value='39'>39</option>
                                                        <option value='40'>40</option>
                                                        <option value='41'>41</option>
                                                        <option value='42'>42</option>
                                                        <option value='43'>43</option>
                                                        <option value='44'>44</option>
                                                        <option value='45'>45</option>
                                                        <option value='46'>46</option>
                                                        <option value='47'>47</option>
                                                        <option value='48'>48</option>
                                                        <option value='49'>49</option>
                                                        <option value='50'>50</option>
                                                        <option value='51'>51</option>
                                                        <option value='52'>52</option>
                                                        <option value='53'>53</option>
                                                        <option value='54'>54</option>
                                                        <option value='55'>55</option>
                                                        <option value='56'>56</option>
                                                        <option value='57'>57</option>
                                                        <option value='58'>58</option>
                                                        <option value='59'>59</option>
                                                    </select>
                                                </label>

                                                <span>
                                                    <select name='ampm' 
                                                            
                                                            defaultValue={appointment.ampm}>
                                                        <option disabled value=''>am/pm</option>
                                                        <option value='am'>am</option>
                                                        <option value='pm'>pm</option>
                                                    </select>
                                                </span>

                                            </div>
                                        </div>{/* display:flex */}

                                        <br/>


                                        <label>
                                            Title:&nbsp;
                                            <input  type='text' 
                                                    name='title'
                                                    required
                                                    defaultValue={appointment.title}
                                                    style={{border:'1px solid grey',
                                                            paddingLeft:'3px',
                                                            width:'75%'
                                                    }} />
                                        </label><br/>

                                        <br/>
                                        <label>
                                            Description: (optional)
                                            <textarea   name='description' 
                                                        defaultValue={appointment.description}
                                            ></textarea>
                                        </label><br/><br/>

                                        <label>
                                            AFTER this event occurs:<br/>
                                            <input  type='radio' 
                                                    value='keep' 
                                                    name={`keep-${appointment._id}`}
                                                    defaultChecked={appointment.keep}
                                                    style={{cursor:'pointer'}} 
                                                    required /> SAVE it to History for future reference<br/>
                                            <input  type='radio' 
                                                    defaultChecked={!appointment.keep}
                                                    value='delete' 
                                                    style={{cursor:'pointer'}}
                                                    name={`keep-${appointment._id}`} 
                                                    /> DELETE it from History
                                        </label><br/><br/>

                                        <input  type='submit' 
                                                value='UPDATE'
                                                className='event-btn'
                                                onClick={()=>editAppointment()}
                                                style={{background:'green',
                                                        color:'white',
                                                }} />
                                        <span   className='event-btn' 
                                                onClick={()=>closeEditAppointmentForm(appointment._id)}
                                                style={{background:'red',
                                                        color:'white'}}>CANCEL</span>

                                    </div>{/* .edit-appointment-forms */}

                                    <div    className='appointment-control-btns' 
                                            id={`appointment-control-btns-${appointment._id}`}>
                                        <span   style={{background:'red',
                                                        color:'white'}} 
                                                onClick={()=>deleteAppointment(appointment._id)}
                                                className='event-btn'>DELETE</span>
                                        <span   style={{background:'blue',
                                                        color:'white'}} 
                                                onClick={()=>displayEditAppointmentForm(appointment._id)}
                                                className='event-btn'>EDIT</span>
                                    </div>{/* .appointment-control-btns */}                                    
                                </form>
                                <br/><br/>
                            </div>

                        
                )
            })}


















        </div>{/* .adys-phone */}
      </div>{/* .wrapper */}
    </>
  )
}
