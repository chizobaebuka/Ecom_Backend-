import express, { Request, Response} from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Ecommerce Inventory Server is up and running');
});



export default app;