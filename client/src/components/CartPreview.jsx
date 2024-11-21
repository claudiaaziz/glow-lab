import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import '../styles/CartPreview.css';
import { useStripeSetup } from '../hooks/useStripeSetup';
import { createPaymentIntent } from '../services/stripe';
import { convertToCents, formatPrice } from '../utils/formatters';

export default function CartPreview({ onClose }) {
	const { cartItems, removeItemFromCart } = useContext(CartContext);
	const stripePromise = useStripeSetup();
	const [clientSecret, setClientSecret] = useState(null);

	const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	useEffect(() => {
		if (totalPrice > 0) {
			const setupPaymentIntent = async () => {
				try {
					const { clientSecret } = await createPaymentIntent(convertToCents(totalPrice));
					setClientSecret(clientSecret);
				} catch (error) {
					console.error('Error creating payment intent:', error);
				}
			};

			setupPaymentIntent();
		}
	}, [totalPrice]);

	if (!stripePromise) {
		return <div>Loading...</div>;
	}

	return (
		<div className='cart-preview'>
			<div className='cart-preview-header'>
				<h3>Your Cart</h3>
				<button onClick={onClose} className='close-btn'>
					&times;
				</button>
			</div>

			<div className='cart-items'>
				{cartItems.map((item) => (
					<div key={item.id} className='cart-item'>
						<img src={item.image} alt={item.name} />
						<div className='cart-item-details'>
							<div className='cart-item-header'>
								<h4>{item.name}</h4>
								<button onClick={() => removeItemFromCart(item.id)} className='remove-item-btn'>
									&times;
								</button>
							</div>
							<p>Quantity: {item.quantity}</p>
							<p>${formatPrice(item.price * item.quantity)}</p>
						</div>
					</div>
				))}
			</div>

			<div className='cart-preview-footer'>
				<div className='cart-total'>
					<strong>Total: ${formatPrice(totalPrice)}</strong>
				</div>
				{clientSecret && (
					<Elements stripe={stripePromise} options={{ clientSecret }} key={clientSecret}>
						<CheckoutForm onClose={onClose} />
					</Elements>
				)}
			</div>
		</div>
	);
}
