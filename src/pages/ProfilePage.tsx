import { useAppSelector } from "@/redux/store";

export const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className=" flex flex-col items-center gap-4">
      <figure>
        <img src={user?.photo} alt="avatar" className="size-24 rounded-full" />
      </figure>
      <h2 className="text-xl">{user?.name}</h2>
      <p>{user?.status || "Offline"}</p>
      <p>{user?.bio}</p>
      <p>{user?.email}</p>
    </div>
  );
};
