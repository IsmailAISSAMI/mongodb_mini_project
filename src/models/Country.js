const mongoose = require("mongoose")

const countryShema = mongoose.Schema({
    name:{
        type: String, 
        required: true, 
        trim: true
    }, 
    population:{
        type: Number,
        required: false
    }, 
    latlng:{
        type: [Number, Number], 
        default: undefined
    }
})

const Country = mongoose.model('Country', countryShema)

module.exports = Country