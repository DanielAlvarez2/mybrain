import { useState, useEffect } from 'react'
import './Ady.css'

export default function Ady() {
    async function createNewNote(formData){
        await fetch(`${BASE_URL}/api/note`, { method:'POST', 
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
            <h2>{Date().slice(0,10)}</h2><br/>
            {notes.map(data=>{
                return(
                <div key={data._id}>
                    {data.note}<br/>
                    <span   onClick={()=>deleteNote(data._id)} 
                            style={{background:'red',
                                    padding:'2px 5px',
                                    color:'white',
                                    borderRadius:'5px',
                                    fontSize:'10px',
                                    cursor:'pointer'}}>DELETE</span>
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
                                style={{width:'100%',height:'100px'}}></textarea>
                </label>

                <input  type='submit' 
                        value='Upload'
                        style={{padding:'5px 15px',
                                background:'blue',
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
