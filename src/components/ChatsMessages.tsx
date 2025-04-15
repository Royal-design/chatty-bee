import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { Navbar } from "./Navbar";
import { TextInput } from "./TextInput";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { setActiveChatId } from "@/redux/slice/chatSlice";
import iconBg from "@/assets/iconbg.jpg";

interface ChatsProps {
  messages: {
    text: string;
    img: string;
    createdAt: Timestamp;
    senderId: string;
  }[];
}

export const ChatsMessages = () => {
  const [chat, setChat] = useState<ChatsProps | null>(null);
  const chatId = useAppSelector((state) => state.chats.chats.chatId);
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const savedChatId = localStorage.getItem("activeChatId");

    if (!chatId && savedChatId) {
      dispatch(setActiveChatId(savedChatId));
    }

    if (!chatId && !savedChatId) return;

    const chatDocRef = doc(db, "chats", chatId || savedChatId!);
    const unSub = onSnapshot(chatDocRef, (res) => {
      if (res.exists()) {
        setChat(res.data() as ChatsProps);
      } else {
        console.warn(
          `Chat document with ID ${chatId || savedChatId} does not exist.`
        );
        setChat(null);
      }
    });

    return () => unSub();
  }, [chatId, dispatch]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  return (
    <div className="h-full flex flex-col ">
      <div className="">
        <Navbar />
      </div>
      <div
        style={{
          backgroundImage: `url(${iconBg})`,
          backgroundBlendMode: "overlay",

          backgroundRepeat: "repeat"
        }}
        className=" px-4 pt-25 pb-25 overflow-auto bg-[#0a0600] h-full gap-4 flex flex-col scrollbar-hidden"
      >
        {chat?.messages.map((message) => (
          <Message key={message?.createdAt.toString()} message={message} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="p-4 fixed bottom-0 bg-background w-[calc(100%-531px)] max-md:w-full">
        <TextInput focusRef={focusRef} />
      </div>
    </div>
  );
};
