import bcrypt from "bcrypt";
import Client from '../database';
import dotenv from 'dotenv';

dotenv.config();

const {  
  ENV,
  BCRYBT_PASSWORD,
  SALT_ROUNDS,
} = process.env

export type User ={
  id? :number,
  username :string,
  email :string,
  phone :string,  
  hash_password :string,
  creation_date?:Date
}

export class userController{
    async create(u: User): Promise<User> {
        try {
        
          const conn = await Client.connect()
          const sql = 'INSERT INTO users (username,email,phone,hash_password) VALUES($1,$2,$3,$4) RETURNING *'
    
          const hash = bcrypt.hashSync(
            u.hash_password + BCRYBT_PASSWORD, 
            parseInt(SALT_ROUNDS as string)
          );
    
          const result = await conn.query(sql, [u.username,u.email,u.phone,hash])
          const user = result.rows[0]
    
          conn.release()
    
          return user
        } catch(err) {
          throw new Error(`unable create user (${u.username}): ${err}`)
        } 
      }

      async index ():Promise<User[]>{

        try {
            const conn= await Client.connect();
            const sql=`SELECT * FROM users`;
            const result= await conn.query(sql);
            conn.release();
            return result.rows
            
        } catch (error) {
            throw new Error(`Couldn't return users. Error: ${error}`);
        }
     }
    

     async show (id:number):Promise<User>{

        try {
            const conn= await Client.connect();     
            const result= await conn.query('SELECT * FROM users WHERE id=$1',[id]);
            conn.release();
            return result.rows[0]
            
        } catch (error) {
            throw new Error(`Couldn't get user of ${id}. Error: ${error}`);
        }
     }

     async delete(id: number): Promise<User> {
        
      try {
        const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'
          
          const conn = await Client.connect()
  
          const result = await conn.query(sql, [id])
  
          const user = result.rows[0]
         
          conn.release()
  
          return user  
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
     }

     
      async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT hash_password FROM users WHERE username=($1)'
    
        const result = await conn.query(sql, [username])
    
        console.log("password from user: "+password)
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(password+BCRYBT_PASSWORD, user.hash_password)) {
            return user
          }
        }
    
        return null
      }


}
