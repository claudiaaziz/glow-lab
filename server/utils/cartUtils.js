import { products } from '../data/products.js';

export const validateCartItems = (cartItems) => {
	if (!cartItems || !Array.isArray(cartItems)) {
		return {
			isValid: false,
			error: 'Invalid request: cartItems must be an array',
		};
	}

	for (const item of cartItems) {
		const product = products.find((p) => p.id === item.id);

		if (!product) {
			return {
				isValid: false,
				error: `Invalid product ID: ${item.id}`,
			};
		}

		if (!item.quantity || item.quantity < 1) {
			return {
				isValid: false,
				error: `Invalid quantity for product: ${item.id}`,
			};
		}
	}

	return { isValid: true };
};

export const calculateTotal = (cartItems) => {
	return cartItems.reduce((total, item) => {
		const product = products.find((p) => p.id === item.id);
		return total + product.price * item.quantity;
	}, 0);
};
