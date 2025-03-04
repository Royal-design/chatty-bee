import { ChatsListContent } from "./ChatsListContent";
import { UserHeader } from "./UserHeader";

export const MobileChatList = () => {
  return (
    <div className="h-full p-2 flex flex-col ">
      <div>
        <UserHeader />
      </div>
      <div className=" mt-3   h-full overflow-auto scrollbar-hidden  ">
        <ChatsListContent />
      </div>
    </div>
  );
};
