import { UserHeader } from "./UserHeader";
import { UsersListContent } from "./UsersListContent";

export const UsersList = () => {
  return (
    <div className="bg-gradient-to-r flex flex-col from-[#0c0900] border-r border-[#533303] to-[#141001] rounded-md h-full overflow-auto scrollbar-hidden">
      <div className="p-2">
        <UserHeader />
      </div>
      <div className="p-2 scrollbar-hidden overflow-scroll">
        <UsersListContent />
      </div>
    </div>
  );
};
