import bodyParser from 'body-parser';
import express, { Request, Response } from 'express'

import { DashboardQueries } from '../services/dashboard'

const dashboardRoute = express.Router();
dashboardRoute.use(bodyParser.json())
const dashboard = new DashboardQueries()
dashboardRoute.get('/most_popular_products', async (req: Request, res: Response): Promise<void> => {
    try {console.log("hello")

        const products = await dashboard.getPopularProducts();
        res.json(products);
    } catch (err) {
        console.log(err)
                res.status(500).send(err)
    }
    
    });
export default dashboardRoute