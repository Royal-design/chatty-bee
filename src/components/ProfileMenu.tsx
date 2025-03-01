import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/store";
import { CiMenuKebab, CiEdit } from "react-icons/ci";
import { useState } from "react";
import { toast } from "sonner";

import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { EditProfileDialog } from "./EditProfileDialog";
import { ProfileDialog } from "./ProfileDialog";

export const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const signOut = async () => {
    const response = await dispatch(logoutUser());
    if (response.success) {
      toast.success("User logged out successfully");
      navigate("/login");
    } else {
      toast.error(response.message || "Logout failed");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <CiMenuKebab className="text-[#a2a0a0]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-heavy border border-border-color bg-gradient-to-r from-[#0c0900] to-[#141001]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="border-border-color border" />
          <DropdownMenuItem
            onClick={() => setIsProfileOpen(true)}
            className="hover:bg-background-hover"
          >
            <CgProfile className="text-light" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer hover:bg-background-hover"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <CiEdit className="text-light" />
            <span>Edit Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-border-color border" />
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer hover:bg-background-hover"
            onClick={signOut}
          >
            <FiLogOut className="text-light" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />

      {/* Profile Dialog */}
      <ProfileDialog
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
      />
    </>
  );
};
