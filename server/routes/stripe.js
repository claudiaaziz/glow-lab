import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { calculateTotal, validateCartItems } from '../utils/cartUtils.js';

dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// config route
router.get('/config', (req, res) => {
	res.json({
		publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	});
});

// Create Payment Intent route
router.post('/create-payment-intent', async (req, res) => {
	try {
		const { cartItems } = req.body;

		// Validate cart items
		const validation = validateCartItems(cartItems);
		if (!validation.isValid) {
			return res.status(400).json({ error: validation.error });
		}

		// Calculate total
		const total = calculateTotal(cartItems);
		const amountInCents = Math.round(total * 100);

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amountInCents,
			currency: 'usd',
			automatic_payment_methods: { enabled: true },
		});

		res.json({
			clientSecret: paymentIntent.client_secret,
			paymentIntentId: paymentIntent.id,
		});
	} catch (error) {
		console.error('Error creating payment intent:', error);
		res.status(500).json({ error: 'Failed to create payment intent' });
	}
});

// Update Payment Intent route
router.patch('/update-payment-intent/:id', async (req, res) => {
	try {
		const { cartItems } = req.body;
		console.log('router.patch 🩷 cartItems:', cartItems);
		const { id } = req.params;

		// Validate cart items
		const validation = validateCartItems(cartItems);
		if (!validation.isValid) {
			return res.status(400).json({ error: validation.error });
		}

		// Calculate total
		const total = calculateTotal(cartItems);
		console.log('router.patch 🩷 total:', total);
		const amountInCents = Math.round(total * 100);

		await stripe.paymentIntents.update(id, {
			amount: amountInCents,
		});

		res.status(200).json({ success: true });
	} catch (error) {
		console.error('Error updating payment intent:', error);
		res.status(500).json({ error: 'Failed to update payment intent' });
	}
});

export default router;
