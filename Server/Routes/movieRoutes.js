const { getMovies, getMovieDetail } = require('../Controllers/movieControllers')

const Router = require('express').Router()


Router.get("/",getMovies)
Router.get('/movie/:id',getMovieDetail)




module.exports = Router