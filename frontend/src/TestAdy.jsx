import { useState, useEffect } from 'react'
import './Appointments.css'
import NavbarAdy from './components/NavbarAdy.jsx'

export default function Ady() {

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

    async function createNewAppointment(formData){
        await fetch(`${BASE_URL}/api/appointment`,{ method:'POST', 
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
                                                        keep:formData.get('keep'),
                                                        eventType:formData.get('event-type')
        })})
        .then(getAppointments)
        .then(alert('Appointment Created'))
        .catch(err=>console.log(err))
    }

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
                                                                                keep:formData.get(`keep-${formData.get('id')}`),
                                                                                eventType:formData.get(`event-type-${formData.get('id')}`)
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
        fetch(`${BASE_URL}/api/appointments`)
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
            
              <NavbarAdy page='Appointments' />
            
            <h2>Appointments</h2>
            <h2>{today}</h2><br/>

            {appointments.map(appointment=>{
                return(
                    appointment.sequence >= todaySequence && 
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
                                {appointment.eventType == 'recurring' && 'save as RECURRING'}
                                {appointment.eventType == 'history' && 'save in HISTORY'}
                                {appointment.eventType == 'delete' && 'DELETE'}
                                <br/>
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
                                                        <option value=''>am/pm</option>
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
                                            Description: (optional)<br/>
                                            <textarea   name='description'
                                                        rows='5'
                                                        style={{width:'100%'}} 
                                                        defaultValue={appointment.description}
                                            ></textarea>
                                        </label><br/><br/>

                                        <label>
                                            AFTER this event occurs:<br/>
                                            &nbsp;
                                            <input  type='radio'
                                                    value='recurring'
                                                    name={`event-type-${appointment._id}`}
                                                    defaultChecked={appointment.eventType == 'recurring'}
                                                    style={{cursor:'pointer'}} 
                                                    /> &nbsp;save as RECURRING<br/>

                                            &nbsp;
                                            <input  type='radio' 
                                                    value='history' 
                                                    name={`event-type-${appointment._id}`}
                                                    defaultChecked={appointment.eventType == 'history'}
                                                    style={{cursor:'pointer'}} 
                                                    /> &nbsp;save to HISTORY<br/>
                                            &nbsp;
                                            <input  type='radio' 
                                                    defaultChecked={appointment.eventType == 'delete'}
                                                    value='delete' 
                                                    style={{cursor:'pointer'}}
                                                    name={`event-type-${appointment._id}`} 
                                                    /> &nbsp;DELETE it<br/>
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
















            <form   action={createNewAppointment} 
                    style={{background:'lightgrey',
                            borderRadius:'10px',
                            padding:'5px'}} >
                <h3>Add a New Appointment</h3>
                <br/>
                
                <label>
                    Title:&nbsp;
                    <input  type='text' 
                            name='title'
                            required
                            style={{border:'1px solid grey',
                                    paddingLeft:'3px',
                                    width:'75%'
                            }} />
                </label><br/><br/>
                
                <div style={{display:'flex'}}>
                    <div style={{display:'flex',gap:'20px'}}>
                        <label>
                            Month:<br/>
                            <select name='month' required defaultValue=''>
                                <option value='' disabled>---</option>
                                <option>Jan</option>
                                <option>Feb</option>
                                <option>Mar</option>
                                <option>Apr</option>
                                <option>May</option>
                                <option>Jun</option>
                                <option>Jul</option>
                                <option>Aug</option>
                                <option>Sep</option>
                                <option>Oct</option>
                                <option>Nov</option>
                                <option>Dec</option>
                            </select>
                        </label>
                        
                        <label>
                            Day:<br/>
                            <select name='day' required defaultValue=''>
                                <option value='' disabled>--</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                <option>24</option>
                                <option>25</option>
                                <option>26</option>
                                <option>27</option>
                                <option>28</option>
                                <option>29</option>
                                <option>30</option>
                                <option>31</option>
                            </select>
                        </label>
                        
                        <label>
                            Year:<br/>
                            <select name='year' required defaultValue=''>
                                <option value='' disabled>----</option>
                                <option>{Date().slice(11,15)}</option>
                                <option>{Number(Date().slice(11,15))+1}</option>
                            </select>
                        </label>

                    </div>
                    <div style={{marginLeft:'auto'}}>
                        <label>
                            Time: (optional)<br/>
                            <select name='hour' 
                                    
                                    defaultValue='99'>
                                <option value='99'>--</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </select>
                            :
                            <select name='minute' defaultValue='99'>
                                <option value='99'>--</option>
                                <option>00</option>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                <option>04</option>
                                <option>05</option>
                                <option>06</option>
                                <option>07</option>
                                <option>08</option>
                                <option>09</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                <option>24</option>
                                <option>25</option>
                                <option>26</option>
                                <option>27</option>
                                <option>28</option>
                                <option>29</option>
                                <option>30</option>
                                <option>31</option>
                                <option>32</option>
                                <option>33</option>
                                <option>34</option>
                                <option>35</option>
                                <option>36</option>
                                <option>37</option>
                                <option>38</option>
                                <option>39</option>
                                <option>40</option>
                                <option>41</option>
                                <option>42</option>
                                <option>43</option>
                                <option>44</option>
                                <option>45</option>
                                <option>46</option>
                                <option>47</option>
                                <option>48</option>
                                <option>49</option>
                                <option>50</option>
                                <option>51</option>
                                <option>52</option>
                                <option>53</option>
                                <option>54</option>
                                <option>55</option>
                                <option>56</option>
                                <option>57</option>
                                <option>58</option>
                                <option>59</option>
                            </select>
                        </label>

                        <span>
                            <select name='ampm' defaultValue=''>
                                <option disabled value=''>am/pm</option>
                                <option>am</option>
                                <option>pm</option>
                            </select>
                        </span>

                    </div>
                </div>{/* display:flex */}

                <br/>
                <label>
                    Description: (optional)<br/>
                    <textarea   name='description'
                                rows='5'
                                style={{width:'100%'}} 
                    ></textarea>
                </label><br/><br/>

                <label>
                    AFTER this event occurs:<br/>

                    &nbsp;
                    <input  type='radio'
                            value='recurring'
                            name='event-type'
                            style={{cursor:'pointer'}} /> save as RECURRING<br/>
                    
                    &nbsp;
                    <input  type='radio' 
                            value='history' 
                            name='event-type'
                            style={{cursor:'pointer'}} 
                            required /> save in HISTORY<br/>

                    &nbsp;
                    <input  type='radio' 
                            value='delete' 
                            style={{cursor:'pointer'}}
                            name='event-type' /> DELETE it<br/>

                </label><br/><br/>

                <input  type='submit' 
                        value='Upload'
                        style={{padding:'5px 15px',
                                background:'green',
                                color:'white',
                                cursor:'pointer',
                                border:'none',
                                fontSize:'20px',
                                borderRadius:'5px'
                        }} />
            </form>


        </div>{/* .adys-phone */}
      </div>{/* .wrapper */}
    </>
  )
}
