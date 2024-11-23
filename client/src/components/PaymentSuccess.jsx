import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import { formatPrice } from '../utils/formatters';
import StripeWrapper from './StripeWrapper';
import '../styles/PaymentSuccess.css';

export default function PaymentSuccess() {
	const [searchParams] = useSearchParams();
	const clientSecret = searchParams.get('payment_intent_client_secret');

	return (
		<StripeWrapper clientSecret={clientSecret}>
			<PaymentSuccessContent />
		</StripeWrapper>
	);
}

const PaymentSuccessContent = () => {
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
				console.log('fetchPaymentDetails 🩷 paymentIntent:', paymentIntent);
			} catch (error) {
				console.error('Error fetching payment details:', error);
			}
		};

		fetchPaymentDetails();
	}, [stripe, clientSecret]);

	if (!paymentDetails) return <div>Loading...</div>;

	return (
		<div className='payment-success'>
			<div className='success-card'>
				<h1>Payment Successful!</h1>
				<p className='thank-you'>Thank you for shopping with Cozy Threads!</p>
				<p>Amount paid: ${formatPrice(paymentDetails.amount)}</p>
				<p>Status: {paymentDetails.status}</p>
				<p>Order ID: {paymentDetails.id}</p>
				<button onClick={() => navigate('/')} className='back-home'>
					Back to Shop
				</button>
			</div>
		</div>
	);
};
