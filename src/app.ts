import express, { Request, Response} from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.routes';
import { orderRoutes } from './app/modules/orders/order.routes';
import { userRoutes } from './app/modules/users/user.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Ecommerce Inventory Server is up and running');
});

export default app;