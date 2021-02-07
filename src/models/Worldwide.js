const mongoose = require("mongoose")

const worldwideShema = mongoose.Schema({ 
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
    },
    casesPerOneMillion: {
        type: Number
    },
    deathsPerOneMillion: {
        type: Number
    },
    activePerOneMillion: {
        type: Number
    },
    recoveredPerOneMillion: {
        type: Number
    },
    criticalPerOneMillion: {
        type: Number
    }
})

const Worldwide = mongoose.model('Worldwide', worldwideShema)

module.exports = Worldwide