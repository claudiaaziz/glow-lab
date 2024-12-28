import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/ProductCard.css';
import { formatPrice } from '../utils/formatters';

const AddToCartIcon = () => {
	return (
		<div className='add-cart-icon-wrapper'>
			<svg
				version='1.1'
				role='presentation'
				aria-hidden='true'
				xmlns='http://www.w3.org/2000/svg'
				x='0px'
				y='0px'
				width='20px'
				height='20px'
				viewBox='0 0 18.34 21.688'
				className='cart-icon'
			>
				<path fill='#f9f8f9' d='M17.799,21.188H0.542l1.24-15.506h14.776L17.799,21.188z'></path>
				<path d='M17.02,5.182h-2.037C14.801,2.298,12.191,0,9,0S3.199,2.298,3.018,5.182H1.32L0,21.688h18.34L17.02,5.182z M9,1c2.636,0,4.779,1.851,4.964,4.182H4.036C4.221,2.851,6.364,1,9,1z M2.244,6.182h13.853l1.16,14.506H1.083L2.244,6.182z'></path>
			</svg>
			<svg className='plus-icon' width='5' height='5' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
				<path d='M6 1v10M1 6h10' strokeWidth='2' strokeLinecap='round' />
			</svg>
		</div>
	);
};

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
					<span className='price'>${formatPrice(price)}</span>
					<button className='add-to-cart-btn' onClick={() => addToCart(product)}>
						<AddToCartIcon />
					</button>
				</div>
			</div>
		</div>
	);
}
