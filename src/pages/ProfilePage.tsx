import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/redux/store";
import avatar from "../assets/user-avatar.jpg";

export const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="bg-background   ">
      <Card className="text-light bg-background border-none flex flex-col justify-center items-center ">
        <CardHeader className="  w-full">
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <img
            src={user?.photo || avatar}
            alt="user"
            className="size-20 rounded-full border-border-color border object-cover"
          />
          <p className="text-lg">{user?.name || ""}</p>
          <p className="text-sm">{user?.email}</p>
          <p className="text-xs">{user?.status || "No bio"}</p>
        </CardContent>
      </Card>
    </div>
  );
};
