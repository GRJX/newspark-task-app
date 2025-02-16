import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  if (!user.id) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
