import React, { useRef } from "react";
import { toast } from "react-toastify";

const UpdateItem = () => {
    const productNameRef = useRef("");
    const productPriceRef = useRef("");
    const productQuantityRef = useRef("");
    const productDescRef = useRef("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const product = { name: productNameRef.current.value, price: productPriceRef.current.value, quantity: productQuantityRef.current.value, desc: productDescRef.current.value };

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
                    toast.success("Product Added");
                } else {
                    toast.error("Failed to add product");
                }
            });
    };
    return (
        <div className="container">
            <div className="border p-8 mx-auto max-w-[600px] mt-9">
                <h1 className="text-4xl font-medium mb-9 text-center">Add Single Item</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="border py-1 px-3 w-full" ref={productNameRef} type="text" placeholder="Product Name" required />
                    <br />
                    <input className="border py-1 px-3 w-full" ref={productPriceRef} type="number" placeholder="Product Price" required />
                    <br />
                    <input className="border py-1 px-3 w-full" ref={productQuantityRef} type="number" placeholder="Product Quantity" required />
                    <br />
                    <textarea className="border py-1 px-3 w-full" ref={productDescRef} placeholder="Product Description"></textarea>
                    <br />
                    <input className="border px-7 py-2 bg-blue-400 cursor-pointer" type="submit" value="Add Product" />
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
