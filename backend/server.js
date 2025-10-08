const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Note = require('./models/Note.js')
const Birthday = require('./models/Birthday.js')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

console.log('');
(async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database Connected')
    }catch(err){
        console.log(err)
    }
})()

app.post('/api/birthday', async(req,res)=>{
    try{
        await Birthday.create({
            name:req.body.name,
            month:req.body.month,
            day:req.body.day,
            year:req.body.year
        })
        console.log('Birthday Added to Database')
        res.json('Birthday Added to Database')
    }catch(err){
        console.log(err)
    }
})
app.delete('/api/birthday/:id', async(req,res)=>{
    try{
        await Birthday.findByIdAndDelete(req.params.id)
        console.log('Birthday Deleted from Database')
        res.json('Birthday Deleted from Database')
    }catch(err){
        console.log(err)
    }
})
app.get('/api/birthday', async(req,res)=>{
    try{
        const allBirthdays = await Birthday.find()
        res.json(allBirthdays)
    }catch(err){
        console.log(err)
    }
})
app.get('/api/birthday/:id', async(req,res)=>{
    try{
        const birthday = await Birthday.findById(req.params.id)
        console.log(birthday)
        res.json(birthday)
    }catch(err){
        console.log(err)
    }
})
app.put('/api/birthday/:id', async(req,res)=>{
    try{
        await Birthday.findByIdAndUpdate({_id:req.params.id},{
                                                                name: req.body.name,
                                                                month: req.body.month,
                                                                day: req.body.day,
                                                                year: req.body.year
        })
    }catch(err){
        console.log(err)
    }
})
app.post('/api/note', async(req,res)=>{
    try{
        await Note.create({
            note:req.body.note
        })
        console.log('Note Added to Database')
        res.json('Note Added to Database')
    }catch(err){
        console.log(err)
    }
})
app.delete('/api/note/:id', async(req,res)=>{
    try{
        await Note.findByIdAndDelete(req.params.id)
        console.log('Note Deleted from Database')
        res.json('Note Deleted from Database')
    }catch(err){
        console.log(err)
    }
})
app.get('/api/note', async(req,res)=>{
    try{
        const allNotes = await Note.find()
        res.json(allNotes)
    }catch(err){
        console.log(err)
    }
})
app.get('/api/note/:id', async(req,res)=>{
    try{
        const note = await Note.findById(req.params.id)
        console.log(note)
        res.json(note)
    }catch(err){
        console.log(err)
    }
})
app.put('/api/note/:id', async(req,res)=>{
    try{
        await Note.findByIdAndUpdate({_id:req.params.id},{note:req.body.note})
        console.log('Note Updated in Database')
        res.json('Note Updated in Database')
    }catch(err){
        console.log(err)
    }
})
const PORT = process.env.PORT || 1111
app.listen(PORT, ()=> console.log(`Server Listening on Port: ${PORT}`))

