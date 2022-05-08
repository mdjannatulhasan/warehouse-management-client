import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import app from "../../firebase.init";

const auth = getAuth(app);
const Footer = () => {
    const [user] = useAuthState(auth);
    return (
        <div className="bg-[#b9c6c9] py-16">
            <div className="container">
                <div className="grid lg:grid-cols-6 items-center justify-center space-y-5 lg:space-y-0">
                    <Link to="/">
                        <div className="flex items-end space-x-2 lg:col-span-1">
                            <img width="50px" src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="" />
                            <h4 className="uppercase text-xl leading-tight -mb-1 inline-block">
                                Hasan <br /> Inventory
                            </h4>
                        </div>
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:space-x-3 lg:col-span-4 items-center justify-center text-lg">
                        <Link className="hover:text-hover-text" to="/">
                            Home
                        </Link>
                        <Link className="hover:text-hover-text" to="/inventory">
                            Inventory
                        </Link>
                        {user?.uid ? (
                            <>
                                <Link className="hover:text-hover-text" to="/add-item">
                                    Add Item
                                </Link>
                                <Link className="hover:text-hover-text" to="/my-items">
                                    My Items
                                </Link>
                                <a className="hover:text-hover-text hover:cursor-pointer" onClick={() => signOut(auth)}>
                                    Sign Out
                                </a>
                            </>
                        ) : (
                            <>
                                <Link className="hover:text-hover-text" to="/register">
                                    Register
                                </Link>
                                <Link className="hover:text-hover-text" to="/login">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="socials text-2xl space-x-4 text-center lg:text-right">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-instagram"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
