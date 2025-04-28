"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, verifyEmailSyntax } from "@/tools/auth";
import { useEffect, useState } from "react";
export default function LoginDialog({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmailError(verifyEmailSyntax(email));
  }, [email]);

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="mail@example.com"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          {emailError ? (
            <div>
              <Label className="text-red-600 text-xs">{emailError}</Label>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <Label>Mot de passe</Label>
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
        <Button
          type="submit"
          onClick={async () => {
            await login({ email, password }, onClose);
          }}
        >
          Se connecter
        </Button>
      </div>
    </div>
  );
}
