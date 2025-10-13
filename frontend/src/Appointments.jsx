import { useState, useEffect } from 'react'
import './Appointments.css'
import NavbarAdy from './components/NavbarAdy.jsx'

export default function Appointments() {

    const BASE_URL =    (process.env.NODE_ENV == 'production') ? 
                        'https://mybrain-8bpo.onrender.com' :
                        'http://localhost:1111'

    const [appointments, setAppointments] = useState([])
    useEffect(()=>getAppointments(),[])

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
                                                        keep:formData.get('keep')
        })})
        .then(alert('Appointment Created'))
        .catch(err=>console.log(err))
    }

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
            
              <NavbarAdy />
            
            <h2>Appointments</h2>
            <h2>{Date().slice(0,10)}</h2><br/>

            {appointments.map(appointment=>{
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

            <form action={createNewAppointment}>
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
                            Time:<br/>
                            <select name='hour' 
                                    required 
                                    defaultValue=''>
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
                            </select>
                            :
                            <select name='minute' required defaultValue=''>
                                <option value='' disabled>--</option>
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
                            <select name='ampm' required defaultValue=''>
                                <option disabled value=''>am/pm</option>
                                <option>am</option>
                                <option>pm</option>
                            </select>
                        </span>

                    </div>
                </div>{/* display:flex */}

                <br/>
                <label>
                    Description: (optional)
                    <textarea   name='description' 
                    ></textarea>
                </label><br/><br/>

                <label>
                    AFTER this event occurs:<br/>
                    <input  type='radio' 
                            value='keep' 
                            name='keep'
                            style={{cursor:'pointer'}} 
                            required /> SAVE it to History for future reference<br/>
                    <input  type='radio' 
                            value='delete' 
                            style={{cursor:'pointer'}}
                            name='keep' /> DELETE it from History
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
