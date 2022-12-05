import express from 'express'
import {auth} from "../middleware/auth.js"
import {
    getMoviesbyid,
    getMoviess,
    UpdateMovies,
    DeleteMovies,
    CreateMovies
} from '../services/movies.service.js'
const router = express.Router()

router.get("/", auth, async function (request, response) {
    if(request.query.rating){
      request.query.rating = +request.query.rating
    }
    console.log(request.query)
    const movies = await getMoviess(request.query);
    response.send(movies);
  });
  
  router.get("/:id", async function (request, response) {
    const { id } = request.params;
    const movie = await getMoviesbyid(id)
    console.log(movie);
    movie ? response.send(movie) : response.status(404).send({ msg: "Not Found" });
  });
  
  router.post('/', async function(request, response){
    const data = request.body;
    console.log(data)
    const result = await CreateMovies(data);
    response.send(result)
  })
  
  router.put("/:id", async function (request, response) {
    const { id } = request.params;
    const data = request.body;
    console.log(data)
    console.log(id)
    const result = await UpdateMovies(id, data);
    console.log(result);
    result ? response.send(result) : response.status(404).send({ msg: "Not Found" });
  });
  
  router.delete("/:id", async function (request, response) {
    const { id } = request.params;
    const result = await DeleteMovies(id);
    console.log(result);
    result.deletedCount > 0 ? response.send({msg:'Movie was deleted successfully'}) : response.status(404).send({ msg: "MovieNot Found" });
  });

  export default router


