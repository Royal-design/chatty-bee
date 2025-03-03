import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { InputFormData, inputSchema } from "@/schema/inputSchema";
import EmojiPicker from "emoji-picker-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Input } from "./ui/input";
import { FaImage } from "react-icons/fa6";
import { resetFocus } from "@/redux/slice/chatSlice";
import { BiSolidSend } from "react-icons/bi";

interface InputProps {
  focusRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const TextInput = ({ focusRef }: InputProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const { chatId, shouldFocus, isCurrentUserBlocked, isReceiverBlocked, user } =
    useAppSelector((state) => state.chats.chats);

  const form = useForm<InputFormData>({
    resolver: zodResolver(inputSchema),
    defaultValues: { text: "", photo: null }
  });

  const handleImageUpload = async (file?: File | null) => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chattybee");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/chattybee/image/upload",
        { method: "POST", body: formData }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setImageUrl(data.secure_url);
      if (chatId && currentUser) {
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            senderId: currentUser?.id || "",
            text: "",
            img: data.secure_url,
            createdAt: new Date()
          })
        });
      }
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      toast.error("Image upload failed. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFocus) {
      setTimeout(() => focusRef.current?.focus(), 100);
      dispatch(resetFocus());
    }
  }, [shouldFocus]);

  const onSubmit = async (data: InputFormData) => {
    if (!data.text.trim() && !imageUrl) return;

    setLoading(true);

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser?.id,
          text: data.text.trim() || "",
          createdAt: new Date()
        })
      });

      const userIds = [currentUser?.id, user?.id];
      userIds.forEach(async (id) => {
        if (id) {
          const userChatsRef = doc(db, "userChats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);
          if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data();
            const chatIndex = userChatsData.chats.findIndex(
              (c: { chatId: string }) => c.chatId === chatId
            );

            userChatsData.chats[chatIndex].lastMessage = data.text.trim()
              ? data.text.trim()
              : "📷 Image";
            userChatsData.chats[chatIndex].isSeen = id === currentUser?.id;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatsRef, { chats: userChatsData.chats });
          }
        }
      });

      form.reset();
      setTimeout(() => focusRef.current?.focus(), 100);
      setImageUrl(null);
      setOpen(false);
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex w-full justify-between gap-2 items-center rounded"
      >
        <div className="relative w-full">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Textarea
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                    placeholder={
                      isCurrentUserBlocked || isReceiverBlocked
                        ? "You cannot send a message "
                        : "Type your message..."
                    }
                    {...field}
                    ref={(e) => {
                      field.ref(e);
                      if (e) focusRef.current = e;
                    }}
                    className="w-full border-border-color text-light pl-[3rem] h-[3rem] min-h-[3rem] max-h-[40px]  overflow-auto scrollbar-hidden rounded-4xl resize-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="absolute top-[30%] left-4">
            <div
              className={
                isCurrentUserBlocked || isReceiverBlocked
                  ? "cursor-not-allowed "
                  : `relative cursor-pointer cursor `
              }
              onClick={() => setOpen((prev) => !prev)}
            >
              {" "}
              {isCurrentUserBlocked || isReceiverBlocked ? (
                <MdOutlineEmojiEmotions size="25" className="text-gray-400" />
              ) : (
                <MdOutlineEmojiEmotions size="25" className="text-light" />
              )}
            </div>
            {!(isCurrentUserBlocked || isReceiverBlocked) && open && (
              <div className="absolute bottom-10">
                <EmojiPicker
                  onEmojiClick={(e) =>
                    form.setValue("text", form.getValues("text") + e.emoji)
                  }
                />
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name="photo"
            render={() => (
              <FormItem className="absolute right-4 top-[30%]">
                <FormLabel htmlFor="image">
                  <FaImage
                    size={24}
                    className={
                      isCurrentUserBlocked || isReceiverBlocked
                        ? "cursor-not-allowed  text-gray-500"
                        : "cursor-pointer  text-light"
                    }
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                    type="file"
                    accept="image/*"
                    id="image"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0] || null;
                      if (file) {
                        const url = await handleImageUpload(file);
                        setImageUrl(url);
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          variant="ghost"
          className={
            isCurrentUserBlocked || isReceiverBlocked
              ? "cursor-not-allowed"
              : "hover:bg-transparent duration-200 size-12 rounded-full bg-background-heavy border border-border-color text-primary cursor-pointer"
          }
          type="submit"
          disabled={
            loading ||
            form.formState.isSubmitting ||
            isCurrentUserBlocked ||
            isReceiverBlocked
          }
          aria-label="Send Message"
        >
          {loading ? (
            <span className=" border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <BiSolidSend size={20} className="text-light" />
          )}
        </Button>
      </form>
    </Form>
  );
};
