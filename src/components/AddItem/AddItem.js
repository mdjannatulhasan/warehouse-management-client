import React, { useRef } from "react";

const AddItem = () => {
    const productNameRef = useRef("");
    const productPriceRef = useRef("");
    const productQuantityRef = useRef("");
    const productDescRef = useRef("");

    const handleSubmit = () => {};
    return (
        <div className="container">
            <div className="border p-8 mx-auto max-w-[600px] mt-9">
                <h1 className="text-4xl font-medium mb-9 text-center">Please Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="border py-1 px-3 w-full" ref={productNameRef} type="text" placeholder="Product Name" required />
                    <br />
                    <input className="border py-1 px-3 w-full" ref={productPriceRef} type="number" placeholder="Product Price" required />
                    <br />
                    <input className="border py-1 px-3 w-full" ref={productQuantityRef} type="number" placeholder="Product Quantity" required />
                    <br />
                    <textarea className="border py-1 px-3 w-full" ref={productDescRef} placeholder="Product Quantity"></textarea>
                    <br />
                    <input className="border px-7 py-2 bg-blue-400 cursor-pointer" type="submit" value="Add Product" />
                </form>
            </div>
        </div>
    );
};

export default AddItem;
