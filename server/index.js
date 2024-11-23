import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import stripeRoutes from './routes/stripe.js';
import { products } from './data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// endpoints
app.use('/stripe', stripeRoutes);

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// start server
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
