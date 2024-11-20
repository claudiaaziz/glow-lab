import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/CartPreview.css';

export default function CartPreview({ onClose }) {
	const { cartItems } = useContext(CartContext);

	const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className='cart-preview'>
			<div className='cart-preview-header'>
				<h3>Shopping Cart</h3>
				<button onClick={onClose}>&times;</button>
			</div>

			<div className='cart-items'>
				{cartItems.map((item) => (
					<div key={item.id} className='cart-item'>
						<img src={item.image} alt={item.name} />
						<div className='cart-item-details'>
							<h4>{item.name}</h4>
							<p>Quantity: {item.quantity}</p>
							<p>${(item.price * item.quantity).toFixed(2)}</p>
						</div>
					</div>
				))}
			</div>

			<div className='cart-preview-footer'>
				<div className='cart-total'>
					<strong>Total: ${totalPrice.toFixed(2)}</strong>
				</div>
				<button className='checkout-btn'>Checkout</button>
			</div>
		</div>
	);
}
