import { useAppDispatch, useAppSelector } from "@/redux/store";
import avatar from "../assets/user-avatar.jpg";
import { Button } from "./ui/button";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { logoutUser } from "@/redux/slice/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { changeBlock } from "@/redux/slice/chatSlice";

export const ChatsProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const chatUser = useAppSelector((state) => state.chats.chats.user);
  const { isReceiverBlocked, isCurrentUserBlocked } = useAppSelector(
    (state) => state.chats.chats
  );
  const currentUser = useAppSelector((stae) => stae.auth.user);
  const handleBlock = async () => {
    if (!chatUser || !currentUser) return;
    try {
      await updateDoc(doc(db, "users", currentUser.id), {
        blocked: isReceiverBlocked
          ? arrayRemove(chatUser.id)
          : arrayUnion(chatUser.id)
      });

      dispatch(changeBlock());
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    const response = await dispatch(logoutUser());
    if (response.success) {
      toast.success("User logged out successfully");
      navigate("/login");
    } else {
      toast.error(response.message || "Logout failed");
    }
  };

  const isBlocked = chatUser?.id && currentUser?.blocked.includes(chatUser.id);
  return (
    <div className="flex pb-5 items-center flex-col bg-gradient-to-r from-[#0c0900] to-[#141001] border-l border-[#533303]  h-full flex-wrap gap-4">
      <div className="flex flex-1 flex-col mt-8 items-center w-full">
        <img
          src={isBlocked ? avatar : chatUser?.photo || avatar}
          alt="avatar"
          className="size-15 bg-background-heavy border border-border-color rounded-full"
        />
        <h2 className="font-semibold  text-heavy text-lg text-center">
          {isBlocked ? "User" : chatUser?.name || "user"}
        </h2>
        <p className="text-xs text-center">
          {isBlocked ? "User bio" : chatUser?.bio || "No bio"}
        </p>
      </div>
      <div className="flex text-light  justify-end flex-col space-y-2">
        <Button
          onClick={handleBlock}
          className="bg-background-heavy text-heavy hover:bg-background-hover duration-200 border border-border-color"
        >
          {isCurrentUserBlocked
            ? "You are blocked"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </Button>
        <Button
          onClick={signOut}
          variant={"ghost"}
          className="border border-border-color hover:bg-background hover:text-heavy text-heavy"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};
