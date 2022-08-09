import { Product, productController} from '../../models/product';

const product = new productController();
let newProduct:Product|undefined; 
describe("Product Model", () => {
    it('should have a create method', () => {
        expect(product.create).toBeDefined();
      });

    beforeAll(async () => {              
        const postedProduct:Product={name:"book",count:5,price:10 };
        newProduct = await product.create(postedProduct) ;        
      });
    
    it('index should return [] of products', async () => {
        const products:Product[]= await product.index();
        expect(products.length).toBeGreaterThanOrEqual([].length);
      });
      it('show should return product by Id', async () => {
      
        const postedProduct:Product= await product.show((newProduct as unknown as Product ).id as number);
        expect(postedProduct.name).toEqual("book");
      });
      it('update product price by id', async () => {
        const result = newProduct as unknown as Product
        const postedProduct:Product= await product.update(result.id as number,result.name as string,result.count as number,15);
        expect(postedProduct.price as number).not.toEqual(result?.price);
      });
           
      it('delete product by id', async () => {
        const postedProduct:Product= await product.delete((newProduct as unknown as Product ).id as number);
        expect(postedProduct.id).toEqual(newProduct?.id);
      });

});