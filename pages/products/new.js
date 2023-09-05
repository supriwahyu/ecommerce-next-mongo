import Layout from '/components/Layout'
import axios from "axios"

export default function NewProduct() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');

	async function createProduct() {
		const data = { title, description, price };
		await axios.post('api/products', data);
	}
	return (
		<Layout>
			<h1>New Product</h1>
			<form onSubmit={createProduct}>
				<label>Product Name</label>
				<input type="text" placeholder="Product Name"
					value={title}
					onChange={ev => setTitle(ev.target.value)} />
				<label>Description</label>
				<textarea placeholder="description"
					value={description}
					onChange={ev => setDescription(ev.target.value)}></textarea>
				<label>Price (in USD)</label>
				<input type="number" placeholder="Price"
					value={price}
					onChange={ev => setPrice(ev.target.value)} />
				<button type="submit" classNmae="btn-primary">Save</button>
			</form>
		</Layout>
	);
}