import '../styles/PaymentSuccess.css';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
	const navigate = useNavigate();

	return (
		<div className='payment-success'>
			<div className='success-card'>
				<h2>Payment successful!</h2>
				<p>Thank you for shopping with Cozy Threads!</p>
				<button onClick={() => navigate('/')} className='back-home'>
					Back to Shop
				</button>
			</div>
		</div>
	);
}
