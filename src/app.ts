import express, { Request, Response} from 'express';
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Ecommerce Inventory Server is up and running');
});

export default app;