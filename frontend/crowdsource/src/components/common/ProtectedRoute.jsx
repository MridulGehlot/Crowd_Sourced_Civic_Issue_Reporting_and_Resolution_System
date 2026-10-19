import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function ProtectedRoute({ children, allowedRoles }) {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
    return children;
}

export default ProtectedRoute;