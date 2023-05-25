module.exports = {
    getMovies : async(req,res)=>{
        try{
            const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`);
            const json = await data.json();
            res.status(200).json(json.results);
        }catch(err){
            res.status(400).json({status:false})
        }
    },
    getMovieDetail: async(req,res)=>{
        try{
            const data = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`);
            const json = await data.json();
            res.status(200).json(json);
        }catch(err){
            res.status(400).json({status:false})
        }
    }
}