export const getPublishableKey = async () => {
	const response = await fetch('/stripe/config');
	const { publishableKey } = await response.json();
	return publishableKey;
};

export const createPaymentIntent = async (amount) => {
	const response = await fetch('/stripe/create-payment-intent', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ amount }),
	});
	return response.json();
};
