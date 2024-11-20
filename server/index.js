import express from 'express';
import cors from 'cors';
import { products } from './data/products.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
