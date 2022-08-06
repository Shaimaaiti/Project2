import Client from '../database'

export type Produtc={
    Id ?:number,
    name: string,
    count: number,
    price :number
}

export class productController{
 async index ():Promise<Produtc[]>{

    try {
        const conn= await Client.connect();
        const sql=`SELECT * FROM products`;
        const result= await conn.query(sql);
        conn.release();
        return result.rows
        
    } catch (error) {
        throw new Error(`Couldn't return products. Error: ${error}`);
    }
 }



 async show (id:number):Promise<Produtc>{

    try {
        const conn= await Client.connect();     
        const result= await conn.query('SELECT * FROM products WHERE id=$1',[id]);
        conn.release();
        return result.rows[0]
        
    } catch (error) {
        throw new Error(`Couldn't get  product of ${id}. Error: ${error}`);
    }
 }

 async create (product:Produtc):Promise<Produtc>{

    try {
        const conn= await Client.connect(); 
        const sql = 'INSERT INTO products (name, count,price) VALUES($1, $2,$3) RETURNING *';  
          
        const result= await conn.query(sql,[product.name,product.count,product.price]);
        conn.release();
        return result.rows[0]
        
    } catch (error) {
        throw new Error(`Couldn't insert the product. Error: ${error}`);
    }
 }


 async update(id: number, name: string , count: number , price:number): Promise<Produtc> {
    try {
        const conn = await Client.connect();
         
        const sql = 'Update products SET name=($2),count=($3),price=($4) WHERE id=($1) RETURNING *'
        const  result = await conn.query(sql, [id, name, count,price])
        const  product = result.rows[0]     
        conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not update product ${id}. Error: ${err}`)
    }
  }


  async delete(id: number): Promise<Produtc> {
    
    try {
      const sql = 'DELETE FROM products WHERE id=($1)'
        
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        const product = result.rows[0]
       
        conn.release()

        return product  
    } catch (err) {
        throw new Error(`Could not delete product ${id}. Error: ${err}`)
    }
  }


}
