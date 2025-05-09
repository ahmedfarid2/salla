import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
