import Header from './components/Header';
import ProductList from './components/ProductList';
import { CartProvider } from './context/CartContext';

export default function App() {
	return (
		<CartProvider>
			<div className='app-container'>
				<Header />
				<ProductList />
			</div>
		</CartProvider>
	);
}
