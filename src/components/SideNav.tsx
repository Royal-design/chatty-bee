import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";

export const SideNav = () => {
  return (
    <div className="h-[40px] md:h-full md:w-[45px] w-full relative p-[4px] bg-gradient-to-r from-[#533303] to-[#6d460c] rounded-2xl md:rounded-full shadow-md">
      <div className=" bg-[#120902] border-[#fff] border flex md:flex-col justify-between items-center w-full md:py-[4rem] py-4 px-2 md:px-0 h-full rounded-2xl md:rounded-full">
        <NavLink to="/chats">
          <IoChatbubbleEllipsesOutline size={25} className="text-[#a2a0a0]" />
        </NavLink>
        <NavLink to="/users">
          <HiUsers size={25} className="text-[#a2a0a0]" />
        </NavLink>
        <NavLink to="/about">
          <BsInfoCircleFill size={25} className="text-[#a2a0a0]" />
        </NavLink>
      </div>
    </div>
  );
};
