import Header from './components/Header';
import ProductList from './components/ProductList';
import './styles/global.css';

export default function App() {
	return (
		<div className='app-container'>
			<Header />
			<ProductList />
		</div>
	);
}
