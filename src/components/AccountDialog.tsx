import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  changePasswordByEmail,
  fetchCurrentUser,
  updateUserById,
} from "@/tools/user";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { verifyPasswordMatch } from "@/tools/auth";

export function AccountDialog() {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  useEffect(() => {
    setPasswordError(verifyPasswordMatch(password, confirmPassword));
    setConfirmPasswordError(verifyPasswordMatch(password, confirmPassword));
  }, [password, confirmPassword]);

  const handleChange = async () => {
    await updateUserById(userId, { firstname, lastname });
    if (
      password &&
      confirmPassword &&
      !passwordError &&
      !confirmPasswordError
    ) {
      await changePasswordByEmail(email, password);
    }
    handleClose();
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
        <DialogDescription></DialogDescription>
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
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Nouveau mot de passe</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              {passwordError ? (
                <div>
                  <Label className="text-red-600 text-xs">
                    {passwordError}
                  </Label>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">
                  Confirmer le nouveau mot de passe
                </Label>
              </div>
              <Input
                id="confirmPassword"
                type="password"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
              />
              {confirmPasswordError ? (
                <div>
                  <Label className="text-red-600 text-xs">
                    {confirmPasswordError}
                  </Label>
                </div>
              ) : (
                ""
              )}
            </div>
            <Button type="submit" onClick={handleChange}>
              Sauvegarder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
