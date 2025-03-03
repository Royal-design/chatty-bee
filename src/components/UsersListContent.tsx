import { useAppDispatch, useAppSelector } from "@/redux/store";
import avatar from "../assets/user-avatar.jpg";
import { Separator } from "@radix-ui/react-separator";
import { UserSkeleton } from "./UserSkeleton";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { toast } from "sonner";
import { UserType } from "@/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { changeChats, setActiveChatId } from "@/redux/slice/chatSlice";

export const UsersListContent = () => {
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.filter.users);
  const currentUser = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.filter.loading);
  const dispatch = useAppDispatch();

  if (!currentUser) return null;

  const filteredUsers = users.filter((user) => user.id !== currentUser.id);

  const handleAddChat = async (user: UserType) => {
    if (!user || !currentUser) return;

    try {
      const userChatsRef = doc(db, "userChats", currentUser.id);

      let existingChatId: string | null = null;

      // Fetch the current user's chats
      const userChatsDoc = await getDocs(collection(db, "userChats"));
      const userChatsData = userChatsDoc.docs.find(
        (doc) => doc.id === currentUser.id
      );

      if (userChatsData) {
        const userChats = userChatsData.data().chats || [];
        const existingChat = userChats.find(
          (chat: any) => chat.receiverId === user.id
        );

        if (existingChat) {
          existingChatId = existingChat.chatId;
        }
      }

      // If chat exists, navigate to it
      if (existingChatId) {
        navigate(`/chats/${existingChatId}`);
        dispatch(setActiveChatId(existingChatId));
        dispatch(
          changeChats({ currentUser, user: user, chatId: existingChatId || "" })
        );
        return;
      }

      // No existing chat, create a new one
      const chatRef = collection(db, "chats");
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: []
      });

      await updateDoc(userChatsRef, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now()
        })
      });

      if (existingChatId) {
        navigate(`/chats`);
        dispatch(setActiveChatId(existingChatId));
        return;
      }
      await updateDoc(doc(db, "userChats", user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now()
        })
      });

      dispatch(changeChats({ currentUser, user: user, chatId: newChatRef.id }));
      navigate(`/chats`);
      dispatch(setActiveChatId(newChatRef.id));
    } catch (error) {
      console.error("Error adding chat:", error);
      toast.error("Failed to add chat. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-4">
        {[...Array(3).keys()].map((key) => (
          <UserSkeleton key={key} />
        ))}
      </div>
    );
  }

  if (!loading && users.length === 0) {
    return <p className="text-center text-gray-500 p-3">No users found.</p>;
  }

  return (
    <div className="w-full h-full">
      {filteredUsers.map((user, index) => (
        <div
          className="w-full cursor-pointer"
          key={user.id}
          onClick={() => handleAddChat(user)}
        >
          <figure className="w-full flex items-center gap-2 p-2">
            <img
              src={user.photo || avatar}
              alt={`${user.name}'s avatar`}
              className="size-11 bg-background-heavy border border-border-color rounded-full"
            />
            <div className="flex flex-col">
              <h2 className="text-sm font-medium text-heavy">{user.name}</h2>
              <p className="text-xs text-light">{user.bio || "Available"}</p>
            </div>
          </figure>
          {index < filteredUsers.length - 1 && (
            <Separator className="border-border-color border" />
          )}
        </div>
      ))}
    </div>
  );
};
