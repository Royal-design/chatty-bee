import { SideNav } from "@/components/SideNav";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import messageBox from "../assets/whatsappbox.svg";

export const RootLayout = () => {
  const [loading] = useState(true);
  // if (loading)
  //   return (
  //     <div className="w-[200px] h-[20rem] bg-[url('@/assets/whatsappbox.svg')]  bg-cover bg-center ">
  //       <p className="text-white text-lg font-bold px-4">
  //         This is a long text that should fit inside the SVG.
  //       </p>
  //     </div>
  //   );

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
