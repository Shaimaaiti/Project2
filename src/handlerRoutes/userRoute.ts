import express, { Request, Response } from 'express'
import { User, userController } from '../models/user'
import bodyParser from 'body-parser';
import getAuthToken from "../utilities/authentication"
import verifyAuthToken from "../middelware/authorization";

const userRoute = express.Router();
userRoute.use(bodyParser.json())

const user = new userController()

userRoute.post('/signup', async (req: Request, res: Response): Promise<void> => {
    const username: string | undefined = req.body.username;
    const password:string | undefined = req.body.password;
    const email:string | undefined = req.body.email;
    const phone:string | undefined = req.body.phone;
    console.log("username: "+ username);
   
    if (username && typeof username == 'string' && typeof password == 'string' && typeof email== 'string'&& typeof phone == 'string') 
    {
        const postedUser:User={username:username,hash_password:password,email:email,phone:phone} 

         await user.create(postedUser);      
       
         res.send("Next Step is go to: "+req.baseUrl+"/login")
    }
    else {
        res.status(400).send("bad request")
    }
})

userRoute.post('/login', async (req: Request, res: Response): Promise<void> => {
    const username: string | undefined = req.body.username;
    const password:string | undefined = req.body.password;
    console.log("username: "+ username);
   
    if (username && typeof username == 'string' && password) {
        const newuser = await user.authenticate(username,password);
        const token= getAuthToken(newuser as User);
        res.json(token)
    }
    else {
        res.status(400).send("bad request")
    }
})
// index
userRoute.get('/',verifyAuthToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await user.index();
        res.json(users);
    } catch (err) {
        console.log(err)
                res.status(500).send(err)
    }
    
    });
    // show
    userRoute.get('/:id', verifyAuthToken,async (req: Request, res: Response): Promise<void> => {
        const id: number = parseInt(req.params.id as string)
        if (id) {
            try {
                const requestUser= await user.show(id)
    
                if (requestUser) {
                    res.json(requestUser)
                }
                else {
                    res.status(404).send('resource not found')
                }
            }
            catch (err) {
                console.log(err)
                res.status(500).send(err)
            }
    
        }
        else {
            res.sendStatus(404)
        }
    
    });

    // delete
    userRoute.delete('/:id',verifyAuthToken, async (req: Request, res: Response): Promise<void> => {
        const id: number = parseInt(req.params.id as string)
        if (id) {
            try {
                 await user.delete(id)
            
                res.sendStatus(204)              
              
            }
            catch (err) {
                console.log(err)
                res.status(500).send(err)
            }
    
        }
        else {
            res.sendStatus(404)
        }
    });

export default userRoute;


