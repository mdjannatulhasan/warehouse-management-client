import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3030/items`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);
    const sixProducts = products.slice(0, 6);
    return (
        <div>
            <div
                className="hero lg:py-40 py-24"
                style={{
                    background: "linear-gradient(to right, rgba(28, 35, 37 , .6), rgba(28, 35, 37, .6)), url('/images/bg-hero.jpeg')",
                    backgroundSize: "cover",
                }}
            >
                <div className="container space-y-3">
                    <h3 className="text-[#dfa761] lg:text-lg font-medium">END-TO-END INVENTORY MANAGEMENT</h3>
                    <h1 className="text-white font-medium lg:text-[48px] pb-2 text-[36px] leading-tight max-w-4xl">A smarter way to inventory, no matter what business you’re in.</h1>
                    <Link className="inline-block border bg-[#dfa761] py-2 px-5 hover:bg-[#c68f4b]" to="/inventory">
                        Go to inventory
                    </Link>
                </div>
            </div>

            <div className="container lg:pt-20 py-16">
                <h2 className="text-text-primary text-4xl text-center pb-10 font-medium">Inventory Items</h2>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
                    {sixProducts.map((product) => (
                        <div key={product._id} className="">
                            <div className="border py-5 px-4">
                                <img src={product.image} alt={product.name} />
                                <div className="px-3 pt-3 text-text-primary space-y-2">
                                    <div className="item-name text-2xl py-2">{product.name}</div>
                                    <div className="price text-lg">
                                        <i className="text-xl fas fa-dollar-sign mr-2"></i> {product.price}
                                    </div>
                                    <div className="quantity text-lg">
                                        <i className="text-xl fas fa-boxes  mr-2"></i>{" "}
                                        {product.quantity <= 0 ? <span className="text-rose-500">Out of stock</span> : `Only ${product.quantity} left at stock`}
                                    </div>
                                    <div className="supplier text-lg">
                                        <i className="text-xl fas fa-truck  mr-2"></i> {product.supplier}
                                    </div>
                                    <div className="pt-2">{product.desc.substring(0, 200)}...</div>
                                    <div className="text-center">
                                        <Link className="py-2 px-4 border my-3 inline-block bg-slate-300 hover:bg-slate-400" to={`/inventory/${product._id}`}>
                                            Update Item
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mx-auto pt-4">
                    <Link className="py-2 px-4 border my-3 inline-block bg-slate-300 hover:bg-slate-400" to={`/inventory`}>
                        Manage Invetories
                    </Link>
                </div>
            </div>
            <div className="bg-[#CAE9F1] py-16">
                <div className="container">
                    <div className="grid grid-cols-2 items-center">
                        <div>
                            <h2 className="title-lg lg:text-5xl text-2xl font-medium">Experience the simplest inventory management software.</h2>
                            <h4 className="title-sm text-gray-600 lg:text-[22px] pt-4 max-w-md">More than 15 million things organized. Get sorted today!</h4>
                        </div>
                        <img src="/images/inventory-summery.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className="container lg:pb-20 lg:pt-10 py-16">
                <h2 className="text-text-primary text-4xl text-center pb-2 font-medium">All the features you'll ever need to manage your business</h2>
                <h4 className="text-xl text-gray-500 text-center pb-10">Give us a try. There's nothing to install. No training manuals needed. No commitments.</h4>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
                    <div className="bg-gradient-to-r from-white to-white hover:from-white hover:to-[#fffdf5] hover:border-blue-950 border border-gray-200 rounded-md p-5 transition duration-200 hover:duration-200">
                        <div className="flex flex-row items-center mb-3">
                            <h4 className="text-xl font-semibold text-md">Inventory Management</h4>
                        </div>
                        <p className="text-gray-600 m-0">Manage your inventory in real time and monitor stock levels. Receive low-inventory alerts and create buy orders to restock your inventory.</p>
                    </div>
                    <div className="bg-gradient-to-r from-white to-white hover:from-white hover:to-[#fffdf5] hover:border-blue-950 border border-gray-200 rounded-md p-5 transition duration-200 hover:duration-200">
                        <div className="flex flex-row items-center mb-3">
                            <h4 className="text-xl font-semibold text-md">Customer Accounts</h4>
                        </div>
                        <p className="text-gray-600 m-0">
                            You can easily keep track of all your client accounts with built-in CRM tools. Add multiple Items, Stocks, and Item history to your account.
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-white to-white hover:from-white hover:to-[#fffdf5] hover:border-blue-950 border border-gray-200 rounded-md p-5 transition duration-200 hover:duration-200">
                        <div className="flex flex-row items-center mb-3">
                            <h4 className="text-xl font-semibold text-md">Locations and Suppliers</h4>
                        </div>
                        <p className="text-gray-600 m-0">
                            Do you have several warehouses, offices, or retail locations? Or multiple suppliers? No worries. Organize your inventory into locations with suppliers to keep track of
                            where it is.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
