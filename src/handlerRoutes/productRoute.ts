import express, { Request, Response } from 'express'
import { Produtc, productController } from '../models/product'
import { validateProductPost,validateProductUpdate } from '../middelware/inputChecker';
import verifyAuthToken from "../middelware/authorization";
import bodyParser from 'body-parser';

const productRoute = express.Router();
productRoute.use(bodyParser.json())

const product = new productController()
// All CURD operation there for System of shopping.
productRoute.get('/',verifyAuthToken, async (req: Request, res: Response): Promise<void> => {
try {
    const products: Produtc[] = await product.index();
    res.json(products);
} catch (err) {
    console.log(err)
            res.status(500).send(err)
}

});

productRoute.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id as string)
    if (id) {
        try {
            const showedProduct= await product.show(id)

            if (showedProduct) {
                res.json(showedProduct)
            }
            else {
                res.status(404).send('resource not found')
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }

    }
    else {
        res.sendStatus(404)
    }

});
// create a resource
productRoute.post('/', validateProductPost,async (req: Request, res: Response): Promise<void> => {
   
 try {
        const name: string  = req.body.name
        const count: string  = req.body.count
        const price: string = req.body.price
        const countval= parseInt(count);
        const priceval= parseFloat(price);
        
        const postedProduct :Produtc={name:name,count:countval,price:priceval};
        const newProduct = await product.create(postedProduct);
        res.json(newProduct);
    } catch (error) {
        res.status(400).send(`bad request. ${error}`);
    }
    
});

//edit a resource
productRoute.patch('/:id', validateProductUpdate,async (req: Request, res: Response): Promise<void> => {
    //ensure product is found
    const id: number = parseInt(req.params.id as string)


    if (id) {
        try {
             const name: string | undefined = req.body.name
             const price: number | undefined = req.body.price
             const count: number | undefined = req.body.count           
             const postedProduct = await product.update(id, name as string, count as number,price as number)
                 res.json(postedProduct)
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }

    }
    else {
        res.sendStatus(404)
    }

});
//delete a resouce
productRoute.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id as string)
    if (id) {
        try {
            const deleted: Produtc | undefined = await product.delete(id)
            if (deleted) {
                res.sendStatus(204)
            }
            else {
                res.status(404).send('resource not found')
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }

    }
    else {
        res.sendStatus(404)
    }
});



export default productRoute;
