const express = require('express');
const router = express.Router();

const isAuthenticated=require('../middlewares/authentication')

const movieController = require('../controllers/movies')

router.get('/', movieController.GetMovies);

router.get('/list',isAuthenticated, movieController.GetMoviesList);

router.get('/addMovie',isAuthenticated, movieController.getAddMovie);

router.post('/addMovie',isAuthenticated, movieController.postAddMovie);

router.get('/edit/:id',isAuthenticated, movieController.getEditMovie)

router.post('/edit',isAuthenticated, movieController.postEditMovie)

router.get('/delete/:id',isAuthenticated, movieController.getDeleteMovie)

router.get('/detail/:id', movieController.GetMovie)

router.post('/search', movieController.postSearchMovie)

router.get('/byGenre/:id', movieController.getMoviesByGenre)

module.exports = router;