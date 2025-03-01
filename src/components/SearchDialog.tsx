import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Input } from "./ui/input";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { SearchFormData, searchSchema } from "@/schema/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import avatar from "../assets/user-avatar.jpg";
import { useAppSelector } from "@/redux/store";
import { toast } from "sonner";

interface UserType {
  id: string;
  name: string;
  photo?: string;
  bio?: string;
}

export const SearchDialog = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const currentUser = useAppSelector((state) => state.auth.user);
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { name: "" }
  });

  const onSubmit = async (data: SearchFormData) => {
    setLoading(true);
    setError(null);
    setUser(null);

    if (!data.name.trim()) {
      setError("Please enter a valid name.");
      setLoading(false);
      return;
    }

    try {
      const userRef = collection(db, "users");
      const q = query(
        userRef,
        where("name_sensitive", "==", data.name.toLowerCase())
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const foundUser = querySnapshot.docs[0].data() as UserType;

        if (foundUser.id === currentUser?.id) {
          toast.error("You cannot search for yourself.");
          setLoading(false);
          return;
        }

        setUser(foundUser);
      } else {
        setError("User not found.");
        toast.error("User not found");
      }
      form.reset();
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddChat = async () => {
    if (!user || !currentUser) return;

    try {
      const userChatsRef = doc(db, "userChats", currentUser.id);
      const userChatsSnap = await getDocs(collection(db, "userChats"));

      let chatExists = false;

      userChatsSnap.forEach((doc) => {
        const data = doc.data();
        const existingChat = data.chats?.find(
          (chat: any) => chat.receiverId === user.id
        );
        if (existingChat) chatExists = true;
      });

      if (chatExists) {
        toast.error("Chat already exists with this user.");
        setTimeout(() => {
          setUser(null);
        }, 300);
        return;
      }

      const chatRef = collection(db, "chats");
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: []
      });

      await updateDoc(userChatsRef, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now()
        })
      });

      await updateDoc(doc(db, "userChats", user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now()
        })
      });

      toast.success("Chat added successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error adding chat:", error);
      toast.error("Failed to add chat. Try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IoIosAddCircleOutline
          size={25}
          className="cursor-pointer duration-200 text-light hover:text-heavy"
        />
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="bg-background text-light border-border-color max-w-sm w-xs p-6 rounded-lg shadow-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-heavy">Search for a User</DialogTitle>
          <DialogDescription className="text-light mb-2">
            Enter a name to find a user.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative w-full flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">User Name</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        {...field}
                        className="border-border-color text-light"
                        placeholder="Enter name..."
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="p-2 bg-background-heavy border-border-color border duration-200 hover:bg-background-hover"
                    >
                      <IoAddCircleOutline size={20} />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {user && (
          <div className="flex flex-col gap-2">
            <div className="mt-4 flex items-center gap-3 p-3 border rounded-md shadow-sm bg-gray-50">
              <img
                src={user.photo || avatar}
                alt="user"
                className="size-12 rounded-full bg-gray-200"
              />
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">
                  {user.bio || "No bio available"}
                </p>
              </div>
            </div>
            <Button onClick={handleAddChat}>Add Chat</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
