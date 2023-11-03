const express = require('express');
const router = express.Router();

const isAuthenticated=require('../middlewares/authentication')

const genreController = require('../controllers/genres')

router.get('/list',isAuthenticated, genreController.GetGenres);

router.get('/addGenre',isAuthenticated, genreController.getAddGenre);

router.post('/addGenre',isAuthenticated, genreController.postAddGenre);

router.get('/edit/:id',isAuthenticated, genreController.getEditGenre)

router.post('/edit',isAuthenticated, genreController.postEditGenre)

router.get('/delete/:id',isAuthenticated, genreController.getDeleteGenre)


module.exports = router;