const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
    title: {type:String},
    description: {type:String},
    year: {type:Number},
    month: {type:String},
    monthNum: {type:Number},
    day: {type:Number},
    hour: {type:Number},
    minute: {type:Number},
    save: {type:Boolean}
})

MediaSourceHandle.exports = mongoose.model('Appointment', AppointmentSchema)
