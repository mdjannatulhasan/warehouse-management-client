import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Inventory = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`https://hasan-inventory.herokuapp.com/items`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);
    const navigate = useNavigate();
    return (
        <div className="container">
            <h1 className="text-center text-4xl py-3">This is Inventory</h1>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
                {products.map((product) => (
                    <div key={product._id} className="space-y-3">
                        <h3>Name: {product.name}</h3>
                        <h3>Price: {product.price}</h3>
                        <h4>Quantity: {product.quantity}</h4>
                        <p>Description: {product.desc.substring(0, 200)}</p>
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

export default Inventory;
