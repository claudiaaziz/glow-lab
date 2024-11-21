import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

export function useProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const data = await fetchProducts();
				setProducts(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		getProducts();
	}, []);

	return { products, loading, error };
}
