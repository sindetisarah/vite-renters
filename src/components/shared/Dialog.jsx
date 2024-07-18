import * as Dg from "components/ui/dialog";
import * as At from "components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

export const Dialog = ({
  title,
  triggerButton,
  content,
  open,
  onOpenChange,
  contentClassName,
}) => {
  return (
    <Dg.Dialog open={open} onOpenChange={onOpenChange} size>
      <Dg.DialogTrigger asChild>{triggerButton}</Dg.DialogTrigger>
      <Dg.DialogContent className={contentClassName}>
        <Dg.DialogHeader className={` mb-3  mt-3 mr-5`}>
          <Dg.DialogTitle>{title}</Dg.DialogTitle>
        </Dg.DialogHeader>
        {content}
      </Dg.DialogContent>
    </Dg.Dialog>
  );
};

export const AlertDialog = ({
  triggerButtton,
  title,
  description,
  open,
  onOpenChange,
  onClick,
  loading,
  rows,
}) => {
  return (
    <At.AlertDialog open={open} onOpenChange={onOpenChange}>
      <At.AlertDialogTrigger asChild>{triggerButtton}</At.AlertDialogTrigger>
      <At.AlertDialogContent>
        <At.AlertDialogHeader>
          <At.AlertDialogTitle>{title}</At.AlertDialogTitle>
          <At.AlertDialogDescription>{description}</At.AlertDialogDescription>
        </At.AlertDialogHeader>
        <At.AlertDialogFooter>
          <At.AlertDialogCancel
            size="sm"
            className="text-sm h-8 lg:flex justify-center align-middle items-center"
          >
            Cancel
          </At.AlertDialogCancel>
          <At.AlertDialogAction
            type="submit"
            size="sm"
            className="text-sm h-8 lg:flex justify-center align-middle items-center"
            onClick={onClick}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </span>
            ) : (
              `Submit`
            )}
          </At.AlertDialogAction>
        </At.AlertDialogFooter>
      </At.AlertDialogContent>
    </At.AlertDialog>
  );
};
