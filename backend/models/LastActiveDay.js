const mongoose = require('mongoose')

const LastActiveDaySchema = new mongoose.Schema({
    day:{type:String,
        unique:true}
},{timestamps:true})

module.exports = mongoose.model('LastActiveDay', LastActiveDaySchema) 