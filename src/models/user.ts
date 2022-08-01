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

    username :string;
    password: string ;
    id?:number ;
}

export class userController{
    async create(u: User): Promise<User> {
        try {
          console.log(ENV)
          console.log(BCRYBT_PASSWORD)
          console.log(SALT_ROUNDS)
          const conn = await Client.connect()
          const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'
    
          const hash = bcrypt.hashSync(
            u.password + BCRYBT_PASSWORD, 
            parseInt(SALT_ROUNDS as string)
          );
    
          const result = await conn.query(sql, [u.username, hash])
          const user = result.rows[0]
    
          conn.release()
    
          return user
        } catch(err) {
          throw new Error(`unable create user (${u.username}): ${err}`)
        } 
      }


      async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT password_digest FROM users WHERE username=($1)'
    
        const result = await conn.query(sql, [username])
    
        console.log(password+BCRYBT_PASSWORD)
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(password+BCRYBT_PASSWORD, user.password_digest)) {
            return user
          }
        }
    
        return null
      }

}
