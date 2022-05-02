import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, setPersistence } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import app from "../../firebase.init";

const auth = getAuth(app);
const Register = () => {
    let navigate = useNavigate();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordRetypeRef = useRef(null);
    const [pwError, setPwError] = useState(false);
    const [emailError, setEmailError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordRetype = passwordRetypeRef.current.value;

        if (password !== passwordRetype) {
            setPwError(true);
            return "";
        } else setPwError(false);
        await createUserWithEmailAndPassword(email, password);
    };

    if (user) {
        navigate("/home");
    }

    return (
        <div className="container">
            <h1 className="text-4xl font-medium mb-7 text-center">Please Register</h1>
            <div className="border p-8 mx-auto max-w-[600px]">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input className="border py-1 px-3 w-full" type="email" ref={emailRef} placeholder="Enter email" required />
                    <br />
                    <input className="border py-1 px-3 w-full" type="password" ref={passwordRef} placeholder="Enter Password" required />
                    <br />
                    <input className="border py-1 px-3 w-full" type="password" ref={passwordRetypeRef} placeholder="Enter Password again" required />
                    <br />
                    {pwError ? <p className="text-center text-rose-600">Password doesn't match</p> : ""}
                    {error?.message == "Firebase: Error (auth/email-already-in-use)." && <p className="text-center text-rose-600">Email already in Use</p>}
                    <input className="border px-7 py-2 bg-blue-400 cursor-pointer" type="submit" value="Register" />
                </form>
                <div className="mt-3">
                    Already have an account?
                    <Link className="text-blue-500 pl-2" to="/login">
                        Click here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
