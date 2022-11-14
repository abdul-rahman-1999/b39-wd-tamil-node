import { client } from '../index.js';


export async function CreateUser(data) {
    return await client.db('b39wd').collection('user').insertOne(data);
}

export async function getUserByName(name) {
    return await client.db('b39wd').collection('user').findOne({name:name});
}