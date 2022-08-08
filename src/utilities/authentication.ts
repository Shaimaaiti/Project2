
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/user";

const {  
    TOKEN_SECERT
  } = process.env


const getAuthToken = (newuser:User):string|undefined => {
try {
        const token= jwt.sign({user:newuser},TOKEN_SECERT as Secret);
        //console.log("Created token: "+token)
        return token;
    } catch (error) {
        throw new Error(`Can't create token for (${newuser.username}):${error}`);
    }
}


export default getAuthToken;