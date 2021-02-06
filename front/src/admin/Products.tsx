import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Product } from '../interfaces/product';
import Wrapper from './Wrapper'

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/products');
                const data = await response.json();
                setProducts(data)
            }
        )();
    }, [])

    const del = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await fetch(`http://localhost:8000/api/products/${id}`, {
                method: 'DELETE'
            });
    
            setProducts(products.filter((product: Product) => product.id !== id));
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to="/admin/products/create" className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Likes</th>
                        <th>Header</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(
                        (product: Product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img src={product.image} height="180" alt=""/></td>
                                <td>{product.title}</td>
                                <td>{product.likes}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/admin/products/${product.id}/edit`} 
                                            className="btn btn-sm btn-outline-secondary">
                                            Edit
                                        </Link>
                                        <a href="#" className="btn btn-sm btn-outline-secondary"
                                            onClick={() => del(product.id)}>
                                            Delete
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}

export default Products
