import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [isProcessing, setIsProcessing] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [isPaymentElementReady, setIsPaymentElementReady] = useState(false);

	const handlePayment = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			setErrorMessage('Payment system not initialized.');
			return;
		}

		setIsProcessing(true);
		setErrorMessage(null);

		try {
			const { error } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${window.location.origin}/success`,
				},
			});

			if (error) {
				setErrorMessage(error.message || 'Payment failed.');
				console.error('Payment error:', error);
			}
		} catch (err) {
			setErrorMessage('An unexpected error occurred.');
			console.error('Payment error:', err);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<form onSubmit={handlePayment}>
			<PaymentElement onReady={() => setIsPaymentElementReady(true)} />
			{errorMessage && <div className='error-message'>{errorMessage}</div>}
			<button className='checkout-btn' type='submit' disabled={!stripe || !isPaymentElementReady || isProcessing}>
				{isProcessing ? 'Processing...' : 'Pay Now'}
			</button>
		</form>
	);
}
