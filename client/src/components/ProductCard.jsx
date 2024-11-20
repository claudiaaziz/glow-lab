export default function ProductCard({ product }) {
	const { name, description, price, image } = product;

	return (
		<div className='product-card'>
			<img src={image} alt={name} className='product-image' />
			<div className='product-info'>
				<h2>{name}</h2>
				<p>{description}</p>
				<span className='price'>${price.toFixed(2)}</span>
			</div>
		</div>
	);
}
