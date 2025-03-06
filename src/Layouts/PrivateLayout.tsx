import { Loading } from "@/components/Loading";
import { Login } from "@/components/Login";
import { useAppSelector } from "@/redux/store";

export const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const { loading, user } = useAppSelector((state) => state.auth);
  if (loading) return <Loading />;
  if (!user) return <Login />;
  return children;
};
