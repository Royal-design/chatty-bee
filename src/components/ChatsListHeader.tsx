import { useAppSelector } from "@/redux/store";
import avatar from "../assets/user-avatar.jpg";
import { Search } from "./Search";
import { ProfileMenu } from "./ProfileMenu";
import { SearchDialog } from "./SearchDialog";
import { UserSkeleton } from "./UserSkeleton";
export const ChatsListHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  return (
    <div className="flex flex-col">
      <div className="justify-between mb-4 items-center flex gap-4">
        {loading ? (
          <div className="">
            <UserSkeleton />
          </div>
        ) : (
          <figure className="flex items-center gap-4 ">
            <img
              src={user?.photo || avatar}
              alt="user"
              className="size-11 rounded-full bg-background-heavy border border-border-color"
            />
            <div className="">
              <h2 className="font-semibold text-lg text-heavy ">
                {user?.name}
              </h2>
              <p className="text-xs text-light">{user?.bio}</p>
            </div>
          </figure>
        )}

        <ProfileMenu />
      </div>
      <div className="flex items-center gap-2">
        <Search />
        <SearchDialog />
      </div>
    </div>
  );
};
