import { Navigate } from "react-router-dom";
import { useAuth  } from "../context/AuthContext";
import Loading from "../components/common/Loader";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user ,loading} = useAuth();

  if(loading) return <Loading/>
  if (!user) {
    return <Navigate to="/login" replace />;//if not user then navigate to login page
  }

  return <>{children}</>;//use for protectec page here 
}
