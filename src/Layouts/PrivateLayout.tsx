import { useAppSelector } from "@/redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);

  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
};
