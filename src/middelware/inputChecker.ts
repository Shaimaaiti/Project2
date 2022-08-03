import { NextFunction, Request, Response } from "express";


const validateSignupInput = (req: Request, res: Response, next:NextFunction) => {
try { 
        const username: string | undefined = req.body.username;
        const password:string | undefined = req.body.password;
        const email:string | undefined = req.body.email;
        const phone:string | undefined = req.body.phone;
        
            next()
   } catch (error)
       {
         res.status(400)
        }
}

export default validateSignupInput;