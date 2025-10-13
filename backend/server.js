const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Note = require('./models/Note.js')
const Birthday = require('./models/Birthday.js')
const Appointment = require('./models/Appointment.js')

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
app.post('/api/appointment', async(req,res)=>{
    try{
        let monthNum;
        if (req.body.month == 'Jan'){monthNum = 1
        }else if(req.body.month == 'Feb'){monthNum=2
        }else if(req.body.month == 'Mar'){monthNum=3
        }else if(req.body.month == 'Apr'){monthNum=4
        }else if(req.body.month == 'May'){monthNum=5
        }else if(req.body.month == 'Jun'){monthNum=6
        }else if(req.body.month == 'Jul'){monthNum=7
        }else if(req.body.month == 'Aug'){monthNum=8
        }else if(req.body.month == 'Sep'){monthNum=9
        }else if(req.body.month == 'Oct'){monthNum=10
        }else if(req.body.month == 'Nov'){monthNum=11
        }else if(req.body.month == 'Dec'){monthNum=12}

        let militaryHour = req.body.hour
        if(militaryHour == '12' && req.body.ampm == 'am') {
            militaryHour = 0
        }else if(req.body.ampm == 'pm') {
            militaryHour = Number(militaryHour) + 12
        }

        let sequence;
        let sequenceYear = req.body.year
        let sequenceMonth = monthNum
        let sequenceDay = req.body.day
        let sequenceHour = militaryHour
        let sequenceMinute = req.body.minute
        if (monthNum < 10) sequenceMonth = '0' + monthNum
        if (sequenceDay < 10) sequenceDay = '0' + sequenceDay
        if (sequenceHour < 10) sequenceHour = '0' + sequenceHour
        if (sequenceMinute < 10) sequenceMinute = '0' + sequenceMinute
        sequence = sequenceYear + sequenceMonth + sequenceDay + sequenceHour + sequenceMinute

        await Appointment.create({
            title:req.body.title,
            description:req.body.description,
            year:req.body.year,
            month:req.body.month,
            monthNum,
            day:req.body.day,
            hour:req.body.hour,
            militaryHour,
            minute:req.body.minute,
            ampm:req.body.ampm,
            keep:req.body.keep == 'keep' ? true : false,
            sequence
        })
        console.log('Appointment Created')
        res.json('Appointment Created')
    }catch(err){
        console.log(err)
    }
})
app.get('/api/appointments', async(req,res)=>{
    try{
        const allAppointments = await Appointment.find().sort({sequence:1})
        console.log('Get All Birthdays')
        res.json(allAppointments)
    }catch(err){
        console.log(err)
    }
})
app.post('/api/birthday', async(req,res)=>{
    try{
        let monthNum;
        if (req.body.month == 'Jan'){monthNum = 1
        }else if(req.body.month == 'Feb'){monthNum=2
        }else if(req.body.month == 'Mar'){monthNum=3
        }else if(req.body.month == 'Apr'){monthNum=4
        }else if(req.body.month == 'May'){monthNum=5
        }else if(req.body.month == 'Jun'){monthNum=6
        }else if(req.body.month == 'Jul'){monthNum=7
        }else if(req.body.month == 'Aug'){monthNum=8
        }else if(req.body.month == 'Sep'){monthNum=9
        }else if(req.body.month == 'Oct'){monthNum=10
        }else if(req.body.month == 'Nov'){monthNum=11
        }else if(req.body.month == 'Dec'){monthNum=12}

        await Birthday.create({
            name:req.body.name,
            month:req.body.month,
            monthNum,
            day:Number(req.body.day),
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
        const allBirthdays = await Birthday.find().sort({monthNum:1, day:1})
        console.log('Get All Birthdays')
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

