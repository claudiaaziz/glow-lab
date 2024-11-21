import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { products } from './data/products.js';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// REST API Routes
app.get('/api/products', (req, res) => {
	res.json(products);
});

// Stripe Routes
app.get('/stripe/config', (req, res) => {
	res.json({
		publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	});
});

app.post('/stripe/create-payment-intent', async (req, res) => {
	try {
		const { amount } = req.body;

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: 'usd',
			automatic_payment_methods: {
				enabled: true,
			},
		});

		res.json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.error('Error creating payment intent:', error);
		res.status(500).json({ error: error.message });
	}
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
