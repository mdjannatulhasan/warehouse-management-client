import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`https://hasan-inventory.herokuapp.com/items`)
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

            <div className="container lg:py-24">
                <div className="grid lg:grid-cols-3 grid-cols-1">
                    {sixProducts.map((product) => (
                        <div key={product._id} className="">
                            {product.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
