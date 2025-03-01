import { ChatsListContent } from "./ChatsListContent";
import { UserHeader } from "./UserHeader";

export const ChatsList = () => {
  return (
    <div className="bg-gradient-to-r from-[#0c0900] border-r border-[#533303] to-[#141001] rounded-md h-full overflow-auto scroll-hidden">
      <div className="p-2">
        <UserHeader />
      </div>
      <div className="p-2">
        <ChatsListContent />
      </div>
    </div>
  );
};
