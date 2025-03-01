"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { EditProfileSchema, ProfileFormData } from "@/schema/profileSchema";
import { Textarea } from "@/components/ui/textarea";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getUserData } from "@/redux/slice/authSlice";

interface EditProfilePageProps {
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditProfilePage = ({
  setIsEditDialogOpen
}: EditProfilePageProps) => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;

  const form = useForm({ resolver: zodResolver(EditProfileSchema) });
  const navigate = useNavigate();

  const handleImageUpload = async (file?: File) => {
    if (!file) return null;
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
      return data.secure_url || null;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  const handleSubmit = async (data: ProfileFormData) => {
    setLoading(true);

    try {
      if (!userId) {
        throw new Error("User ID is undefined");
      }

      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);
      let newImageUrl = userSnapshot.exists()
        ? userSnapshot.data()?.photo
        : null;

      if (data.photo instanceof File) {
        const uploadedImageUrl = await handleImageUpload(data.photo);
        if (uploadedImageUrl) newImageUrl = uploadedImageUrl;
      }

      const updatedData = {
        name: data.name,
        bio: data.bio,
        photo: newImageUrl ?? null,
        id: userId,
        updatedAt: serverTimestamp()
      };

      await setDoc(userRef, updatedData, { merge: true });

      toast.success("Profile updated successfully!");
      navigate("/");
      setIsEditDialogOpen(false);
      dispatch(getUserData());
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <Card className="w-full mx-auto p-2 border-none shadow-none rounded-none">
          <CardHeader>
            <CardTitle className="text-center text-lg font-semibold">
              Update Profile Details
            </CardTitle>
          </CardHeader>
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Upload Profile Photo</FormLabel>
                <Input
                  id="photo"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    field.onChange(file);

                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setPreviewUrl(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className="flex justify-center items-center h-[100px]">
                  <div
                    onClick={() => document.getElementById("photo")?.click()}
                    className="flex border p-2 cursor-pointer rounded-md w-[200px] h-full flex-col justify-center items-center"
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Uploaded"
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    ) : (
                      <>
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.2639 14.816C24.6812 10.2267 20.7505 6.66669 16.0052 6.66669C12.3305 6.66669 9.13854 8.81469 7.68121 12.2C4.81721 13.056 2.67188 15.76 2.67188 18.6667C2.67188 22.3427 5.66254 25.3334 9.33854 25.3334H10.6719V22.6667H9.33854C7.13321 22.6667 5.33854 20.872 5.33854 18.6667C5.33854 16.7947 6.93721 14.9907 8.90254 14.6454L9.67721 14.5094L9.93321 13.7654C10.8705 11.0307 13.1972 9.33335 16.0052 9.33335C19.6812 9.33335 22.6719 12.324 22.6719 16V17.3334H24.0052C25.4759 17.3334 26.6719 18.5294 26.6719 20C26.6719 21.4707 25.4759 22.6667 24.0052 22.6667H21.3385V25.3334H24.0052C26.9465 25.3334 29.3385 22.9414 29.3385 20C29.337 18.8047 28.9347 17.6444 28.196 16.7047C27.4574 15.7649 26.425 15.0999 25.2639 14.816Z"
                            fill="#000"
                          />
                          <path
                            d="M17.3385 18.6667V13.3334H14.6719V18.6667H10.6719L16.0052 25.3334L21.3385 18.6667H17.3385Z"
                            fill="#000"
                          />
                        </svg>

                        <p className="text-xs text-center">
                          Drag & drop or click to upload
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CardFooter className="p-0 flex-col gap-4">
            <Button
              disabled={loading || form.formState.isSubmitting}
              type="submit"
              className="w-full cursor-pointer"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
