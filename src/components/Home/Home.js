import React from "react";
import "./Home.css";

const Home = () => {
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
                    <h1 className="text-white font-medium lg:text-[48px] text-[36px] leading-tight max-w-4xl">A smarter way to inventory, no matter what business you’re in.</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;
