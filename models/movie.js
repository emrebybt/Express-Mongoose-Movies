const mongoose = require('mongoose');

const Schema = mongoose.Schema

const MovieSchema = new Schema({
    filmadi: String,
    yonetmen: String,
    oyuncular: String,
    imageUrl: String,
    turId: {
        type: Schema.Types.ObjectId,
        ref: 'genre'
    } 
})

module.exports = mongoose.model('movie', MovieSchema)