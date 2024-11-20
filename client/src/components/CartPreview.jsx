import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/CartPreview.css';
import { v4 as uuidv4 } from 'uuid';
import { CardElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CartPreview({ onClose }) {
	const { cartItems, removeItemFromCart } = useContext(CartContext);
	const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	const stripe = useStripe();
	const elements = useElements();
	const [clientSecret, setClientSecret] = useState('');
	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState(null);

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads

		const totalPriceInCents = totalPrice * 100;

		const fetchClientSecret = async () => {
			const res = await fetch('http://localhost:3000/create-payment-intent', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount: totalPriceInCents }),
			});

			const data = await res.json();
			debugger;
			setClientSecret(data.clientSecret);
		};

		fetchClientSecret();
	}, []);

	const handleCheckout = async (e) => {
		e.preventDefault();
		setIsProcessing(true);
		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: 'http://localhost:3000/checkout/success', // Update with your return URL
			},
		});
		const idempotencyKey = uuidv4();

		const response = await fetch(`http://localhost:3000/v1/payment_intents/${idempotencyKey}`, {
			method: 'POST',
			body: JSON.stringify({ payment: totalPrice }),
		});
		const idk = await response.json();
		debugger;
		console.log('handleCheckout 🩷 response:', response);

		const result = await stripe.confirmCardPayment(idk, {
			payment_method: {
				// card: cardElement,
				// billing_details: { name: 'Customer Name' },
			},
		});
		if (error) {
			setPaymentStatus(`Error: ${error.message}`);
			setIsProcessing(false);
		} else if (paymentIntent.status === 'succeeded') {
			setPaymentStatus('Payment Successful!');
			setIsProcessing(false);
		}
	};

	if (!clientSecret) {
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
				<button className='checkout-btn' onClick={handleCheckout} type='submit' disabled={!stripe || isProcessing}>
					{isProcessing ? 'Processing...' : 'Pay Now'}
				</button>
			</div>

			{clientSecret && <PaymentElement clientSecret={clientSecret} />}
			{paymentStatus && <div>{paymentStatus}</div>}
		</div>
	);
}
