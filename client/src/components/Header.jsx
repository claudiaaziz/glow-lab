import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import CartPreview from './CartPreview';
import '../styles/Header.css';

export default function Header() {
	const { cartItems } = useContext(CartContext);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

	return (
		<header className='main-header'>
			<h1>Cozy Threads</h1>
			<nav>
				<ul>
					{/* <li>Shop</li> */}
					<li onClick={() => setIsCartOpen(!isCartOpen)}>Cart ({cartQuantity})</li>
				</ul>
			</nav>
			{isCartOpen && <CartPreview onClose={() => setIsCartOpen(false)} />}
		</header>
	);
}
