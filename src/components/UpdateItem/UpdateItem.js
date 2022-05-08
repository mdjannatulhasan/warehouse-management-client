import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateItem = () => {
    const [product, setProduct] = useState({ name: "", price: "", quantity: "", desc: "" });
    const { _id } = useParams();

    const [product_quantity, setProduct_quantity] = useState();
    useEffect(() => {
        fetch(`http://localhost:3030/item/${_id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setProduct_quantity(data.quantity);
            });
    }, []);

    let productName = product?.name;
    let productPrice = product?.price;
    let productQuantity = product?.quantity;
    let productStockQuantity = product?.quantity;
    let productDesc = product?.desc;

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
    const quantityUpdate = (updatedQuantity) => {
        const { quantity, ...rest } = product;
        const newProduct = { quantity: updatedQuantity, ...rest };
        setProduct(newProduct);
    };
    const stockRef = useRef();
    const handleSubmit = (event) => {
        event.preventDefault();
        const formProduct = { name: productName, price: productPrice, quantity: productQuantity, desc: productDesc };

        updateProduct(formProduct);
    };
    const handleSubmitStock = (event) => {
        event.preventDefault();
        const totalQuantity = parseInt(productQuantity) + parseInt(event.target.stock.value);
        const formProduct = { name: productName, price: productPrice, quantity: totalQuantity, desc: productDesc };
        quantityUpdate(totalQuantity);
        updateProduct(formProduct);
    };
    const handleReduceStock = () => {
        const totalQuantity = parseInt(productQuantity) - 1;
        const formProduct = { name: productName, price: productPrice, quantity: totalQuantity, desc: productDesc };
        quantityUpdate(totalQuantity);
        updateProduct(formProduct);
    };
    const handleNameChange = (event) => {
        const { name, ...rest } = product;
        const newProduct = { name: event.target.value, ...rest };
        setProduct(newProduct);
    };
    const handlePriceChange = (event) => {
        const { price, ...rest } = product;
        const newProduct = { price: event.target.value, ...rest };
        setProduct(newProduct);
    };
    const handleQuantityChange = (event) => {
        quantityUpdate(event.target.value);
    };
    const handleDescChange = (event) => {
        const { desc, ...rest } = product;
        const newProduct = { desc: event.target.value, ...rest };
        setProduct(newProduct);
    };

    return (
        <div>
            <div className="container">
                <div className="border p-8 mx-auto max-w-[600px] mt-9">
                    <h1 className="text-3xl font-medium mb-9 text-center">{product.name}</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input className="border py-1 px-3 w-full" value={productName} type="text" placeholder="Product Name" onChange={handleNameChange} required />
                        <br />
                        <input className="border py-1 px-3 w-full" onChange={handlePriceChange} value={productPrice} type="number" placeholder="Product Price" required />
                        <br />
                        <input className="border py-1 px-3 w-full" value={productQuantity} type="number" placeholder="Product Quantity" onChange={handleQuantityChange} required />
                        <br />
                        <textarea className="border py-1 px-3 w-full" onChange={handleDescChange} value={productDesc} placeholder="Product Description"></textarea>
                        <br />
                        <input className="border px-7 py-2 bg-blue-400 cursor-pointer" type="submit" value="Update Product" />
                    </form>
                </div>
            </div>
            <div className="container">
                {productQuantity <= 0 ? (
                    <p className="text-rose-500">Stock Out</p>
                ) : (
                    <button onClick={handleReduceStock} className="inline-block py-2 px-6 border">
                        Delivered
                    </button>
                )}
            </div>
            <div className="container">
                <div className="border p-8 mx-auto max-w-[600px] mt-12 mb-5">
                    <h1 className="text-4xl font-medium mb-9 text-center">Restock Item</h1>
                    <form onSubmit={handleSubmitStock} className="space-y-4">
                        <input className="border py-1 px-3 w-full" ref={stockRef} name="stock" type="number" placeholder="Add Stock Quantity" required />
                        <br />
                        <input className="border px-7 py-2 bg-blue-400 cursor-pointer" type="submit" value="Add to stock" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateItem;
