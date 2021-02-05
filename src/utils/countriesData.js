const { Mongoose } = require('mongoose')
const request = require('request')
const Country = require('../models/Country')
require('../db/connectionDb')

// This function saves the name of a country, the population and it's geolocation in the database 
// If we already have all this information in our database we do nothing
const countriesData = () => {
    const url = 'https://restcountries.eu/rest/v2/all'
    request({url, json: true}, async (error, {body})=>{
        if(error){
            console.log('Unable to connect to the REST API coutries!')
        } else {
            console.log('REST API coutries results are available!')
            
            // Check if there is no documents in countries collection 
            const document = await Country.findOne({}).exec()
            if(!document){
                const countries = Array.from(body)
                try {
                    await countries.forEach((country)=>{
                        const c = new Country({
                            name: country.name,
                            population: country.population,
                            latlng: country.latlng
                        })
                        c.save().then((result)=>{
                            console.log("A new country is added to database!")
                        }).catch((e)=>{
                            console.log("ERROR: ", e)
                        })                    
                    })
                    
                } catch(e) {
                    console.log(e)
                }
            } else {
                console.log('The -countries- collection has been added already!')
            }
            
        }
    })
}

module.exports = countriesData