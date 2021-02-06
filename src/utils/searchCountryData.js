const CovidData = require('../models/CovidData')
require('../db/connectionDb')


const searchCountryData = async (countryName) => {
    const data = await CovidData.find({country: countryName}, {_id: 0, __v: 0})
    return data
}

module.exports = searchCountryData