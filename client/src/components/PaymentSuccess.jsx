import '../styles/PaymentSuccess.css';

export default function PaymentSuccess() {
	return (
		<div className='payment-success'>
			<div className='success-card'>
				<h2>Payment successful!</h2>
				<p>Thank you for shopping with Cozy Threads!</p>
				<a href='/' className='back-home'>
					Back to Shop
				</a>
			</div>
		</div>
	);
}
