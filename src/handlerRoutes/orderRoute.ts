import express, { Request, Response } from 'express'
import { Order, orderController,Order_Products } from '../models/order'
import { validateProductPost,validateProductUpdate } from '../middelware/inputChecker';
import verifyAuthToken from "../middelware/authorization";
import bodyParser from 'body-parser';

const orderRoute = express.Router();
orderRoute.use(bodyParser.json())

const order = new orderController();

orderRoute.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const orders: Order[] = await order.index();
        res.json(orders);
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
    
    });

    orderRoute.get('/:id', async (req: Request, res: Response): Promise<void> => {
        const id: number = parseInt(req.params.id as string)
        if (id) {
            try {
                const showedOrder= await order.show(id)
    
                if (showedOrder) {
                    res.json(showedOrder)
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

    orderRoute.post('/',async (req: Request, res: Response): Promise<void> => {   
        try {
               const user_Id: string  = req.body.userId
               //const cost: string  = req.body.cost              
               const userId= parseInt(user_Id);
               //const costVal= parseFloat(cost);
               
               const postedOrder :Order={userId:userId};
               const newOrder = await order.create(postedOrder);
               res.json(newOrder);
           } catch (error) {
               res.status(400).send(`bad request. ${error}`);
           }
           
       });
       orderRoute.patch('/:id',async (req: Request, res: Response): Promise<void> => {
        //ensure order is found
        const id: number = parseInt(req.params.id as string)  
    
        if (id) {
            try {
                const cost: string  = req.body.cost;
                const costVal= parseFloat(cost);
                           
                 const postedOrder = await order.update(id, costVal)
                     res.json(postedOrder)
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
    //delete a resouce
orderRoute.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id as string)
    if (id) {
        try {
               await order.delete(id)
           
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


orderRoute.post('/orders/:id/products',async (req: Request, res: Response): Promise<void> => {   
    try {
           const product_Id: number  = req.body.product_Id                       
           const order_Id:string= req.params.id;
           const quantity: number  = req.body.quantity 
           const orderId= parseInt(order_Id);          
           const postedOrder :Order_Products={order_id:orderId,product_id:product_Id,quantity:quantity};
           const newOrder = await order.addProduct(postedOrder);
           res.json(newOrder);
       } catch (error) {
           res.status(400).send(`bad request. ${error}`);
       }
       
   });






 export default orderRoute;