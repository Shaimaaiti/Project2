import { User, userController } from '../../models/user';
import express from 'express';
import getToken from '../../utilities/authentication';
import verifyAuthToken from "../../middelware/authorization";

import userHandler from '../../handlerRoutes/userRoute';
const loginUrl="http://localhost:3000/user/login";
const signupUrl="http://localhost:3000/user/signup";
const baseUrl="http://localhost:3000/user";
const user = new userController();
let newUser:User;
const postedUser:User={username:"username",hash_password:"password",email:"email@udacity.com",phone:"phone"} 

describe("User handler", () => {
    const body={username:postedUser.username,password:postedUser.hash_password};

    it('user not created yet!, login should return status 400', () => {
      userHandler.post(loginUrl,async function(request:express.Request,response:express.Response,_error:any) {
        request.body=body;
        expect(response.statusCode).toBe(400);       
       });
    });

    it('sign up should return status 200', () => {
        userHandler.post(signupUrl,async function(request:express.Request,response:express.Response,_error:any) {
          request.body=postedUser;
          expect(response.statusCode).toBe(200);       
         });
      });

      it('sign up should return response has next step', () => {
        userHandler.post(signupUrl,async function(request:express.Request,response:express.Response,_error:any) {
          request.body=postedUser;
          expect(response.statusMessage).toContain("/login");       
         });
      });
      beforeAll(async () => {
         newUser = await user.create(postedUser as User) 
        
    })
      it('login should return status 200', async () => {
       
        userHandler.post(loginUrl,async function(request:express.Request,response:express.Response,_error:any) {
          request.body={username:newUser.username,password:postedUser.hash_password};
          expect(response.statusCode).toBe(200);       
                 
           });
      });

      it('index should return status 200', async () => {          
          const token= getToken(newUser);
          const header= `Bearer ${token}`;
          userHandler.get(baseUrl+"/",verifyAuthToken,async function(request:express.Request,response:express.Response,_error:any) {
          request.headers.authorization=header;
          expect(response.statusCode).toBe(200);       
                 
           });
      });

      it('show should return status 200', async () => {       
        const token= getToken(newUser);
        const header= `Bearer ${token}`;
        userHandler.get(baseUrl+`/${newUser.id}`,verifyAuthToken,async function(request:express.Request,response:express.Response,_error:any) {
        request.headers.authorization=header;
        expect(response.statusCode).toBe(200);       
               
         });
    });


    it('delete should return status 204', async () => {
      const newUser= await user.create(postedUser as User)
      const token= getToken(newUser);
      const header= `Bearer ${token}`;
      userHandler.delete(baseUrl+`/${newUser.id}`,verifyAuthToken,async function(request:express.Request,response:express.Response,_error:any) {
      request.headers.authorization=header;
      expect(response.statusCode).toBe(200);       
             
       });
  });

});
