const mongoose = require('mongoose');

const Schema = mongoose.Schema

const GenreSchema = new Schema({
    turAdi: String,
    aciklama: String,
    filmler: [{
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }]
})
module.exports = mongoose.model('genre', GenreSchema)