import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import CartPreview from './ShoppingCart';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {
	const { cartItems } = useContext(CartContext);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

	const navigate = useNavigate();

	const CartIcon = () => {
		return (
			<svg
				version='1.1'
				role='presentation'
				aria-hidden='true'
				xmlns='http://www.w3.org/2000/svg'
				x='0px'
				y='0px'
				width='30px'
				height='30px'
				viewBox='0 0 18.34 21.688'
			>
				<path fill='#FFFFFF' d='M17.799,21.188H0.542l1.24-15.506h14.776L17.799,21.188z'></path>
				<path d='M17.02,5.182h-2.037C14.801,2.298,12.191,0,9,0S3.199,2.298,3.018,5.182H1.32L0,21.688h18.34L17.02,5.182z M9,1c2.636,0,4.779,1.851,4.964,4.182H4.036C4.221,2.851,6.364,1,9,1z M2.244,6.182h13.853l1.16,14.506H1.083L2.244,6.182z'></path>
			</svg>
		);
	};

	return (
		<header className='main-header'>
			<h1 onClick={() => navigate('/')}>Glow Lab</h1>
			<nav>
				<ul>
					{/* <li>Shop</li> */}
					<li onClick={() => setIsCartOpen(!isCartOpen)} className={`cart-icon ${isCartOpen && 'cart-icon-active'}`}>
						<CartIcon />
						<span className='cart-quantity'>{cartQuantity}</span>
					</li>
				</ul>
			</nav>
			{isCartOpen && <CartPreview onClose={() => setIsCartOpen(false)} />}
		</header>
	);
}
