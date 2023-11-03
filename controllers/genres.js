const express = require('express')

const Genre = require('../models/genre')

exports.GetGenres = (req, res, next) => {
    Genre.find()
    .then(genres => {
        res.render('genreList', {
            title: 'Genre List',
            genres: genres
        })
    })
}

exports.getAddGenre = (req, res, next) => {
    res.render('addGenre', {
        title: 'Film Türü Ekle'
    })
}

exports.postAddGenre = (req, res, next) => {
    const turAdi = req.body.turAdi;
    const aciklama = req.body.aciklama;

    const genre = new Genre({
        turAdi: turAdi,
        aciklama: aciklama,
    })

    genre.save()
    .then(() => {
        console.log(genre);
        res.redirect('/genres/list');
    }).catch((err) => {
        console.log(err)
    })
}

exports.getEditGenre = (req, res, next) => { 
    Genre.findById({_id:req.params.id})
    .populate('filmler', 'filmadi')
    .then(genre => {
        console.log(genre);
        res.render('editGenre', {
            title: 'film türü güncelle',
            tur : genre
        })
    }).catch((err) => {
        console.log(err)
    })
}

exports.postEditGenre = (req, res, next) => { 
    const id = req.body.id;
    const turAdi = req.body.turAdi;
    const aciklama = req.body.aciklama;

    Genre.updateOne({_id:id}, {
        $set: {
            turAdi: turAdi,
            aciklama: aciklama          
        }
    })
    .then(() => {
        res.redirect('/genres/list')
    })
    .catch((err) => {
        console.log(err)
    })
}
exports.getDeleteGenre = (req, res, next) => {
    Genre.findByIdAndDelete({_id:req.params.id})
    .then(
        () => {
            res.redirect('/genres/list')
        }
    ).catch((err) => {
        console.log(err)
    })   
}