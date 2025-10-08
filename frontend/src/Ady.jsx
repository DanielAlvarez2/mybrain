import { useState, useEffect } from 'react'
import './Ady.css'
import NavbarAdy from './components/NavbarAdy.jsx'

export default function Ady() {
    async function createNewNote(formData){
        await fetch(`${BASE_URL}/api/note`, {   method:'POST', 
                                                headers:{'Content-Type':'application/json'},
                                                body: JSON.stringify({
                                                    note: formData.get('note')
                                                })
                })
                .then(getNotes)
                .catch(err=>console.log(err))
    }

    async function deleteNote(id){
        await fetch(`${BASE_URL}/api/note/${id}`, {method:'DELETE'})
                .then(getNotes)
                .catch(err=>console.log(err))
    }

  const BASE_URL =  (process.env.NODE_ENV == 'production') ? 
                    'https://mybrain-8bpo.onrender.com' :
                    'http://localhost:1111'

  const [notes, setNotes] = useState([])

  const getNotes = ()=>{
    fetch(`${BASE_URL}/api/note`)
      .then(res=>res.json())
      .then(json=>setNotes(json))
      .catch(err=>console.log(err))
  }

  useEffect(()=>getNotes(),[])

  function displayEdit(id){
    document.querySelectorAll('.note-buttons').forEach(item=>item.style.display = 'block')
    document.querySelectorAll('.edit-item').forEach(item=>item.style.display = 'none')
    document.querySelector(`#edit-${id}`).style.display = 'block'
    document.querySelector(`#buttons-${id}`).style.display = 'none'
  }
  function cancelEdit(){
    document.querySelectorAll('.edit-item').forEach(item=>item.style.display = 'none')
    document.querySelectorAll('.note-buttons').forEach(item=>item.style.display = 'block')
  }
  async function updateNote(formData){
    await fetch(`${BASE_URL}/api/note/${formData.get('id')}`,
                {   method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify({note: formData.get('note-update')})})
            .then(document.querySelectorAll('.edit-item').forEach(item=>item.style.display = 'none'))
            .then(document.querySelectorAll('.note-buttons').forEach(item=>item.style.display = 'block'))
            .then(getNotes)
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
            
            <h2>{Date().slice(0,10)}</h2><br/>
            {
                Date().slice(0,3) == 'Sat' || Date().slice(0,3) == 'Sun' && 
                    <>
                    <div style={{background:'red',color:'white',textAlign:'center'}}>
                        The girls do NOT have school today
                    </div><br/>
                    </>
          }

            {notes.map(data=>{
                return(
                <div key={data._id}>
                    {data.note}<br/>

                    <div className='edit-item' id={`edit-${data._id}`}>
                        <span style={{color:'blue'}}>CHANGE TO:</span><br/>
                        <form action={updateNote}>
                            <input type='hidden' name='id' value={data._id} />
                            <textarea name='note-update' defaultValue={data.note}></textarea>
                            <input  type='submit'
                                    value='UPDATE'
                                    style={{background:'green',color:'white'}} 
                                    className='note-btn' />
                            <span   className='note-btn'
                                    onClick={cancelEdit} 
                                    style={{background:'red',color:'white'}}>CANCEL</span>
                        </form>
                    </div>
                    <div id={`buttons-${data._id}`} className='note-buttons'>
                        <span   className='note-btn' 
                                onClick={()=>displayEdit(`${data._id}`)}
                                style={{background:'blue',color:'white'}}
                                >EDIT</span>
                        
                        <span   onClick={()=>deleteNote(data._id)} 
                                className='note-btn'
                                style={{background:'red',
                                        color:'white'
                                        }}>DELETE</span>    
                    </div>
                    <br/><br/>
                </div>
                )
            })}
            <hr/>
            <br/>
            <form action={createNewNote}>
                <label>
                    Add a New Note:<br/>
                    <textarea   name='note' 
                                required
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
