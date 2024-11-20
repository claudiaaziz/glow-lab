import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
	'pk_test_51O7Hv7Fw5RLerdgqx3iq2C635BDKrG1EhItb2Y1XER6ib5vp6SHZlcjff1WxhJoZQnbpMkkov9yfkDmREImrza0700dE7T7COk'
);

const options = {
	appearance: {
		theme: 'stripe',
	},
};

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Elements stripe={stripePromise} options={options}>
			<App />
		</Elements>
	</StrictMode>
);
