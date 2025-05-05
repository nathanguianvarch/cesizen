/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginDialog from "./LoginDialog";
import RegisterPage from "./RegisterDialog";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function AuthDialog() {
  const [open, setOpen] = useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };
  const handleOpen = (): void => {
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen}>Se connecter</Button>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className="w-[350px]">
        <DialogDescription></DialogDescription>
        <Tabs defaultValue="login" className="flex gap-6">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="login">Se connecter</TabsTrigger>
              <TabsTrigger value="register">S'inscrire</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="login">
            <LoginDialog onClose={handleClose} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterPage onClose={handleClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
