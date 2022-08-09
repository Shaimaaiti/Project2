import express, {Request, Response} from 'express';
import  morgan from 'morgan';
import bodyparser from 'body-parser';
import userRoute from './handlerRoutes/userRoute';
import productRoute from './handlerRoutes/productRoute';
import ordertRoute from './handlerRoutes/orderRoute';
import dashboardRoutes from './handlerRoutes/dashboard';
const app= express();
const port= 3000
app.use(morgan(':method :url :status '));

app.use(bodyparser.json());
app.use("/user",userRoute);
app.use("/product",productRoute);
app.use("/order",ordertRoute);
app.use("/dashboard",dashboardRoutes)


app.get('/',(req:Request,res:Response)=>{

    res.send("hello world");
  });

app.listen(port,()=>{

    console.log(`Server express started at http://localhost:${port}`);
  });