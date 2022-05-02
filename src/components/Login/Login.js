import { getAuth } from "firebase/auth";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import app from "../../firebase.init";

const auth = getAuth(app);

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return (
        <div className="container">
            <div className="border p-8 mx-auto max-w-[600px] mt-9">
                <h1 className="text-4xl font-medium mb-9 text-center">Please Login</h1>
                <form>
                    <input className="border py-1 px-3 mb-2 w-full" type="email" placeholder="Enter email" required />
                    <br />
                    <input className="border py-1 px-3 mb-2 w-full" type="password" placeholder="Enter Password" required />
                    <br />
                    <input className="border px-7 py-2 bg-blue-400 cursor-pointer" type="submit" value="Login" />
                </form>
                <div className="mt-3">
                    Forget password?
                    <Link className="text-blue-500 pl-2 hover:underline" to="/login">
                        Click here
                    </Link>
                </div>
                <div className="mt-3">
                    Don't have an account?
                    <Link className="text-blue-500 pl-2 hover:underline" to="/register">
                        Register here
                    </Link>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <div className="border-t-2 w-40"></div>
                    <div className="mx-4 inline-block">Or</div>
                    <div className="border-t-2 w-40"></div>
                </div>
                <div>
                    <button className="border w-full px-6 py-2 mt-4" onClick={() => signInWithGoogle()}>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
