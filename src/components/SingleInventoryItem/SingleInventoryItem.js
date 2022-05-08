import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SingleInventoryItem = () => {
    const [product, setProduct] = useState({ name: "", price: "", quantity: "", desc: "", supplier: "", image: "" });
    const { _id } = useParams();

    const [product_quantity, setProduct_quantity] = useState();
    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get(`https://hasan-inventory.herokuapp.com/item/${_id}`, {
                // const { data } = await axios.get(`https://hasan-inventory.herokuapp.com/item/${_id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            setProduct(data);
            setProduct_quantity(data.quantity);
        };
        getProduct();
    }, []);

    let productName = product?.name;
    let productPrice = product?.price;
    let productQuantity = product?.quantity;
    let productDesc = product?.desc;
    let productSupplier = product?.supplier;
    let productImage = product?.image;

    const updateProduct = (product) => {
        const setProduct = async () => {
            const { data } = await axios.post(`https://hasan-inventory.herokuapp.com/additem`, product, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            if (data.success) {
                toast.success("Product Updated");
            } else {
                toast.error("Failed to update product");
            }
        };
        setProduct();
    };
    const quantityUpdate = (updatedQuantity) => {
        const { quantity, ...rest } = product;
        const newProduct = { quantity: updatedQuantity, ...rest };
        setProduct(newProduct);
    };
    const stockRef = useRef();

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

    return (
        <div>
            <div className="container py-16">
                <div className="single-item">
                    <div className="grid lg:grid-cols-2 items-center gap-7">
                        <div>
                            <img src={productImage} alt="" />
                        </div>
                        <div>
                            <h4 className=" pb-3">ID: {product._id}</h4>
                            <h1 className="text-4xl font-medium pb-8">{productName}</h1>

                            <div className="quantity pb-3">
                                <i className="text-3xl fas fa-boxes  mr-2"></i>
                                <span className="text-xl">{product.quantity <= 0 ? <span className="text-rose-500">Out of stock</span> : `${product.quantity} left at stock`}</span>
                            </div>
                            <div className="supplier text-lg pb-3">
                                <i className="text-3xl fas fa-truck  mr-2"></i> <span className="text-xl">{product.supplier}</span>
                            </div>
                            <div className="price text-lg pb-3">
                                <i className="text-3xl fas fa-dollar-sign mr-2"></i> <span className="text-xl">{product.price}</span>
                            </div>
                            <div className="pb-5">{productDesc}</div>
                            {productQuantity <= 0 ? (
                                ""
                            ) : (
                                <button onClick={handleReduceStock} className=" bg-[#dfa761] hover:bg-[#c68f4b] inline-block py-2 px-6 border">
                                    Delivered
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pb-10">
                <div className="border p-8 mx-auto max-w-[600px] mt-12 mb-5">
                    <h1 className="text-3xl font-medium text-center mb-3">Restock Item</h1>
                    <form onSubmit={handleSubmitStock} className="space-y-4">
                        <input className="border py-1 px-3 w-full" ref={stockRef} name="stock" type="number" placeholder="Add Stock Quantity" required />
                        <br />
                        <input className="border px-7 py-2 bg-[#dfa761] hover:bg-[#c68f4b] cursor-pointer" type="submit" value="Add to stock" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SingleInventoryItem;
