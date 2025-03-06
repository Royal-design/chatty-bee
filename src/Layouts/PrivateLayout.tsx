import { Loading } from "@/components/Loading";
import { useAppSelector } from "@/redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return <Loading />;
  if (!user) <Navigate to="/login" replace />;
  return user && <Outlet />;
};
