import { client } from '../index.js';

async function getMoviess(request) {
    return await client.db('b39wd').collection('movies').find(request.query).toArray();
}

async function getMoviesbyid(id) {
    return await client
        .db("b39wd")
        .collection("movies")
        .findOne({ id: id });
}

async function DeleteMovies(id) {
    return await client
        .db("b39wd")
        .collection("movies")
        .deleteOne({ id: id });
}

async function UpdateMovies(id, data) {
    return await client
        .db("b39wd")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}

async function CreateMovies(data) {
    return await client.db('b39wd').collection('movies').insertMany(data);
}