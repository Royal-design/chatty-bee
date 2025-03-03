import { ChatsBox } from "@/components/ChatsBox";
import { ChatsList } from "@/components/ChatsList";
import { ChatsMessages } from "@/components/ChatsMessages";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { db } from "@/firebase/firebase";
import { setOriginalChats } from "@/redux/slice/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export const ChatMessage = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const chatId = useAppSelector((state) => state.chats.activeChatId);

  const chats = useAppSelector((state) => state.filter.chats);

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
    <div className="h-full flex flex-col">
      {chatId && chats.length > 0 ? (
        <div className="h-full ">
          <div className=" md:flex hidden h-full">
            <div className="h-full">
              <ChatsList />
            </div>
            <div className="h-full flex-1">
              <ChatsBox />
            </div>
          </div>

          <div className=" md:hidden h-full">
            <ChatsMessages />
          </div>
        </div>
      ) : (
        <WelcomeMessage />
      )}
    </div>
  );
};
