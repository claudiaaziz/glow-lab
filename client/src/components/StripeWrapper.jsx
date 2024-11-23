import { Elements } from '@stripe/react-stripe-js';
import { useStripeSetup } from '../hooks/useStripeSetup';

export default function StripeWrapper({ children, clientSecret }) {
	const stripePromise = useStripeSetup();

	if (!stripePromise || !clientSecret) return null;

	return (
		<Elements stripe={stripePromise} options={{ clientSecret }}>
			{children}
		</Elements>
	);
}
