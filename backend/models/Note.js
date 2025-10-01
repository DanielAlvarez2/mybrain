const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    note:{type:String}
},{timestamps:true})

module.exports = mongoose.model('Note', NoteSchema)