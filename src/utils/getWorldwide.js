const request = require('request')
const Worldwide = require('../models/Worldwide')
require('../db/connectionDb')

const createCollection= async (body)=> {
    try {
        await Worldwide({
                cases: body.cases,
                todayCases:body.todayCases,
                deaths: body.deaths,
                todayDeaths:body.todayCases,
                recovered: body.recovered,
                todayRecovered:body.todayRecovered,
                active: body.active,
                critical: body.critical,
                casesPerOneMillion:body.casesPerOneMillion,
                deathsPerOneMillion:body.deathsPerOneMillion,
                activePerOneMillion:body.activePerOneMillion,
                recoveredPerOneMillion:body.recoveredPerOneMillion,
                criticalPerOneMillion:body.criticalPerOneMillion,
        })
        .save()
        .then((result)=>{
            console.log("\n++++ The global COVID-19 totals for today")
            console.log(result)
        })
        .catch((e)=>{
            console.log("----ERROR: ", e)
        })                    
    } catch(e) {
        console.log("----ERROR: ",e)
    }
}

const getWorldwide = () => {
    // Get global COVID-19 totals for today 
    const url = 'https://disease.sh/v3/covid-19/all'

    request( {url, json: true}, async (error, {body})=>{
        if(error){
            return console.log('Unable to connect to disease.sh API (Worldwide)!')
        } else {
            // Check if there is no documents in - countries - collection 
            const document = await Worldwide.findOne({}).exec()
            if(!document){
                createCollection(body)
            } else {
                Worldwide.collection.drop()
                console.log('Worldwide collection is droped!')
                createCollection(body)
            }
        }
    })
}

module.exports =  getWorldwide 
