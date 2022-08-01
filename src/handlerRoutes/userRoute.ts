import express, { Request, Response } from 'express'
import { User, userController } from '../models/user'
import bodyParser from 'body-parser';
import getAuthToken from "../utilities/authentication"

const userRoute = express.Router();
userRoute.use(bodyParser.json())

const user = new userController()

userRoute.post('/', async (req: Request, res: Response): Promise<void> => {
    const username: string | undefined = req.body.username;
    const password:string | undefined = req.body.password;
    console.log("username: "+ username);
    //ensure title validity
    if (username && typeof username == 'string' && password) {
        const postedUser:User={username:username,password:password} 

        const newuser = await user.create(postedUser);
      
        const token= getAuthToken(newuser);
        res.json(token)
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
        res.json(newuser)
    }
    else {
        res.status(400).send("bad request")
    }
})



export default userRoute;

