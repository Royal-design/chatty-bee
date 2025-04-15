import { HiUsers } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  return (
    <div className="rounded-t-3xl px-6 pt-3 pb-2 fixed bottom-0 w-full bg-[#23180e] ">
      <div className="flex justify-between ">
        <NavLink
          to="/chats"
          className={({ isActive }) =>
            `flex flex-col p-1 items-center text-sm transition-colors ${
              isActive
                ? "border border-border-color rounded-lg  transition-all duration-200"
                : "text-light-color"
            }`
          }
        >
          <IoChatbubbleEllipsesOutline size={25} className="text-[#a2a0a0]" />
          <span className="text-lighter-color">Chats</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex flex-col p-1 items-center text-sm transition-colors ${
              isActive
                ? "border border-border-color rounded-lg  transition-all duration-200"
                : "text-light-color"
            }`
          }
        >
          <HiUsers size={25} className="text-[#a2a0a0]" />
          <span className="text-lighter-color">Users</span>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col p-1 items-center text-sm transition-colors ${
              isActive
                ? "border border-border-color rounded-lg  transition-all duration-200"
                : "text-light-color"
            }`
          }
        >
          <BsInfoCircleFill size={25} className="text-[#a2a0a0]" />
          <span className="text-lighter-color">Info</span>
        </NavLink>
      </div>
    </div>
  );
};
