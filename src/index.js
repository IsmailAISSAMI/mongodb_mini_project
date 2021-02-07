const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getCountries = require('./utils/getCountries')
const getCovidData = require('./utils/getCovidData')
const searchCountryData = require('./utils/searchCountryData')
const searchCountryGeo = require('./utils/searchCountryGeo')
const getWorldwide = require('./utils/getWorldwide')
const searchWorldwide = require('./utils/searchWorldwide')



const app = express()
const port = process.env.PORT || 3000

// Set up paths 
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDir))
app.set('views', viewsDir)
app.set('view engine', 'hbs')

hbs.registerPartials(partialsDir)

// Set countries geo, and covid data (in the world and by countries) then return Home page 
app.get('', async (req,res)=>{
    await Promise.all([getCountries(), getCovidData(), getWorldwide()])
    return res.render('home')
})

// Search by coutry name form
app.get('/country', async(req, res) => {
    try{
        var result = await searchCountryData(req.query.CountryName)
        var geo = await searchCountryGeo(req.query.CountryName)
        if(result.length == 0 || geo.length == 0){
            return res.render('error', {"error": "The country that you search doesn't exist!"})
        }

        result = result[0]
        return res.render('country', {
            country: result.country,
            cases:result.cases,
            todayCases:result.todayCases,
            deaths:result.deaths,
            todayDeaths:result.todayDeaths,
            recovered:result.recovered,
            todayRecovered:result.todayRecovered,
            active:result.active,
            critical:result.critical,
            lat: geo[0],
            lng: geo[1]
        })
    } catch(error){
        return res.render('error', {error})
    }  
})

// Return Worldwide data 
app.get('/worldwide', async (req,res)=>{
    try{
        var result = await searchWorldwide()
        console.log('>>>>worldwide result ', result)
        // if(!result["cases"]){
        //     return res.render('error', {"error": "The country that you search doesn't exist!"})
        // }
        return res.render('worldwide', {
            cases: result.cases,
            todayCases:result.todayCases,
            deaths: result.deaths,
            todayDeaths:result.todayCases,
            recovered: result.recovered,
            todayRecovered:result.todayRecovered,
            active: result.active,
            critical: result.critical,
            casesPerOneMillion:result.casesPerOneMillion,
            deathsPerOneMillion:result.deathsPerOneMillion,
            activePerOneMillion:result.activePerOneMillion,
            recoveredPerOneMillion:result.recoveredPerOneMillion,
            criticalPerOneMillion:result.criticalPerOneMillion,
        
        })
    } catch(error){
        return res.render('error', {error})
    } 
})

// Start server at port 3000 locally
app.listen(port, ()=>{
    console.log(">> Server is up at the port " + port)
})