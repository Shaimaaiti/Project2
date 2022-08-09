import { User, userController } from '../../models/user';
import express from 'express';
import getToken from '../../utilities/authentication'
import productRoute from '../../handlerRoutes/productRoute';
import { Product, productController } from '../../models/product';
import verifyAuthToken from "../../middelware/authorization";
import { validateProductPost,validateProductUpdate } from '../../middelware/inputChecker';

const baseUrl="http://localhost:3000/product";

const user = new userController();
const product = new productController();
let newUser:User;
let newProduct:Product;
const postedUser:User={username:"username",hash_password:"password",email:"email@udacity.com",phone:"phone"} 
const postedProduct:Product={name:"book",count:5,price:10 };
describe("Product handler", () => {

    beforeAll(async () => {
        newUser = await user.create(postedUser as User)       
        newProduct= await product.create(postedProduct);
   })

   it('index should return status 200', async () => {         

    productRoute.get(baseUrl+"/",async function(request:express.Request,response:express.Response,_error:any) {
 
    expect(response.statusCode).toBe(200);       
           
     });
    });
     
   it('show should return status 200', async () => {          
    
    productRoute.get(baseUrl+`/${newProduct.id}`,async function(request:express.Request,response:express.Response,_error:any) {
 
    expect(response.statusCode).toBe(200);       
           
     });
});

it('create should return status 200', async () => {          
    const token= getToken(newUser);
    const header= `Bearer ${token}`;
    productRoute.post(baseUrl+`/`,verifyAuthToken,validateProductPost,async function(request:express.Request,response:express.Response,_error:any) {
    request.body=postedProduct;
    request.headers.authorization=header;
    console.log(response)
    expect(response.statusCode).toBe(200);       
           
     });
});


it('update should return status 200', async () => {          
    const token= getToken(newUser);
    const header= `Bearer ${token}`;
    productRoute.patch(baseUrl+`/${newProduct.id}`,verifyAuthToken,validateProductUpdate,async function(request:express.Request,response:express.Response,_error:any) {
    request.body={name:newProduct.name,count:newProduct.count,price:5};
    request.headers.authorization=header;
    expect(response.statusCode).toBe(200);       
           
     });
});

it('delete should return status 204', async () => {          
    const token= getToken(newUser);
    const header= `Bearer ${token}`;
    productRoute.delete(baseUrl+`/${newProduct.id}`,verifyAuthToken,async function(request:express.Request,response:express.Response,_error:any) {    
    request.headers.authorization=header;
    expect(response.statusCode).toBe(200);       
           
     });
});

});