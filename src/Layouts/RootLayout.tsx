import { SideNav } from "@/components/SideNav";
import { Outlet } from "react-router-dom";
export const RootLayout = () => {
  return (
    <div className="h-screen flex w-full bg-[#120902]  text-white ">
      <div className="py-3 pl-4">
        <SideNav />
      </div>
      <main className="w-full py-2">
        <Outlet />
      </main>
    </div>
  );
};
