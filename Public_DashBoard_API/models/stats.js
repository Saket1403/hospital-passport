const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Country: {type:String, required:true},
    State: {type: String, required:true},
    District: {type: String, required:true},
    Area: {type: String, required:true},
    Landmark:{type: String, required:true},

},  { collection: 'Publicdatabase'}
)

module.exports = mongoose.model('Profile', profileSchema)