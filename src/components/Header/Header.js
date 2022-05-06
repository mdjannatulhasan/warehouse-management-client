import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import app from "../../firebase.init";

const auth = getAuth(app);
const Header = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <div className="bg-[#a5b8cc] py-2">
            <div className="container flex justify-between items-center">
                <div>
                    <img width="230px" src="images/site-logo.png" alt="" />
                </div>
                <nav className="space-x-5 text-lg">
                    <Link to="/">Home</Link>
                    <Link to="/inventory">Inventory</Link>
                    {user?.uid ? (
                        <button onClick={() => signOut(auth)}>Sign Out</button>
                    ) : (
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Header;
