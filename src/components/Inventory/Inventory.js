import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import app from "../../firebase.init";

const auth = getAuth(app);
const Inventory = () => {
    const [user] = useAuthState(auth);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3030/items`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);
    const handleDelete = (_id) => {
        const confirmation = window.confirm("Are you sure, you want to delete this product?");
        const deleteItem = async () => {
            try {
                const { data } = await axios.delete(`http://localhost:3030/delete/${_id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
            } catch (error) {
                if (error.response.status === 403) {
                    toast.error("Forbidden Acces. You are logged out");
                    signOut(auth);
                }
            }
        };
        if (confirmation) {
            deleteItem();
            const newProducts = products.filter((product) => product._id != _id);
            setProducts(newProducts);
            toast("Product Deleted");
        }
    };
    return (
        <div className="container pb-16 pt-16">
            <div className="lg:flex lg:justify-between items-center">
                <h1 className="text-4xl py-3">Inventory</h1>{" "}
                <Link className="inline-block py-2 px-6 border" to="/add-item">
                    Add Item
                </Link>
            </div>
            <table border="1" width="100%" className="mt-5">
                <thead>
                    <tr>
                        <th>Name </th>
                        <th>Price </th>
                        <th>Quantity </th>
                        <th>Supplier </th>
                        <th>Action </th>
                    </tr>
                </thead>

                <tbody>
                    {products?.map((product) => (
                        <tr key={product._id} className="space-y-3">
                            <th>{product.name}</th>
                            <td>{product.price} Tk</td>
                            <td>{product.quantity == 0 ? <p className="text-rose-500">Sold Out</p> : product.quantity}</td>
                            <td>{product.supplier}</td>
                            <td>
                                <Link className="inline-block py-2 mr-3 px-6 border" to={`/inventory/${product._id}`}>
                                    Update Item
                                </Link>
                                <button
                                    onClick={() => {
                                        handleDelete(product._id);
                                    }}
                                    className="inline-block py-2 px-6 border"
                                >
                                    Delete Item
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;
