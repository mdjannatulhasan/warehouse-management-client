import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import app from "../../firebase.init";
import "./Header.css";

const auth = getAuth(app);
const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    const [showNav, setShowNav] = useState(false);
    return (
        <div className="bg-[#b9c6c9] lg:py-4 relative z-0">
            <div className="container py-4 lg:py-0 bg-[#b9c6c9] z-10 flex justify-between items-center">
                <Link to="/">
                    <div className="flex items-end space-x-2">
                        <img width="50px" src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="" />
                        <h4 className="uppercase text-xl leading-tight -mb-1 inline-block">
                            Hasan <br /> Inventory
                        </h4>
                    </div>
                </Link>
                <nav className="space-x-5 text-lg text-text-primary hidden lg:flex">
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
                </nav>
                <div
                    onClick={() => {
                        setShowNav(!showNav);
                    }}
                    className="z-20 menu-icon lg:hidden space-y-1 hover:cursor-pointer"
                >
                    <div className="bar bar1"></div>
                    <div className="bar bar3"></div>
                    <div className="bar bar2"></div>
                </div>
            </div>
            <nav
                className={`bg-[#1F6987] mobile-menu text-lg absolute flex flex-col justify-center items-center left-0 right-0 py-5 space-y-2  z-[-1] text-[#e0f8ff] lg:hidden ${
                    showNav ? "show-nav" : ""
                }`}
            >
                <Link className="hover:text-[#dfa761]" to="/">
                    Home
                </Link>
                <Link className="hover:text-[#dfa761]" to="/inventory">
                    Inventory
                </Link>
                {user?.uid ? (
                    <>
                        <Link className="hover:text-[#dfa761]" to="/add-item">
                            Add Item
                        </Link>
                        <Link className="hover:text-[#dfa761]" to="/my-items">
                            My Items
                        </Link>
                        <a className="hover:text-[#dfa761] hover:cursor-pointer" onClick={() => signOut(auth)}>
                            Sign Out
                        </a>
                    </>
                ) : (
                    <>
                        <Link className="hover:text-[#dfa761]" to="/register">
                            Register
                        </Link>
                        <Link className="hover:text-[#dfa761]" to="/login">
                            Login
                        </Link>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Header;
