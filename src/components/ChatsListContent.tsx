import { useAppDispatch, useAppSelector } from "@/redux/store";
import avatar from "../assets/user-avatar.jpg";
import { Separator } from "./ui/separator";
import { UserSkeleton } from "./UserSkeleton";
import { changeChats, setActiveChatId } from "@/redux/slice/chatSlice";
import { doc, updateDoc } from "firebase/firestore";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { db } from "@/firebase/firebase";
import { Chat } from "@/redux/slice/filterSlice";
import { formatTime } from "@/features/formatTime";
import { useNavigate } from "react-router-dom";

export const ChatsListContent = () => {
  const filteredChats = useAppSelector((state) => state.filter.chats);
  const loading = useAppSelector((state) => state.filter.loading);
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector((state) => state.chats.activeChatId);
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="w-full flex flex-col gap-4">
        {[...Array(3).keys()].map((key) => (
          <UserSkeleton key={key} />
        ))}
      </div>
    );
  }

  if (!loading && filteredChats.length === 0) {
    return <p className="text-center text-gray-500 p-3">No chats found.</p>;
  }

  const handleSelect = async (chat: Chat) => {
    if (!currentUser?.id || !chat?.chatId || !chat?.user) return;

    dispatch(setActiveChatId(chat.chatId));

    try {
      localStorage.setItem("activeChat", JSON.stringify(chat));

      const userChatsRef = doc(db, "userChats", currentUser.id);
      const updatedChats = filteredChats.map((item) =>
        item.chatId === chat.chatId ? { ...item, isSeen: true } : item
      );

      await updateDoc(userChatsRef, { chats: updatedChats });

      dispatch(
        changeChats({
          currentUser,
          user: chat.user,
          chatId: chat.chatId
        })
      );
      navigate(`/chats/${chat.chatId}`);
    } catch (error) {
      console.error("Error updating chat status:", error);
    }
  };

  return (
    <div className="w-full h-full">
      {filteredChats.map((chat, index, array) => (
        <div
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          className="w-full"
        >
          <div
            className={`flex w-full items-center gap-3 py-2 rounded-sm hover:bg-background-hover duration-200 cursor-pointer ${
              activeChatId === chat.chatId ? "bg-button-active px-1" : ""
            }`}
          >
            <img
              src={chat.user.photo || avatar}
              alt={chat.user.name}
              className="size-11 bg-background-heavy border border-border-color rounded-full"
            />
            <div className="w-full">
              <div className="flex gap-4">
                <h3 className="text-sm font-medium text-heavy">
                  {chat.user.name}
                </h3>
                <IoCheckmarkDoneSharp
                  className={chat.isSeen ? "text-border-color" : "text-light"}
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-xs text-light">
                  {chat.lastMessage || "No message"}
                </p>
                <p className="text-[10px] text-light justify-end">
                  {chat.lastMessage && formatTime(chat.updatedAt)}
                </p>
              </div>
            </div>
          </div>
          {index < array.length - 1 && (
            <Separator className="border-border-color border " />
          )}
        </div>
      ))}
    </div>
  );
};
