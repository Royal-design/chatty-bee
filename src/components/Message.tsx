import { useAppSelector } from "@/redux/store";
import { Card, CardContent } from "./ui/card";
import { Timestamp } from "firebase/firestore";
import avatar from "../assets/user-avatar.jpg";
import { formatTime } from "@/features/FormatTime";

interface MessageProps {
  text: string;
  img?: string;
  createdAt: Timestamp;
  senderId: string;
}
type MessageType = {
  message: MessageProps;
};

export const Message = ({ message }: MessageType) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const chatUser = useAppSelector((state) => state.chats.chats.user);
  return (
    <div className="w-full">
      {message?.senderId === currentUser?.id ? (
        <div className="flex justify-end">
          <div className="">
            {message.img && (
              <img
                src={message.img}
                alt="placeholder"
                className="w-full h-[200px] object-cover"
              />
            )}
            {message?.text && message.text.length > 0 && (
              <>
                <Card className="py-0 w-full border-border-color bg-background px-2 items-center rounded-md flex flex-col shadow-xs ">
                  <CardContent className="p-0 flex items-end gap-4">
                    <p className="text-heavy">{message?.text}</p>
                    <p className="text-[10px] text-light">
                      {formatTime(message.createdAt)}
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-2 justify-start">
          <img
            src={chatUser?.photo || avatar}
            alt="avatar"
            className="size-5 bg-background-heavy border border-border-color rounded-full"
          />
          <div className="">
            {message.img && (
              <img
                src={message.img}
                alt="placeholder"
                className="w-full h-[200px] object-cover"
              />
            )}
            {message?.text && message.text.length > 0 && (
              <>
                <Card className="py-0 bg-background-heavy border-border-color w-full px-2 items-center rounded-md flex flex-col shadow-xs ">
                  <CardContent className="p-0 flex items-end gap-4">
                    <p className="text-heavy">{message?.text}</p>
                    <p className="text-[10px] text-light">
                      {formatTime(message.createdAt)}
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
