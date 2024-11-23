import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import '../styles/ShoppingCart.css';
import { useStripeSetup } from '../hooks/useStripeSetup';
import { createPaymentIntent, updatePaymentIntent } from '../services/stripe';
import { formatPrice } from '../utils/formatters';

export default function ShoppingCart({ onClose }) {
	const { cartItems, removeItemFromCart } = useContext(CartContext);
	const stripePromise = useStripeSetup();
	const [clientSecret, setClientSecret] = useState(null);
	const [paymentIntentId, setPaymentIntentId] = useState(null);

	const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	useEffect(() => {
		if (totalPrice > 0) {
			const cartItemsToSend = cartItems.map((item) => ({
				id: item.id,
				quantity: item.quantity,
			}));

			const managePaymentIntent = async () => {
				try {
					if (!paymentIntentId) {
						// Create a new PaymentIntent
						const { clientSecret, paymentIntentId: newPaymentIntentId } = await createPaymentIntent(cartItemsToSend);
						setClientSecret(clientSecret);
						setPaymentIntentId(newPaymentIntentId);
					} else {
						// Update existing PaymentIntent
						await updatePaymentIntent(cartItemsToSend, paymentIntentId);
					}
				} catch (error) {
					console.error('Error managing PaymentIntent:', error);
				}
			};

			managePaymentIntent();
		}
	}, [totalPrice]);

	if (!stripePromise) {
		// Loading Indicator
		return <div></div>;
	}

	return (
		<div className='cart-preview'>
			<div className='cart-preview-header'>
				<h3>Your Cart</h3>
				<button onClick={onClose} className='close-btn'>
					&times;
				</button>
			</div>

			{cartItems.length === 0 ? (
				<div className='empty-cart'>
					<h4>Your cart is empty</h4>
					<p>Add some items to get started!</p>
				</div>
			) : (
				<>
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
							<Elements stripe={stripePromise} options={{ clientSecret }}>
								<CheckoutForm />
							</Elements>
						)}
					</div>
				</>
			)}
		</div>
	);
}
