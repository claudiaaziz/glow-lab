import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm({ onClose }) {
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessing, setIsProcessing] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const handlePayment = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) setErrorMessage('An unexpected error occurred. Please refresh the page.');

		setIsProcessing(true);
		setErrorMessage(null);

		try {
			const { error, paymentIntent } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${window.location.origin}/success`,
				},
			});

			if (error) {
				setErrorMessage(error.message);
			} else if (paymentIntent && paymentIntent.status === 'succeeded') {
				onClose();
				window.location.href = `/success`;
			}
		} catch {
			setErrorMessage('An unexpected error occurred.');
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<form onSubmit={handlePayment}>
			<PaymentElement />
			{errorMessage && <div className='error-message'>{errorMessage}</div>}
			<button className='checkout-btn' type='submit' disabled={!stripe || isProcessing}>
				{isProcessing ? 'Processing...' : 'Pay Now'}
			</button>
		</form>
	);
}
