import { ChatsBox } from "@/components/ChatsBox";
import { ChatsList } from "@/components/ChatsList";
import { ChatsMessages } from "@/components/ChatsMessages";
import { db } from "@/firebase/firebase";
import { setOriginalChats } from "@/redux/slice/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

// Function to show browser notifications
const showNotification = (sender: string, message: string) => {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification(sender, {
        body: message,
        icon: "/favicon.ico" // Change this to sender's avatar if available
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(sender, {
            body: message,
            icon: "/favicon.ico"
          });
        }
      });
    }
  }
};

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

          const promises = items.map(async (item: any) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);
            const user = userDocSnap.data();
            return { ...item, user };
          });

          const chatData = await Promise.all(promises);
          const sortedChats = chatData.sort(
            (a, b) => b.updatedAt - a.updatedAt
          );

          dispatch(setOriginalChats(sortedChats));

          // 🔔 Check for unread messages and show notification
          sortedChats.forEach((chat) => {
            if (!chat.isSeen && chat.lastMessage && chat.chatId !== chatId) {
              showNotification(chat.user.name, chat.lastMessage);
            }
          });
        }
      );

      return () => unSub();
    }
  }, [currentUser?.id, chatId, dispatch]);

  return (
    <div className="h-full flex flex-col">
      {chatId && chats.length > 0 && (
        <div className="h-full">
          <div className="md:flex hidden h-full">
            <div className="h-full">
              <ChatsList />
            </div>
            <div className="h-full flex-1">
              <ChatsBox />
            </div>
          </div>

          <div className="md:hidden h-full">
            <ChatsMessages />
          </div>
        </div>
      )}
    </div>
  );
};
