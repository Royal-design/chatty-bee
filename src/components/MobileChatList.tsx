import { ChatsListContent } from "./ChatsListContent";
import { UserHeader } from "./UserHeader";

export const MobileChatList = () => {
  return (
    <div className="h-full p-2 flex flex-col ">
      <div>
        <UserHeader />
      </div>
      <div className=" mt-3 rounded-tr-3xl p-4 border h-full rounded-tl-3xl overflow-auto scrollbar-hidden  border-border-color">
        <ChatsListContent />
      </div>
    </div>
  );
};
