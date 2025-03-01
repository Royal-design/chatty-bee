import { ChatsBox } from "@/components/ChatsBox";
import { ChatsList } from "@/components/ChatsList";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { db } from "@/firebase/firebase";
import { setActiveChatId } from "@/redux/slice/chatSlice";
import { setOriginalChats } from "@/redux/slice/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export const ChatsPage = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const chatId = useAppSelector((state) => state.chats.chats.chatId);
  const activeChatId = useAppSelector((state) => state.chats.activeChatId);
  console.log("chatId", chatId);
  console.log("activechatId", activeChatId);

  useEffect(() => {
    const savedChatId = localStorage.getItem("activeChatId");

    if (savedChatId) {
      dispatch(setActiveChatId(savedChatId));
    }
  }, [dispatch]);

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
      <div className="flex-1 h-full">
        {activeChatId ? <ChatsBox /> : <WelcomeMessage />}
      </div>
    </section>
  );
};

// import { ChatsBox } from "@/components/ChatsBox";
// import { ChatsList } from "@/components/ChatsList";
// import { WelcomeMessage } from "@/components/WelcomeMessage";
// import { db } from "@/firebase/firebase";
// import { setActiveChatId, changeChats } from "@/redux/slice/chatSlice";
// import { setOriginalChats } from "@/redux/slice/filterSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { doc, getDoc, onSnapshot } from "firebase/firestore";
// import { useEffect } from "react";

// export const ChatsPage = () => {
//   const dispatch = useAppDispatch();
//   const currentUser = useAppSelector((state) => state.auth.user);
//   const activeChatId = useAppSelector((state) => state.chats.activeChatId);

//   console.log("activeChatId", activeChatId);

//   // Retrieve active chat from localStorage on page load
//   useEffect(() => {
//     const savedChat = localStorage.getItem("activeChat");
//     if (savedChat) {
//       const parsedChat = JSON.parse(savedChat);
//       dispatch(setActiveChatId(parsedChat.chatId));
//       if (currentUser) {
//         dispatch(
//           changeChats({
//             currentUser,
//             user: parsedChat.user,
//             chatId: parsedChat.chatId
//           })
//         );
//       }
//     }
//   }, [dispatch, currentUser]);

//   useEffect(() => {
//     if (!currentUser?.id) return;

//     const userChatsRef = doc(db, "userChats", currentUser.id);
//     const unSub = onSnapshot(userChatsRef, async (res) => {
//       const items = res.data()?.chats || [];

//       const chatData = await Promise.all(
//         items.map(async (item: any) => {
//           const userDocRef = doc(db, "users", item.receiverId);
//           const userDocSnap = await getDoc(userDocRef);
//           const user = userDocSnap.exists() ? userDocSnap.data() : null;
//           return { ...item, user };
//         })
//       );

//       const sortedChats = chatData.sort((a, b) => b.updatedAt - a.updatedAt);
//       dispatch(setOriginalChats(sortedChats));
//     });

//     return () => unSub();
//   }, [currentUser?.id, dispatch]);

//   return (
//     <section className="flex h-full">
//       <div className="w-[250px]">
//         <ChatsList />
//       </div>
//       <div className="flex-1 h-full">
//         {activeChatId ? <ChatsBox /> : <WelcomeMessage />}
//       </div>
//     </section>
//   );
// };
