import './Birthdays.css'

export default function Birthdays(){
    return (
        <>
            <div className='wrapper'>
                <div className='adys-phone'>
                    <h1 style={{display:'flex',
                                alignItems:'center',
                                justifyContent:'center'}}>
                        <img src='./brain.jpeg' width='60px' />
                        <span>MYbrain</span>
                    </h1>
                    <hr/><br/>     
                    <h2>Birthdays</h2>
                    <br/>
                    <div id='bday-form' style={{background:'lightgrey',
                                                borderRadius:'10px',
                                                padding:'5px'}}>
                        <h3>Add a New Birthday</h3><br/>
                        <form>
                            
                            <div style={{display:'flex',justifyContent:'space-between'}} id='bday-flexbox'>
                                <label>
                                    Name:<br/>
                                    <input type='text' required />
                                </label>

                                <label>
                                    Month:<br/>
                                    <select defaultValue='' required>
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
                                <br/>
                                <label>
                                    Day:<br/>
                                    <select defaultValue='' required>
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
                                </label><br/>
                                <label>
                                    Year:<br/>
                                    <input type='number' min='1900' max={new Date().getFullYear()} />
                                    <br/>
                                    <span style={{fontSize:'11px'}}>(optional)</span>
                                </label>

                            </div>{/* #bday-flexbox */}

                            

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
                    
                    </div>{/* #bday-form */}
                </div>{/* .adys-phone */}
            </div>{/* .wrapper */}
        </>
    )
}