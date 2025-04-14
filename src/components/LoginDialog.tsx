/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
export default function LoginDialog() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: mail,
      password: password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      console.log("Connexion réussie :", data);
      redirect("/home");
    }
  };
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            placeholder="mail@example.com"
            required
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <Label>Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Mot de passe oublié?
            </a>
          </div>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" onClick={() => login()}>
          Se connecter
        </Button>
      </div>
      <div>
        Vous n'avez pas de compte?{" "}
        <Link href="/auth/register" className="underline underline-offset-4">
          S'inscrire
        </Link>
      </div>
    </div>
  );
}
