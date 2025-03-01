import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { Navbar } from "./Navbar";
import { TextInput } from "./TextInput";
import { useAppSelector } from "@/redux/store";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data() as ChatsProps);
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  console.log(chat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  return (
    <div className="h-full flex flex-col justify-between ">
      <div className="">
        <Navbar />
      </div>
      <div className=" p-4 overflow-auto gap-4 flex flex-col scrollbar-hidden">
        {chat?.messages.map((message) => (
          <Message key={message?.createdAt.toString()} message={message} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="p-4">
        <TextInput focusRef={focusRef} />
      </div>
    </div>
  );
};
