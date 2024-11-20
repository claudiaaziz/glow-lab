import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [cartItems, setCartItems] = useState([]);

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

	return <CartContext.Provider value={{ cartItems, addToCart }}>{children}</CartContext.Provider>;
}
