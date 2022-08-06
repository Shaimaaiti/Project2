import Client from '../database'
import { productController, Produtc } from './product'


export type Order_Products={
    Id ?:number,
    order_id: number,
    product_id: number,
    quantity :number,
    total_cost?:number
}
export type Order={
    Id? :number,  
     userId :number,
     cost?: number

}
export class orderController{
    async index ():Promise<Order[]>{

        try {
            const conn= await Client.connect();
            const sql=`SELECT * FROM orders`;
            const result= await conn.query(sql);
            conn.release();
            return result.rows
            
        } catch (error) {
            throw new Error(`Couldn't return orders. Error: ${error}`);
        }
     }
    

     async show (id:number):Promise<Order>{

        try {
            const conn= await Client.connect();     
            const result= await conn.query('SELECT * FROM orders WHERE id=$1',[id]);
            conn.release();
            return result.rows[0]
            
        } catch (error) {
            throw new Error(`Couldn't get order of ${id}. Error: ${error}`);
        }
     }

     async create (order:Order):Promise<Order>{

        try {
            const conn= await Client.connect(); 
            const sql = 'INSERT INTO orders (userId) VALUES($1) RETURNING *';  
              
            const result= await conn.query(sql,[order.userId]);
            conn.release();
            return result.rows[0]
            
        } catch (error) {
            throw new Error(`Couldn't insert the order . Error: ${error}`);
        }
     }
    
    
     async update(id: number, cost:number): Promise<Order> {
        try {
            const conn = await Client.connect();
             
            const sql = 'Update orders SET cost=($2) WHERE id=($1) RETURNING *'
            const  result = await conn.query(sql, [id, cost])
            const  order = result.rows[0]
            
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not update order ${id}. Error: ${err}`)
        }
      }
    
    
      async delete(id: number): Promise<Order> {
        
        try {
          const sql = 'DELETE FROM orders WHERE id=($1)'
            
            const conn = await Client.connect()
    
            const result = await conn.query(sql, [id])
    
            const order = result.rows[0]
           
            conn.release()
    
            return order  
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

        async addProduct (order:Order_Products):Promise<Order_Products>{

            try {
                const conn= await Client.connect(); 

                const sql = 'INSERT INTO order_products (order_id, product_id,quantity,total_cost) VALUES($1,$2,$3,$4) RETURNING *';  
                const product= await this.getProduct(order.product_id);                
                const orderCost= product.price * order.quantity;                
                const result= await conn.query(sql,[order.order_id,order.product_id,order.quantity,orderCost]);
                conn.release();
                return result.rows[0]
                
            } catch (error) {
                throw new Error(`Couldn't Add a product:${order.product_id} to the order ${order.order_id}:. Error: ${error}`);
            }
         }
        
      private async getProduct(id:number):Promise<Produtc>{
        try {
            const product = new productController();
        const result = product.show(id);
        return result;
        } catch (error) {
            throw new Error(`Couldn't get  product of ${id}. Error: ${error}`);
        }
      }












}
