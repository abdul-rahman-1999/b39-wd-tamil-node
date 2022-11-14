import express from 'express'
import {CreateUser,getUserByName} from '../services/user.service.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
const router = express.Router()

async function genHashedPassword(password){
  const NO_OF_ROUND = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUND);
  const hashedPassword = await bcrypt.hash(password,salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
}

  router.post('/signup', async function(request, response){
    const {name,password} = request.body;  

    const userFromDb = await getUserByName(name);

    if(userFromDb){
      response.status(400).send({msg:"User Already Exist"})
    }else{
      const hashedPassword = await genHashedPassword(password);
      console.log(password, hashedPassword)
      const result = await CreateUser({
        name:name,
        password:hashedPassword,
      });
      response.send(result)
    }
  })

  router.post('/login', async function(request, response){
    const {name,password} = request.body;  

    const userFromDb = await getUserByName(name);

    if(!userFromDb){
      response.status(400).send({msg:"Invalid Credentials"})
    }else{
    const storedPassword = userFromDb.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    if(isPasswordMatch){
      const token = jwt.sign({id:userFromDb._id}, process.env.SECRET_KEY)
      response.send({msg:"Login Successfully",token:token})
    }else{
      response.status(400).send({msg:"Invalid Credentials"})
    }
    }
  })


  export default router


