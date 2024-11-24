import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { CartProvider } from './context/CartContext';
import PaymentStatus from './components/PaymentStatus';

export default function App() {
	return (
		<CartProvider>
			<Router>
				<div className='app-container'>
					<Header />
					<Routes>
						<Route path='/' element={<ProductList />} />
						<Route path='/payment-status' element={<PaymentStatus />} />
					</Routes>
				</div>
			</Router>
		</CartProvider>
	);
}
