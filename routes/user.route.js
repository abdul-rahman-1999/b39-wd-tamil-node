import express from 'express'
import { client } from '../index.js';
import {CreateUser,getUserByName} from '../services/user.service.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import * as dotenv from 'dotenv'
dotenv.config();
const router = express.Router()

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL,
    pass:process.env.PASSWORD,
  }
})

async function genHashedPassword(password){
  
  const NO_OF_ROUND = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUND);
  const hashedPassword = await bcrypt.hash(password,salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
}

  router.post('/signup', async function(request, response){
    const {fullName,email,password} = request.body; 
    console.log(request.body)

    const userFromDb = await getUserByName(email);

    if(userFromDb){
      response.status(400).send({msg:"User Already Exist"})
    }else{
      const hashedPassword = await genHashedPassword(password);
      console.log(password, hashedPassword)
      const result = await CreateUser({
        fullName:fullName,
        email:email,
        password:hashedPassword
      });
      response.send(result)
    }
  })

  router.post('/login', async function(request, response){
    const {email,password} = request.body;  

    
    const userFromDb = await getUserByName(email);

    if(!userFromDb){
      response.status(400).send({msg:"Invalid Credentials"})
    }
    else{
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

  router.post('/forgotPassword', async function(request,response){
    const {email} = request.body
    try{
     
      if(!email){
        response.status(400).send({msg:"Invalid Credentials"})
      }else{
        if(email){
          const userFromDb = await getUserByName(email);
          const token = jwt.sign({id:userFromDb._id},process.env.SECRET_KEY,{
            expiresIn:"120s"
          });

          const setuserToken = await client.db('Authentication').collection('users').findOneAndUpdate({email:userFromDb.email},{ $set:{verifyToken:token}},{returnDocument:"after"}); 
          if(setuserToken){
            const mailOptions = {
              from:process.env.EMAIL,
              to:email,
              subject:"Sending email for password reset",
              text:`This Link valid for 2 minutes http://localhost:3000/PasswordReset/${email}/${setuserToken.value.verifyToken}`
            }
            transporter.sendMail(mailOptions,(error,info) => {
              if(error){
                response.status(401).send({msg:"Email Not Send"})
              }else{
                response.status(201).send({msg:"Email Sent Successfully"})
              }
            })
          }
          
        }else{
          response.status(400).send({msg:"Invalid Credentials"})
        }
      }

    }catch(error){
      response.status(400).send({msg:"Invalid Credentials"})
    }

  })

  router.post("/:email/:token", async function(request,response){
    const {email,token} = request.params;
    const {password} = request.body;
    try{
      const validuser = await client.db('Authentication').collection('users').findOne({email:email,verifyToken:token});
      if(validuser){
        const newhashedPassword = await genHashedPassword(password);
        console.log(newhashedPassword,"new")
        const setnewuserPass = await client.db('Authentication').collection('users').updateOne({email:email},{ $set:{password:newhashedPassword}},{ $unset: {verifyToken:1}})  
        const removeToken = await client.db('Authentication').collection('users').updateOne({email:email},{ $unset: {verifyToken:1}})  
        console.log(setnewuserPass, removeToken)
        response.send({
          msg:"Success"
        })
      }else{
        response.send({
          msg:"User not exist"
        })
      }
    }catch(error){
      response.status(400).send({msg:"User not exist"})
    }
  })


  export default router


