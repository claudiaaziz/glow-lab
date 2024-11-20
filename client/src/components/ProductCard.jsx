import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/ProductCard.css';

export default function ProductCard({ product }) {
	const { addToCart } = useContext(CartContext);
	const { name, description, price, image } = product;

	return (
		<div className='product-card'>
			<img src={image} alt={name} className='product-image' />
			<div className='product-info'>
				<h2>{name}</h2>
				<p>{description}</p>
				<div className='product-footer'>
					<span className='price'>${price.toFixed(2)}</span>
					<button className='add-to-cart-btn' onClick={() => addToCart(product)}>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}
