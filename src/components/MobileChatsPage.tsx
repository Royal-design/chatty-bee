import { useAppSelector } from "@/redux/store";
import { MobileChatList } from "./MobileChatList";
import { WelcomeMessage } from "./WelcomeMessage";

export const MobileChatsPage = () => {
  const chatId = useAppSelector((state) => state.chats.chats.chatId);
  const chats = useAppSelector((state) => state.filter.chats);
  return (
    <div className="h-full">
      {chatId && chats.length > 0 ? <MobileChatList /> : <WelcomeMessage />}
    </div>
  );
};
