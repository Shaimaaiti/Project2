import express, { Request, Response } from 'express'
import { Order, orderController,Order_Products } from '../models/order'
import { validateProductPost,validateProductUpdate } from '../middelware/inputChecker';
import verifyAuthToken from "../middelware/authorization";
import bodyParser from 'body-parser';

const orderRoute = express.Router();
orderRoute.use(bodyParser.json())

const order = new orderController();
// index
orderRoute.get('/',verifyAuthToken, async (req: Request, res: Response): Promise<void> => {
    try {
        let orders: Order[] = await order.index();
        
        const userId: number = parseInt(req.query.userId as string)
        const statusStr: string = req.query.status as string
        
        let status: boolean | undefined
        if (typeof statusStr !== "undefined") {
            if (statusStr.toLowerCase() === "true")
                status = true
            else if (statusStr.toLowerCase() === "false")
                status = false
        }
        
        if(!isNaN(userId))
        {
            
            const result:Order[] = orders as Order[]
            
            orders = result.filter(o => o.userid === userId)
           
        }
        if (typeof status !== "undefined") {
            orders = orders.filter(o => o.status === status)
        }       
        
        res.json(orders);
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
    
    });
// show
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
// create 
    orderRoute.post('/',async (req: Request, res: Response): Promise<void> => {   
        try {
               const user_Id: number|undefined  = req.body.userId                           
               const userId= (user_Id as unknown) as number;               
               if(!userId)
               {
                 throw new Error("paramter not number");                 
               }
               const postedOrder :Order={userid:userId};
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
                const status: boolean|undefined  = req.body.status;               
                if(!status)
                {
                  throw new Error("bad request");                 
                }
                 const postedOrder = await order.update(id, status)
                     res.json(postedOrder)
            }
            catch (err) {
                console.log(err)
                res.status(400).send(err)
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
//Current Order by user
// orderRoute.get('/:userId',verifyAuthToken,async (req: Request, res: Response): Promise<void>=>{
//     const userId: number = parseInt(req.params.userId as string)
//     if (userId) {
//         try {
//             const orders: Order[]= await order.getOrders(userId)

//             if (orders) {
//                 res.json(orders)
//             }
//             else {
//                 res.status(404).send('resource not found')
//             }
//         }
//         catch (err) {
//             console.log(err)
//             res.status(500).send(err)
//         }

//     }
//     else {
//         res.sendStatus(404)
//     }
// });
//AddProduct
orderRoute.post('/orders/:id/products',verifyAuthToken,async (req: Request, res: Response): Promise<void> => {   
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