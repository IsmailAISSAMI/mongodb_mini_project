const Worldwide = require('../models/Worldwide')
require('../db/connectionDb')

const searchWorldwide= async ()=> {
    const data = await Worldwide.find({}, {_id: 0, __v:0})
    return data[0]           
}

module.exports =  searchWorldwide 
