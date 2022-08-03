import { User, userController } from '../../models/user';
import express from 'express';

import userHandler from '../../handlerRoutes/userRoute';
const loginUrl="http://localhost:3000/user/login";
const signupUrl="http://localhost:3000/user/signup";
const user = new userController();

const postedUser:User={username:"username",hash_password:"password",email:"email",phone:"phone"} 

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

      it('login should return status 200', async () => {
        const newUser= await user.create(postedUser as User)
        userHandler.post(loginUrl,async function(request:express.Request,response:express.Response,_error:any) {
          request.body={username:newUser.username,password:postedUser.hash_password};
          expect(response.statusCode).toBe(200);       
         });
      });



});
