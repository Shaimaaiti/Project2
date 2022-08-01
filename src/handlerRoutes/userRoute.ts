import express, { Request, Response } from 'express'
import { User, userController } from '../models/user'
import bodyParser from 'body-parser';
import getAuthToken from "../utilities/authentication"

const userRoute = express.Router();
userRoute.use(bodyParser.json())

const user = new userController()

userRoute.post('/signup', async (req: Request, res: Response): Promise<void> => {
    const username: string | undefined = req.body.username;
    const password:string | undefined = req.body.password;
    const email:string | undefined = req.body.email;
    const phone:string | undefined = req.body.phone;
    console.log("username: "+ username);
    //ensure title validity
    if (username && typeof username == 'string' && typeof password == 'string' && typeof email== 'string'&& typeof phone == 'string') 
    {
        const postedUser:User={username:username,password:password,email:email,phone:phone} 

         await user.create(postedUser);      
       
         res.json(req.url+"/login")
    }
    else {
        res.status(400).send("bad request")
    }
})

userRoute.post('/login', async (req: Request, res: Response): Promise<void> => {
    const username: string | undefined = req.body.username;
    const password:string | undefined = req.body.password;
    console.log("username: "+ username);
    //ensure title validity
    if (username && typeof username == 'string' && password) {
        //const postedUser:User={username:username,password:password} 
        const newuser = await user.authenticate(username,password);
        const token= getAuthToken(newuser as User);
        res.json(token)
    }
    else {
        res.status(400).send("bad request")
    }
})



export default userRoute;


