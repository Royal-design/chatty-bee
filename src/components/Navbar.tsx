import avatar from "../assets/user-avatar.jpg";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";
import { IoInformationCircle } from "react-icons/io5";
import { useAppSelector } from "@/redux/store";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const chatUser = useAppSelector((state) => state.chats.chats.user);
  const navigate = useNavigate();
  const isBlocked = chatUser?.id && currentUser?.blocked.includes(chatUser.id);

  return (
    <div className="flex fixed bg-background w-[calc(100%-531px)] max-md:w-full  border-b border-border-color pb-2 px-2 justify-between items-center">
      <div className="flex items-center gap-4 ">
        <div
          className="text-heavy cursor-pointer"
          onClick={() => navigate("/chats")}
        >
          <IoIosArrowBack />
        </div>
        <img
          src={isBlocked ? avatar : chatUser?.photo || avatar}
          alt="avatar"
          className="size-11 rounded-full bg-background-heavy border border-border-color"
        />
        <div className="">
          <h2 className="font-semibold text-heavy text-lg">
            {isBlocked ? "User" : chatUser?.name}
          </h2>
          <p className="text-xs text-light">
            {isBlocked ? "User Status" : chatUser?.status}
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <FaPhoneAlt size={20} className="text-light" />
        <IoIosVideocam size={20} className="text-light" />
        <div className="" onClick={() => navigate("/profile")}>
          <IoInformationCircle size={20} className="text-light" />
        </div>
      </div>
    </div>
  );
};
