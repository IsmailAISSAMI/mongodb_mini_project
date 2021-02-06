const request = require('request')
const CovidData = require('../models/CovidData')
require('../db/connectionDb')


const searchCountryData = async (countryName) => {
    try{
        const data = await CovidData.find({country: countryName})
        if(!data){
            throw new Error("The country that you search doesn't exist!")
        }
        return data
    } catch(error){
        throw new Error(error)
    }
}

module.exports = searchCountryData