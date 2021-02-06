const mongoose = require("mongoose")

const casesShema = mongoose.Schema({
    country:{
        type: String, 
        trim: true
    }, 
    cases:{
        type: Number
    }, 
    todayCases:{
        type: Number
    },
    deaths:{
        type: Number
    },
    todayDeaths:{
        type: Number
    },
    recovered:{
        type: Number
    },
    todayRecovered:{
        type: Number
    },
    active:{
        type: Number
    },
    critical:{
        type: Number
    }
})

const CovidData = mongoose.model('CovidData', casesShema)

module.exports = CovidData