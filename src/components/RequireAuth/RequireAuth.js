import { getAuth } from "firebase/auth";
import { Navigate, useLocation } from "react-router";
import app from "../../firebase.init";

const auth = getAuth(app);
function RequireAuth({ children }) {
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
export default RequireAuth;
