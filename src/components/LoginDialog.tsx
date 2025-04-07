/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function LoginDialog() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: mail,
      password: password,
    });

    if (error) {
      console.error("Erreur lors de la connexion :", error.message);
    } else {
      console.log("Connexion réussie :", data);
      redirect("/home");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Se connecter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Se connecter</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="mail@example.com"
              required
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Mot de passe oublié?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" onClick={() => login()}>
            Se connecter
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Vous n'avez pas de compte?{" "}
          <Link href="/auth/register" className="underline underline-offset-4">
            S'inscrire
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
