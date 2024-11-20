import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

export default function ProductList() {
	const { products, loading, error } = useProducts();

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='products-grid'>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
