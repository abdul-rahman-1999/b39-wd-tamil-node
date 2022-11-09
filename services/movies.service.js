import { client } from '../index.js';


export async function getMoviess(request) {
    return await client.db('b39wd').collection('movies').find(request.query).toArray();
}

export async function getMoviesbyid(id) {
    return await client
        .db("b39wd")
        .collection("movies")
        .findOne({ id: id });
}

export async function DeleteMovies(id) {
    return await client
        .db("b39wd")
        .collection("movies")
        .deleteOne({ id: id });
}

export async function UpdateMovies(id, data) {
    return await client
        .db("b39wd")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}

export async function CreateMovies(data) {
    return await client.db('b39wd').collection('movies').insertMany(data);
}