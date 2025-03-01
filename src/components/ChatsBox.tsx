import { ChatsMessages } from "./ChatsMessages";
import { ChatsProfile } from "./ChatsProfile";

export const ChatsBox = () => {
  return (
    <div className="flex bg-gradient-to-r from-[#0c0900] to-[#141001] h-full">
      <div className="flex-1 h-full">
        <ChatsMessages />
      </div>
      <div className="w-[200px]">
        <ChatsProfile />
      </div>
    </div>
  );
};
