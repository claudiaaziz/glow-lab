import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import PaymentSuccess from './components/PaymentSuccess';
import { CartProvider } from './context/CartContext';

export default function App() {
	return (
		<CartProvider>
			<Router>
				<div className='app-container'>
					<Header />
					<Routes>
						<Route path='/' element={<ProductList />} />
						<Route path='/success' element={<PaymentSuccess />} />
					</Routes>
				</div>
			</Router>
		</CartProvider>
	);
}
