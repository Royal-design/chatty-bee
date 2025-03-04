import { SideNav } from "@/components/SideNav";
import { Outlet, useLocation } from "react-router-dom";

export const RootLayout = () => {
  const location = useLocation();
  const isChatsChild = location.pathname.startsWith("/chats/");
  return (
    <div className="h-screen overflow-auto scrollbar-hidden">
      <div className="h-full hidden md:flex w-full bg-[#120902]  text-white ">
        <div className="py-3 pl-4">
          <SideNav />
        </div>
        <main className="w-full py-2">
          <Outlet />
        </main>
      </div>
      <div className=" h-full flex flex-col md:hidden w-full bg-[#120902]  text-white ">
        <main className="w-full  h-full py-2">
          <Outlet />
        </main>
        <div className="pb-16 pl-4 ">{!isChatsChild && <SideNav />}</div>
      </div>
    </div>
  );
};
