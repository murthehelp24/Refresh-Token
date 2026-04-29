import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../stores/userStore";

function ProtectRoute() {
  const token = useUserStore((state) => state.token);

  if (!token) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectRoute;
