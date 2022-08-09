import Client from '../database'

export class DashboardQueries {
  // Get most Popular Products
  async getPopularProducts(): Promise<{Product_Name: string, Product_Id: number, CountOfProduct: number}[]> {
    try {
      
        const conn= await Client.connect();
       
        const sql=`SELECT p.name as "Product_Name",p.id as "Product_Id",COUNT(*) as "CountOfProduct" FROM orders_products as op 
        join products as p on op.product_id = p.id
        GROUP BY p.name,p.id ORDER BY COUNT(*) DESC limit 5;`;
        const result= await conn.query(sql);
        conn.release();
         return result.rows
    } catch (err) {
      throw new Error(`unable get most Popular Products: ${err}`)
    } 
  }

  
}