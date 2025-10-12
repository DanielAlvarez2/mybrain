const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
    title: {type:String},
    description: {type:String},
    year: {type:Number},
    month: {type:String},
    monthNum: {type:Number},
    day: {type:Number},
    hour: {type:Number},
    militaryHour: {type:Number},
    minute: {type:Number},
    ampm:{type:String},
    keep: {type:Boolean}
})

module.exports = mongoose.model('Appointment', AppointmentSchema)
