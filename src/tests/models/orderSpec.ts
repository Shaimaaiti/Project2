import { Order, orderController,Orders_Products } from '../../models/order';
import { User, userController } from '../../models/user';
import { Product, productController} from '../../models/product';
const product = new productController();
const order = new orderController();


 const user = new userController();
 const postedUser:User={username:"username",hash_password:"password",email:"email@udacity.com",phone:"phone"} 
 let newOrder:Order|undefined;
//const postedOrder:Order={userid=0,}
describe("Order Model", () => {
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
      });
      it('index should return [] of orders', async () => {
        const orders:Order[]= await order.index();
        expect(orders.length).toBeGreaterThanOrEqual([].length);
      });

      beforeAll(async () => {
        const newUser= await user.create(postedUser);       
        const postedOrder:Order={userid: newUser.id as number,status:false };
        newOrder = await order.create(postedOrder) 
      });

      it('show should get order by id', async () => {
        const result= await order.show((newOrder as unknown as User).id as number);
        expect(result.status).toBeFalse;
      });      
     
      it('addProduct to order', async () => {
        const postedProduct:Product={name:"book",count:5,price:10 };
        const newProduct:Product = await product.create(postedProduct) ;        
        const order_product:Orders_Products={order_id:newOrder?.id as number,product_id:newProduct.id as number,quantity:5}
        const order_productAdded = await order.addProduct(order_product)
        expect(order_productAdded.order_id).toEqual(newOrder?.id as number);
      });
      it('update order to be complete', async() => {
        const orderChanged = await order.update(newOrder?.id as number,true)
        expect(orderChanged.status).toBeTrue();
      });

      it('delete the order by id', async () => {
        const orderDeleted = await order.delete(newOrder?.id as number)
        expect(orderDeleted.id).toEqual(newOrder?.id);
      });     




});