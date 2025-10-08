const mongoose = require('mongoose')

const BirthdaySchema = new mongoose.Schema({
    name: {type:String},
    month: {type:String},
    day: {type:String},
    year: {type:Number}
})

module.exports = mongoose.model('Birthday', BirthdaySchema)