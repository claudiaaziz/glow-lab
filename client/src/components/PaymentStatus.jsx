import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import { formatPrice } from '../utils/formatters';
import StripeWrapper from './StripeWrapper';
import '../styles/PaymentStatus.css';

export default function PaymentStatus() {
	const [searchParams] = useSearchParams();
	const clientSecret = searchParams.get('payment_intent_client_secret');

	return (
		<StripeWrapper clientSecret={clientSecret}>
			<PaymentStatusContent />
		</StripeWrapper>
	);
}

const PaymentStatusContent = () => {
	const navigate = useNavigate();
	const [paymentDetails, setPaymentDetails] = useState(null);
	const stripe = useStripe();
	const [searchParams] = useSearchParams();
	const clientSecret = searchParams.get('payment_intent_client_secret');

	useEffect(() => {
		const fetchPaymentDetails = async () => {
			if (!stripe || !clientSecret) return;

			try {
				const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
				setPaymentDetails({
					amount: paymentIntent.amount / 100,
					status: paymentIntent.status,
					id: paymentIntent.id,
				});
			} catch (error) {
				console.error('Error fetching payment details:', error);
			}
		};

		fetchPaymentDetails();
	}, [stripe, clientSecret]);

	if (!paymentDetails) return <div className='loading-container'>Loading...</div>;

	const getStatusContent = () => {
		switch (paymentDetails.status) {
			case 'succeeded':
				return {
					title: 'Payment Successful!',
					message: 'Thank you for shopping with Cozy Threads!',
				};
			case 'processing':
				return {
					title: 'Payment Processing',
					message: "Your payment is being processed. We'll update you when it's complete.",
				};
			case 'requires_payment_method':
				return {
					title: 'Payment Failed',
					message: 'Please try another payment method.',
				};
			default:
				return {
					title: 'Payment Status',
					message: `Status: ${paymentDetails.status}`,
				};
		}
	};

	const statusContent = getStatusContent();

	return (
		<div className='payment-status'>
			<div className='status-card'>
				<h1>{statusContent.title}</h1>
				<p className='message'>{statusContent.message}</p>
				<p>Amount: ${formatPrice(paymentDetails.amount)}</p>
				<p>Status: {paymentDetails.status}</p>
				<p>Order ID: {paymentDetails.id}</p>
				<button onClick={() => navigate('/')} className='back-home'>
					Back to Shop
				</button>
			</div>
		</div>
	);
};
