import avatar from "../assets/user-avatar.jpg";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";
import { IoInformationCircle } from "react-icons/io5";
import { useAppSelector } from "@/redux/store";

export const Navbar = () => {
  const chatUser = useAppSelector((state) => state.chats.chats.user);

  return (
    <div className="flex border-b border-border-color pb-2 px-2 justify-between items-center">
      <div className="flex items-center gap-4 ">
        <img
          src={chatUser?.photo || avatar}
          alt="avatar"
          className="size-11 rounded-full bg-background-heavy border border-border-color"
        />
        <div className="">
          <h2 className="font-semibold text-heavy text-lg">{chatUser?.name}</h2>
          <p className="text-xs text-light">{chatUser?.status}</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <FaPhoneAlt size={20} className="text-light" />
        <IoIosVideocam size={20} className="text-light" />
        <IoInformationCircle size={20} className="text-light" />
      </div>
    </div>
  );
};
