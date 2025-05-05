import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { addDiagnostic } from "@/tools/diagnoctic";
import { Database } from "../../database.types";
interface AddInformationsDialogProps {
  onSuccess?: (
    newInfo: Database["public"]["Tables"]["diagnostic_event"]["Row"]
  ) => void;
  onError?: (error: unknown) => void;
}

export function AddDiagnosticsDialog({
  onSuccess,
}: AddInformationsDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState(0);

  const handleClose = (): void => {
    setOpen(false);
  };
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleAddDiagnostics = async () => {
    const addedDiag = await addDiagnostic(title, points);
    if (addedDiag) {
      onSuccess?.(addedDiag);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen}>Ajouter un diagnoctic</Button>
      </DialogTrigger>
      <DialogContent className="w-[350px]">
        <DialogTitle>Ajouter un diagnoctic</DialogTitle>
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Label>Titre</Label>
              <Input
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row">
                <Label>Points</Label>
              </div>
              <Input
                required
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value))}
              />
            </div>
            <Button type="submit" onClick={handleAddDiagnostics}>
              Créer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
