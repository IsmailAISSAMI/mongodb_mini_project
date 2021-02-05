const path = require('path')
const express = require('express')
const hbs = require('hbs')
const countriesData = require('./utils/countriesData')

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

app.get('', (req,res)=>{
    res.render('home')
})

app.get('/worldwide', async(req, res) => {
    await countriesData()
})

app.listen(port, ()=>{
    console.log(">> Server is up at the port " + port)
})