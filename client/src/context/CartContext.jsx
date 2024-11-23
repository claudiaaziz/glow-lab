import { createContext, useState, useEffect } from 'react';
import { createPaymentIntent, updatePaymentIntent } from '../services/stripe';

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [cartItems, setCartItems] = useState([]);
	const [paymentIntentId, setPaymentIntentId] = useState(null);
	console.log('CartProvider 🩷 paymentIntentId:', paymentIntentId);
	const [clientSecret, setClientSecret] = useState(null);

	useEffect(() => {
		const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
		const cartItemsToSend = cartItems.map((item) => ({
			id: item.id,
			quantity: item.quantity,
		}));

		if (totalPrice > 0) {
			if (!paymentIntentId) {
				// Create new PaymentIntent if we don't have one
				const setupPayment = async () => {
					const { clientSecret, paymentIntentId: newId } = await createPaymentIntent(cartItemsToSend);
					setClientSecret(clientSecret);
					setPaymentIntentId(newId);
				};
				setupPayment();
			} else {
				// Update existing PaymentIntent when cart changes
				const updatePayment = async () => {
					await updatePaymentIntent(cartItemsToSend, paymentIntentId);
				};
				updatePayment();
			}
		}
	}, [cartItems, paymentIntentId]);

	const addToCart = (product) => {
		setCartItems((currentItems) => {
			const isExistingItem = currentItems.find((item) => item.id === product.id);

			if (isExistingItem) {
				// If it exists, increase quantity
				return currentItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
			}

			// If it doesn't exist, add new item with quantity 1
			return [...currentItems, { ...product, quantity: 1 }];
		});
	};

	const removeItemFromCart = (productId) => {
		setCartItems((currentItems) => {
			const item = currentItems.find((item) => item.id === productId);

			if (item.quantity > 1) {
				return currentItems.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
			} else {
				return currentItems.filter((item) => item.id !== productId);
			}
		});
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeItemFromCart,
				paymentIntentId,
				clientSecret,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
