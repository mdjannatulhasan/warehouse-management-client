import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useRef } from "react";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import app from "../../firebase.init";

const auth = getAuth(app);

const UserLogin = () => {
    let navigate = useNavigate();
    let location = useLocation();

    const [signInWithGoogle, user] = useSignInWithGoogle(auth);
    // const [signInWithGoogle, user, loading, googleError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, emailUser, error] = useSignInWithEmailAndPassword(auth);
    // const [signInWithEmailAndPassword, emailUser, emailUserloading, error] = useSignInWithEmailAndPassword(auth);

    const emailRef = useRef("");
    const passRef = useRef("");
    let from = location.state?.from?.pathname || "/";

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        await signInWithEmailAndPassword(email, passRef.current.value);
    };

    if (user || emailUser) {
        const email = user?.user?.email || emailUser?.user?.email;
        console.log(email);
        const getToken = async () => {
            const { data } = await axios.post("http://localhost:3030/login", { email });
            localStorage.setItem("accessToken", data.token);
            navigate(from, { replace: true });
        };
        getToken();
    }

    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    // const [sendPasswordResetEmail, sending, passwordResetError] = useSendPasswordResetEmail(auth);

    const resetPassword = async (event) => {
        if (!emailRef.current.value) {
            toast.error("Please Enter Email");
            return;
        }
        await sendPasswordResetEmail(emailRef.current.value);
        toast.success("Password reset email sent.");
    };
    return (
        <div className="container">
            <div className="border p-8 mx-auto max-w-[600px] mt-9">
                <h1 className="text-4xl font-medium mb-9 text-center">Please Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="border py-1 px-3 w-full" ref={emailRef} type="email" placeholder="Enter email" required />
                    <br />
                    <input className="border py-1 px-3 w-full" ref={passRef} type="password" placeholder="Enter Password" required />
                    <br />
                    {error ? <p className="text-center text-rose-600">{error}</p> : ""}
                    <input className="border px-7 py-2 bg-blue-400 cursor-pointer" type="submit" value="Login" />
                </form>

                <div className="mt-3">
                    Forget password?
                    <button onClick={resetPassword} className="text-blue-500 pl-2 hover:underline">
                        Click here
                    </button>
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

export default UserLogin;
