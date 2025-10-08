const mongoose = require('mongoose')

const BirthdaySchema = new mongoose.Schema({
    name: {type:String},
    month: {type:String},
    monthNum: {type:Number},
    day: {type:Number},
    year: {type:Number}
})

module.exports = mongoose.model('Birthday', BirthdaySchema)