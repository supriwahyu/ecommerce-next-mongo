import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);
    useEffect(() => {
        fetchCategories();
    }, []);
    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }
    async function saveCategory(ev) {
        ev.preventDefault();
        const data = { name, parentCategory };
        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else {
            await axios.post('/api/categories', data);
        }
        setName('');
        fetchCategories();
    }
    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
    }
    function deleteCategory(category) {
        swal.fire({
            title: 'Are You Sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            reverseButtons: true,
            confirmButtonColor: '#d55',
            didOpen: () => {
                // run when swal is opened...
            },
            didClose: () => {
                // run when swal is closed...
            }
        }).then(async result => {
            const { _id } = category;
            if (result.isConfirmed) {
                await axios.delete('/api/categories?_id=' + _id);
                fetchCategories();
            }
        }).catch(error => {
            // when promise rejected...
        });
    }
    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category ${editedCategory.name}` : 'New Category Name'}</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input value={name} onChange={ev => setName(ev.target.value)} className="mb-0" type="text" placeholder="Category Name" />
                <select className="mb-0" onChange={ev => setParentCategory(ev.target.value)} value={parentCategory}>
                    <option value="">No Parent Category</option>
                    {categories.length > 0 && categories.map(category => (
                        <option value={category._id}>{category.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn btn-primary py-1">Save</button>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Parent Category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <button onClick={() => editCategory(category)} className="btn btn-primary mr-1">Edit</button>
                            <button onClick={() => deleteCategory(category)} className="btn btn-primary">Delete</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default withSwal(({ swal, ref }) => (
    <Categories swal={swal} />
))