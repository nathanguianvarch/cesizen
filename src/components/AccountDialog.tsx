/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { addDiagnotic } from "@/tools/diagnoctic";
import { fetchCurrentUser, updateUserById } from "@/tools/user";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { UserIcon } from "lucide-react";

export function AccountDialog() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        setUserId(user.user.id);
        setEmail(user.user.email!);
        setLastname(user.profile.lastname);
        setFirstname(user.profile.firstname);
      }
    };
    fetchData();
  }, []);

  const handleClose = (): void => {
    setOpen(false);
  };
  const handleOpen = (): void => {
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleOpen();
          }}
        >
          <UserIcon />
          Mon compte
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-[350px]">
        <DialogTitle>Modifier son compte</DialogTitle>
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row">
                <Label>Nom</Label>
              </div>
              <Input
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row">
                <Label>Prénom</Label>
              </div>
              <Input
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              onClick={async () => {
                console.log(userId);
                await updateUserById(userId, { firstname, lastname });
                handleClose();
              }}
            >
              Sauvegarder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
