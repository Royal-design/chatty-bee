import { UserHeader } from "./UserHeader";
import { UsersListContent } from "./UsersListContent";

export const UsersList = () => {
  return (
    <div className="bg-gradient-to-r from-[#0c0900] border-r border-[#533303] to-[#141001] rounded-md h-full overflow-auto scroll-hidden">
      <div className="p-2">
        <UserHeader />
      </div>
      <div className="p-2">
        <UsersListContent />
      </div>
    </div>
  );
};
