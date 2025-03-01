import { useAppDispatch, useAppSelector } from "@/redux/store";
import avatar from "../assets/user-avatar.jpg";
import { Separator } from "./ui/separator";
import { UserSkeleton } from "./UserSkeleton";
import { changeChats } from "@/redux/slice/chatSlice";
import { doc, updateDoc } from "firebase/firestore";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { db } from "@/firebase/firebase";
import { Chat } from "@/redux/slice/filterSlice";
import { useState } from "react";
import { formatTime } from "@/features/FormatTime";

export const ChatsListContent = () => {
  const filteredChats = useAppSelector((state) => state.filter.chats);
  const loading = useAppSelector((state) => state.filter.loading);
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [activeChatId, setActiveChatId] = useState<string | null>(null);

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
    if (!currentUser || !chat?.user) return;

    setActiveChatId(chat.chatId);

    const userChatsRef = doc(db, "userChats", currentUser.id);
    try {
      await updateDoc(userChatsRef, {
        chats: filteredChats.map((item) =>
          item.chatId === chat.chatId ? { ...item, isSeen: true } : item
        )
      });

      dispatch(
        changeChats({ currentUser, user: chat.user, chatId: chat.chatId })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      {filteredChats.map((chat, index, array) => (
        <div
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          className="w-full"
        >
          <div
            className={`flex w-full items-center gap-3 p-2 rounded-sm hover:bg-background-hover duration-200 cursor-pointer ${
              activeChatId === chat.chatId ? "bg-background" : ""
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
                <p className="text-[10px] justify-end">
                  {" "}
                  {formatTime(chat.updatedAt)}
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
