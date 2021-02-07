const CovidData = require('../models/CovidData')
require('../db/connectionDb')

const sortCountriesInfection = async () => {
    const data = await CovidData.find({}, {_id: 0, __v: 0}).sort({cases: -1}).limit(10)
    return data
}

module.exports = sortCountriesInfection