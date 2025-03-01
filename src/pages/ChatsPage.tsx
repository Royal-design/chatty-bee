import { ChatsBox } from "@/components/ChatsBox";
import { ChatsList } from "@/components/ChatsList";
import { db } from "@/firebase/firebase";
import { setOriginalChats } from "@/redux/slice/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export const ChatsPage = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const chatId = useAppSelector((state) => state.chats.chats.chatId);

  useEffect(() => {
    if (currentUser?.id) {
      const unSub = onSnapshot(
        doc(db, "userChats", currentUser.id),
        async (res) => {
          const items = res.data()?.chats || [];

          interface ChatItem {
            receiverId: string;
            updatedAt: number;
            [key: string]: any;
          }

          interface User {
            [key: string]: any;
          }

          const promises = items.map(async (item: ChatItem) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);
            const user: User | undefined = userDocSnap.data();
            return { ...item, user };
          });

          const chatData = await Promise.all(promises);
          const sortedChats = chatData.sort(
            (a, b) => b.updatedAt - a.updatedAt
          );

          dispatch(setOriginalChats(sortedChats));
        }
      );

      return () => unSub();
    }
  }, [currentUser?.id, dispatch]);
  return (
    <section className="flex h-full">
      <div className="w-[250px]">
        <ChatsList />
      </div>
      <div className="flex-1 h-full">{chatId && <ChatsBox />}</div>
    </section>
  );
};
