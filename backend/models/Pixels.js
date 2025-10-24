const mongoose = require('mongoose')

const PixelsSchema = new mongoose.Schema({
    pixels:{type:Number}
})

module.exports = mongoose.model('Pixels', PixelsSchema) 