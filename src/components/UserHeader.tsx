import { useAppSelector } from "@/redux/store";
import avatar from "../assets/user-avatar.jpg";
import { Search } from "./Search";
import { ProfileMenu } from "./ProfileMenu";
import { SearchDialog } from "./SearchDialog";
import { UserSkeleton } from "./UserSkeleton";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useLocation } from "react-router-dom";
export const UserHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const location = useLocation();
  const userPage = location.pathname === "/users";
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
        {!userPage && (
          <SearchDialog
            trigger={
              <IoIosAddCircleOutline
                size={25}
                className="cursor-pointer duration-200 text-light hover:text-heavy"
              />
            }
          />
        )}
      </div>
    </div>
  );
};
