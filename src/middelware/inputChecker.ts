import { NextFunction, Request, Response } from "express";


export const validateSignupInput = (req: Request, res: Response, next:NextFunction) => {
try { 
        const username: string | undefined = req.body.username;
        const password:string | undefined = req.body.password;
        const email:string | undefined = req.body.email;
        const phone:string | undefined = req.body.phone;
        
            next()
   } catch (error)
       {
         res.status(400)
        }
}


export const validateProductPost = (req: Request, res: Response, next:NextFunction) => {
  try { 
        const name: string | undefined = req.body.name
        const count: string | undefined = req.body.count
        const price: string | undefined = req.body.price
       
          if(name && typeof name =='string'&& count && typeof count =='number'&& price && typeof price =='number')
          {
            const countval= parseInt(count);
            const priceval= parseFloat(price);
           
            if(typeof countval== 'number' && typeof priceval == 'number')
            {
              next();
            }
            else{
              res.status(400);
              res.end();
            }
          
          }
          else{
            res.status(400);
            res.end();
          }
             
     } catch (error)
         {
           res.status(400)
           res.end();
          }
  }


export const validateProductUpdate=(req: Request, res: Response, next:NextFunction)=>
 {
  const name: string | undefined = req.body.name
  const price: number | undefined = req.body.price
  const count: number | undefined = req.body.count
  //no name or price or count sent to edit
  if (!("name" in req.body || "price" in req.body || "count" in req.body)) {
      res.status(400).send("missing parameters")
      res.end();
  }
  //name is sent but not as a string
  else if ("name" in req.body && typeof name != "string") {
      res.status(400).send("name must be a string")
      res.end();
  }
  //price is sent but not as a number
  else if ("price" in req.body && typeof price != "number") {
      res.status(400).send("price must be a number")
      res.end();
  }
  //count is sent but not as a number
  else if ("count" in req.body && typeof count != "number") {
      res.status(400).send("count must be a number")
      res.end();
  }
  
  else {
      next();
  }
 }
