import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresVerification?: boolean;
}

const ProtectedRoute = ({
  children,
  requiresVerification = true,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, isEmailVerified } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiresVerification && !isEmailVerified) {
    return <Navigate to="/verification" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
