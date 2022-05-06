import { prettyDOM } from "@testing-library/react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateItem = () => {
    const [product, setProduct] = useState({});
    const { _id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3030/item/${_id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, []);

    const productNameRef = useRef("");
    const productPriceRef = useRef("");
    const productQuantityRef = useRef("");
    const productStockQuantityRef = useRef("");
    const productDescRef = useRef("");

    const updateProduct = (product) => {
        fetch("http://localhost:3030/additem", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(product),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success("Product Updated");
                } else {
                    toast.error("Failed to update product");
                }
            });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const formProduct = { name: productNameRef.current.value, price: productPriceRef.current.value, quantity: productQuantityRef.current.value, desc: productDescRef.current.value };

        updateProduct(formProduct);
    };
    const handleSubmitStock = (event) => {
        event.preventDefault();
        const formProduct = { name: product.name, price: product.price, quantity: parseInt(productStockQuantityRef.current.value) + parseInt(product.quantity), desc: product.desc };
        updateProduct(formProduct);
    };

    return (
        <div>
            <div className="container">
                <div className="border p-8 mx-auto max-w-[600px] mt-9">
                    <h1 className="text-3xl font-medium mb-9 text-center">Update "{product.name}"</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input className="border py-1 px-3 w-full" ref={productNameRef} type="text" placeholder="Product ID" value={product._id} disabled required />
                        <br />
                        <input className="border py-1 px-3 w-full" value={product.name} ref={productNameRef} type="text" placeholder="Product Name" required />
                        <br />
                        <input className="border py-1 px-3 w-full" value={product.price} ref={productPriceRef} type="number" placeholder="Product Price" required />
                        <br />
                        <input className="border py-1 px-3 w-full" value={product.quantity} ref={productQuantityRef} type="number" placeholder="Product Quantity" required />
                        <br />
                        <textarea className="border py-1 px-3 w-full" value={product.desc} ref={productDescRef} placeholder="Product Description"></textarea>
                        <br />
                        <input className="border px-7 py-2 bg-blue-400 cursor-pointer" type="submit" value="Update Product" />
                    </form>
                </div>
            </div>
            <div className="container">
                <div className="border p-8 mx-auto max-w-[600px] mt-12 mb-5">
                    <h1 className="text-4xl font-medium mb-9 text-center">Restock Item</h1>
                    <form onSubmit={handleSubmitStock} className="space-y-4">
                        <input className="border py-1 px-3 w-full" ref={productStockQuantityRef} type="number" placeholder="Add Stock Quantity" required />
                        <br />
                        <input className="border px-7 py-2 bg-blue-400 cursor-pointer" type="submit" value="Add to stock" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateItem;
