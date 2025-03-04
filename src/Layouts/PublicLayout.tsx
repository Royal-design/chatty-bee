import { Loading } from "@/components/Loading";
import { useAppSelector } from "@/redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const PublicLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const loading = useAppSelector((state) => state.auth.loading);
  if (loading) return <Loading />;
  if (user) return <Navigate to="/" />;

  return <Outlet />;
};
