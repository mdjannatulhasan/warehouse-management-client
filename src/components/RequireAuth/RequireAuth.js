import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router";
import app from "../../firebase.init";

function RequireAuth({ children }) {
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);

    let location = useLocation();
    if (loading) {
        return;
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
export default RequireAuth;
