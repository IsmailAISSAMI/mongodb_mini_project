const request = require('request')
const CovidData = require('../models/CovidData')
require('../db/connectionDb')

const createCollection= async (body)=> {
    try {
        await body.forEach((country)=>{
            const c = new CovidData({
                country: country.country,
                cases: country.cases,
                todayCases:country.todayCases,
                deaths: country.deaths,
                todayDeaths:country.todayCases,
                recovered: country.recovered,
                todayRecovered:country.todayRecovered,
                active: country.active,
                critical: country.critical
            })
            c.save().then((result)=>{
                console.log("\n>>>> Covid - Countries +1")
                console.log(result)
            }).catch((e)=>{
                console.log("ERROR: ", e)
            })                    
        })
    } catch(e) {
        console.log(e)
    }
}

const getCovidData = () => {
    // This API provides a big range of detailed information about multiple viruses like COVID19.
    const url = 'https://disease.sh/v3/covid-19/countries'

    request( {url, json: true}, async (error, {body})=>{
        if(error){
            console.log('Unable to connect to disease.sh API !')
        } else {
            // Check if there is no documents in - countries - collection 
            const document = await CovidData.findOne({}).exec()
            if(!document){
                createCollection(body)
            } else {
                CovidData.collection.drop()
                console.log('collection is droped!')
                createCollection(body)
            }
        }
    })
}

module.exports =  getCovidData 
