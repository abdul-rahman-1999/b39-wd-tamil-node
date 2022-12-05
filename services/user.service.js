import { client } from '../index.js';


export async function CreateUser(data) {
    return await client.db('Authentication').collection('users').insertOne(data);
}

export async function getUserByName(email) {
    return await client.db('Authentication').collection('users').findOne({email:email});
}
