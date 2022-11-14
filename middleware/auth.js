import jwt from "jsonwebtoken"

export const auth = (request,response,next) => {
    try{
        const token = request.header("x-auth-token")
        console.log("token is :", token)
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch{
        response.status(401).send({error:err.message})
    }
   
}

// This is custom middleware it is to check and allow the person who have an account in our app.  