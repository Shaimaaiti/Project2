
import { NextFunction, Request, Response } from "express";
import jwt,{ Secret } from "jsonwebtoken";
const {  
    TOKEN_SECERT
  } = process.env


        const verifyAuthToken = (req: Request, res: Response, next:NextFunction) => {
            try {
                const authorizationHeader = req.headers.authorization as string
                const token = authorizationHeader.split(' ')[1];
                console.log(token);
                //console.log(TOKEN_SECERT as Secret);
                jwt.verify(token,  TOKEN_SECERT as Secret)
        
                next()
            } catch (error) {
                res.status(401)
                res.end();
            }
        }

        export default verifyAuthToken;