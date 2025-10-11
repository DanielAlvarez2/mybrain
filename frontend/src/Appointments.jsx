import { useState, useEffect } from 'react'
import './Appointments.css'
import NavbarAdy from './components/NavbarAdy.jsx'

export default function Appointments() {

    function createNewAppointment(){

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
            
            <h2>{Date().slice(0,10)}</h2><br/>

            <form action={createNewAppointment}>
                Add a New Appointment:<br/><br/>
                
                <label>
                    Title:<br/>
                    <input  type='text' 
                            name='title'
                            required
                            style={{border:'1px solid grey',
                                    paddingLeft:'3px'
                            }} />
                </label><br/><br/>
                
                <div style={{display:'flex'}}>
                    <label>
                        Month:<br/>
                        <select required defaultValue=''>
                            <option value='' disabled>Select...</option>
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
                        <select required defaultValue=''>
                            <option value='' disabled>Select...</option>
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
                        <select required defaultValue=''>
                            <option value='' disabled>Select...</option>
                            <option>{Date().slice(11,15)}</option>
                            <option>{Number(Date().slice(11,15))+1}</option>
                        </select>
                    </label>

                    <label>
                        Time:<br/>
                        <input  type='text' 
                                size='1' 
                                required
                                maxLength={2}
                                style={{textAlign:'right',width:'3ch'}} />
                        :
                        <input  type='text'
                                maxLength={2}
                                required
                                style={{textAlign:'left',width:'3ch'}} 
                                size='1' />
                    </label>

                    <div><br/>
                        <select required defaultValue=''>
                            <option disabled value=''>am/pm</option>
                            <option>am</option>
                            <option>pm</option>
                        </select>
                    </div>
                </div>

                <br/>
                <label>
                    Description: (optional)
                    <textarea   name='description' 
                    ></textarea>
                </label>

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
