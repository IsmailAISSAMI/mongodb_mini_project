const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getCountries = require('./utils/getCountries')
const getCovidData = require('./utils/getCovidData')
const searchCountryData = require('./utils/searchCountryData')



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

app.get('', async (req,res)=>{
    await Promise.all([getCountries(), getCovidData()])
    res.render('home')
})

app.get('/country', async(req, res) => {
    searchCountryData(req.query.CountryName).then((result)=>{
        res.render('country', {result})
    }).catch((error)=>{
        res.render('error', {error})
    })
    
})

app.listen(port, ()=>{
    console.log(">> Server is up at the port " + port)
})