import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { ProfilePage } from "@/pages/ProfilePage";

interface ProfileDialogProps {
  isProfileOpen: boolean;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ProfileDialog = ({
  isProfileOpen,
  setIsProfileOpen
}: ProfileDialogProps) => {
  return (
    <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="bg-background text-heavy w-sm border-border-color border"
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ProfilePage />
      </DialogContent>
    </Dialog>
  );
};
