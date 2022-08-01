import express, {Request, Response} from 'express';
import bodyparser from 'body-parser';
import userRoute from './handlerRoutes/userRoute';
const app= express();
const port= 3000


app.use(bodyparser.json());
app.use("/user",userRoute);


app.get('/',(req:Request,res:Response)=>{

    res.send("hello world");
  });

app.listen(port,()=>{

    console.log(`Server express started at http://localhost:${port}`);
  });