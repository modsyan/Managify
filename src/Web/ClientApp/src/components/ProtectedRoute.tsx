import { ReactNode,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoute({ children: children }: { children: ReactNode }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isAuthenticated } = useAuth();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  // 3. While loading, show a spinner

  // 4. If there IS a user, render the app
  if (isAuthenticated) return <>{children}</>;

  // 5. If none of the above conditions met, redirect to /login
  return children;
}

export default ProtectedRoute;
