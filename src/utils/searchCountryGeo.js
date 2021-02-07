const Country = require('../models/Country')
require('../db/connectionDb')

const searchCountryGeo = async (countryName) => {
    const geo = await Country.find({name: countryName}, {latlng: 1, _id:0})
    return geo[0].latlng
}

module.exports = searchCountryGeo