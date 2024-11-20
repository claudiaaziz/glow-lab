import { useState, useEffect } from 'react';

export function useProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/products');
				if (!response.ok) {
					throw new Error('Failed to fetch products');
				}
				const data = await response.json();
				setProducts(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return { products, loading, error };
}
