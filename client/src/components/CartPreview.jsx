import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import '../styles/CartPreview.css';

export default function CartPreview({ onClose }) {
	const { cartItems, removeItemFromCart } = useContext(CartContext);

	const [stripePromise, setStripePromise] = useState(null);
	const [clientSecret, setClientSecret] = useState(null);

	useEffect(() => {
		const getPublishableKey = async () => {
			try {
				const response = await fetch('/stripe/config');
				const { publishableKey } = await response.json();
				setStripePromise(loadStripe(publishableKey));
			} catch (error) {
				console.error('Error loading Stripe:', error);
			}
		};

		getPublishableKey();
	}, []);

	const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	useEffect(() => {
		if (totalPrice > 0) {
			const createPaymentIntent = async () => {
				try {
					const response = await fetch('/stripe/create-payment-intent', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							amount: Math.round(totalPrice * 100), // amount in cents
						}),
					});

					const data = await response.json();
					setClientSecret(data.clientSecret);
				} catch (error) {
					console.error('Error creating payment intent:', error);
				}
			};

			createPaymentIntent();
		}
	}, []);

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
							<p>${(item.price * item.quantity).toFixed(2)}</p>
						</div>
					</div>
				))}
			</div>

			<div className='cart-preview-footer'>
				<div className='cart-total'>
					<strong>Total: ${totalPrice.toFixed(2)}</strong>
				</div>
				{clientSecret && (
					<Elements stripe={stripePromise} options={{ clientSecret }}>
						<CheckoutForm clientSecret={clientSecret} onClose={onClose} />
					</Elements>
				)}
			</div>
		</div>
	);
}
