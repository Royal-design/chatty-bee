import { EditProfilePage } from "@/pages/EditProfilePage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";

interface EditProfileDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditProfileDialog = ({
  isEditDialogOpen,
  setIsEditDialogOpen
}: EditProfileDialogProps) => {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="bg-background border text-heavy border-border-color  max-w-sm w-sm"
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <EditProfilePage setIsEditDialogOpen={setIsEditDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};
