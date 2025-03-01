import { BsFillChatTextFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { TbMessageCircleUser } from "react-icons/tb";
import { NavLink } from "react-router-dom";

export const SideNav = () => {
  return (
    <div className="h-full w-[45px] relative p-[4px] bg-gradient-to-r from-[#533303] to-[#6d460c] rounded-full shadow-md">
      <div className=" bg-[#120902] border-[#fff] border flex flex-col justify-between items-center w-full py-[4rem] h-full rounded-full">
        <NavLink to="/chats">
          <BsFillChatTextFill size={25} className="text-[#a2a0a0]" />
        </NavLink>
        <NavLink to="/users">
          <HiUsers size={25} className="text-[#a2a0a0]" />
        </NavLink>
        <NavLink to="/profile">
          <TbMessageCircleUser size={25} className="text-[#a2a0a0]" />
        </NavLink>
      </div>
    </div>
  );
};
