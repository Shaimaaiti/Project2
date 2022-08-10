import { User, userController } from '../../models/user';
import express from 'express';
import getToken from '../../utilities/authentication'
import orderRoute from '../../handlerRoutes/orderRoute';
import { Product, productController } from '../../models/product';
import verifyAuthToken from "../../middelware/authorization";
import { Order, orderController,Orders_Products } from '../../models/order'

const baseUrl="http://localhost:3000/order";

const user = new userController();
const order = new orderController();
const product = new productController();
let newUser:User;
let newOrder:Order;
const postedUser:User={username:"username",hash_password:"password",email:"email@udacity.com",phone:"phone"} 
const postedProduct:Product={name:"book",count:5,price:10 };


describe("Order handler", () => {

    beforeAll(async () => {
        newUser = await user.create(postedUser as User) 
        const postedOrder :Order={userid:newUser.id as number};
        newOrder= await order.create(postedOrder);
   });
   // all users
   it('index should return status 200', async () => {         

    orderRoute.get(baseUrl+`/`,verifyAuthToken,async function(request:express.Request,response:express.Response,_error:any) {
        const token= getToken(newUser);
        const header= `Bearer ${token}`;
        request.headers.authorization=header;
        expect(response.statusCode).toBe(200);       
           
             });
    });
    it('create order should return status 200', async () => {         
 
           orderRoute.post(baseUrl+"/",verifyAuthToken,async function(request:express.Request,response:express.Response,_error:any) {
           const token= getToken(newUser);
           const header= `Bearer ${token}`;
           request.headers.authorization=header;
           request.body={"userId":newUser.id}
            expect(response.statusCode).toBe(200);       
               
                 });
        });

// get orders for user id   
    it('index should return status 200', async () => {         

        orderRoute.get(baseUrl+`?userId=${newUser.id}`,verifyAuthToken,async function(request:express.Request,response:express.Response,_error:any) {
            const token= getToken(newUser);
            const header= `Bearer ${token}`;
            request.headers.authorization=header;
            expect(response.statusCode).toBe(200);       
               
                 });
        });
   

    it('show should return status 200', async () => {         
            
        orderRoute.get(baseUrl+`/${newOrder.id}`,verifyAuthToken,async function(request:express.Request,response:express.Response,_error:any) {
            const token= getToken(newUser);
            const header= `Bearer ${token}`;
            request.headers.authorization=header;
            expect(response.statusCode).toBe(200);       
                
                    });
        });
    it('Add product to order should return status 200', async () => {         
        const newProduct= await product.create(postedProduct);
        orderRoute.get(baseUrl+`/orders/${newOrder.id}/products`,verifyAuthToken,async function(request:express.Request,response:express.Response,_error:any) {
        request.body={"product_Id": newProduct.id,"quantity":5}
        const token= getToken(newUser);
        const header= `Bearer ${token}`;
        request.headers.authorization=header;
        expect(response.statusCode).toBe(200);       
                
                    });
        });
    it('update should return status 200', async () => {         

        orderRoute.patch(baseUrl+`/${newOrder.id}`,verifyAuthToken,async function(request:express.Request,response:express.Response,_error:any) {
            request.body={"userId":newUser.id,"status":true}
            const token= getToken(newUser);
            const header= `Bearer ${token}`;
            request.headers.authorization=header;
            expect(response.statusCode).toBe(200);       
                
                    });
        });

    it('delete should return status 200', async () => {         

        orderRoute.delete(baseUrl+`/${newOrder.id}`,verifyAuthToken,async function(request:express.Request,response:express.Response,_error:any) {
            const token= getToken(newUser);
            const header= `Bearer ${token}`;
            request.headers.authorization=header;
            expect(response.statusCode).toBe(200);       
                
                    });
        });

});