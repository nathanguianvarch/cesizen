import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginDialog from "./LoginDialog";
import RegisterPage from "./RegisterDialog";

export function AuthDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Se connecter</Button>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className="w-[350px]">
        <Tabs defaultValue="login" className="flex gap-6">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="login">Se connecter</TabsTrigger>
              <TabsTrigger value="register">S'inscrire</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="login">
            <LoginDialog />
          </TabsContent>
          <TabsContent value="register">
            <RegisterPage />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
