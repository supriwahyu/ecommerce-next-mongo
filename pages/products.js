import { useEffect, useState } from 'react';
import Layout from '/components/Layout'
import Link from "next/link"
import axios from 'axios';

export default function Products() {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		axios.get('/api/products').then(response => {
			setProducts(response.data);
		})
	}, []);
	return (
		<Layout>
			<Link className="bg-blue-900 text-white rounded-md py-1 px-2" href={"/products/new"}>Add new product</Link>
			<table className='basic mt-2'>
				<thead>
					<tr>
						<td>Product Name</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{products.map(products => (
						<tr>
							<td>{products.title}</td>
							<td>button</td>
						</tr>
					))}
				</tbody>
			</table>
		</Layout>
	);
}