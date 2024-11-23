export const getPublishableKey = async () => {
	const response = await fetch('/stripe/config');
	const { publishableKey } = await response.json();
	return publishableKey;
};

export const createPaymentIntent = async (cartItems) => {
	const response = await fetch('/stripe/create-payment-intent', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cartItems }),
	});
	return response.json();
};

export const updatePaymentIntent = async (cartItems, paymentIntentId) => {
	const response = await fetch(`/stripe/update-payment-intent/${paymentIntentId}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cartItems }),
	});
	return response.json();
};
