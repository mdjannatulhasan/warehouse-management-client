import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import app from "../../firebase.init";

const auth = getAuth(app);

const MyItem = () => {
    const [user] = useAuthState(auth);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getItems = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3030/myitems?email=${user?.email}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
                setProducts(data);
            } catch (error) {
                if (error.response.status === 403) {
                    toast.error("Forbidden Acces");
                }
            }
        };
        getItems();
    }, []);
    const navigate = useNavigate();
    return (
        <div className="container">
            <h1 className="text-center text-4xl py-3">My Items</h1>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
                {products.map((product) => (
                    <div key={product._id} className="space-y-3">
                        <h3>Name: {product.name}</h3>
                        <h3>Price: {product.price}</h3>
                        <h4>Quantity: {product.quantity}</h4>
                        <p>Description: {product.desc}</p>
                        {product.quantity == 0 ? <p className="text-rose-500">Sold Out</p> : ""}
                        <Link className="inline-block py-2 px-6 border" to={`/update-item/${product._id}`}>
                            Update Item
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyItem;
