import { ChatsListContent } from "./ChatsListContent";
import { UserHeader } from "./UserHeader";

export const ChatsList = () => {
  return (
    <div className="bg-gradient-to-r flex flex-col  scrollbar-hidden from-[#0c0900] border-r border-[#533303] to-[#141001] rounded-md h-full overflow-auto ">
      <div className="p-2">
        <UserHeader />
      </div>
      <div className="p-2 overflow-auto scrollbar-hidden">
        <ChatsListContent />
      </div>
    </div>
  );
};
