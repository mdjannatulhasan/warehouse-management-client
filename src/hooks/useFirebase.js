import React, { useState } from "react";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import app from "../firebase.init";

const auth = getAuth(app);
const useFirebase = () => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState({});

    const signInWithGoogle = () => {};

    return { user, signInWithGoogle };
};
export default useFirebase;
