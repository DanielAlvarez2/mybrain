import {useState,useEffect} from 'react'
import './BirthdayDisplay.css'

export default function BirthdayDisplay(props){
 
    function displayBdayEdit(id){
        document.querySelectorAll('.bday-btn-row').forEach(item=>item.style.display = 'block')
        document.querySelectorAll('.bday-edit-forms').forEach(entry=>entry.style.display = 'none')
        document.querySelector(`#bday-edit-form-${id}`).style.display = 'block'
        document.querySelector(`#bday-btn-row-${id}`).style.display = 'none'
    }
    function hideBdayEdit(id){
        document.querySelector(`#bday-edit-form-${id}`).style.display = 'none'
        document.querySelector(`#bday-btn-row-${id}`).style.display = 'block'
    }
    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        props.editBirthday(formData)
        hideBdayEdit(formData.get('id'))
    }
    return(
        <div key={props.bday.id}>
                            <div>
                    
                                <div className='display-bday' style={{display:'flex',gap:'5px'}}>
                                    <span style={{width:'12ch'}}>{props.bday.month} {props.bday.day < 10 && '0'}{props.bday.day} {props.bday.year ? props.bday.year : '------'}</span>
                                    <span>{props.bday.name}</span>
                                </div>{/* .display-bday */}

                                <div    className='bday-edit-forms'
                                        style={{background:'lightgrey',
                                                padding:'3px',
                                                borderRadius:'5px'
                                        }} 
                                        id={`bday-edit-form-${props.bday._id}`}>
                                    <span style={{color:'blue'}}>CHANGE TO:</span><br/>
                                    <form onSubmit={handleSubmit} >
                                        <input type='hidden' name='id' value={props.bday._id} />
                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <label>
                                                    Month:<br/>
                                                    <select defaultValue={props.bday.month} 
                                                            name='month' 
                                                            required>
                                                        <option value='' disabled>Select...</option>
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
                                                    <select defaultValue={props.bday.day} name='day' required>
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
                                                    <input  type='number'
                                                            defaultValue={props.bday.year} 
                                                            name='year'
                                                            style={{padding:'0 2px'}}
                                                            min='1900' 
                                                            max={new Date().getFullYear()} />
                                                    <br/>
                                                    <span style={{fontSize:'11px'}}>(optional)</span>
                                                </label>

                                                <label>
                                                    Name:<br/>
                                                    <input  type='text' 
                                                            name='name' 
                                                            defaultValue={props.bday.name}
                                                            style={{width:'140px',padding:'0 2px'}}
                                                            required />
                                                </label>
                                        </div>
                                        <input  type='submit' 
                                                value='UPDATE'
                                                style={{background:'green',color:'white'}}
                                                className='bday-btn' />
                                        <span   className='bday-btn' 
                                                onClick={()=>hideBdayEdit(props.bday._id)}
                                                style={{background:'red',
                                                        color:'white'}}>CANCEL</span>
                                    </form>
                                </div>{/* .bday-edit-forms */}
 
                                <div className='bday-btn-row' id={`bday-btn-row-${props.bday._id}`}>
                                    <span   className='bday-btn'
                                            onClick={()=>props.deleteBday(props.bday._id)} 
                                            style={{color:'white', 
                                                    background:'red'
                                    }} >DELETE</span>
                                    <span   className='bday-btn'
                                            onClick={()=>displayBdayEdit(props.bday._id)}
                                            style={{color:'white',
                                                    background:'blue'
                                            }}
                                    >UPDATE</span>
                                </div>{/* .bday-btn-row */}
                                <br/><br/>
                            </div>
            
        </div>
    )
}