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
  ID? :number,
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
