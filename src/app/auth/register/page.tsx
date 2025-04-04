"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { CircleX, Loader, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    if (
      lastName &&
      firstName &&
      email &&
      password &&
      confirmPassword &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [lastName, firstName, email, password, confirmPassword]);

  const register = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    const user = data.user;

    if (error) {
      toast.error(error.message);
    } else {
      const { data, error } = await supabase
        .from("user_data")
        .insert([{ id: user, firstName: "otherValue" }])
        .select();
      redirect("/home");
    }
  };

  const verifyEmailSyntax = (email: string) => {
    if (email.length !== 0) {
      const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      if (!regex.test(email)) {
        setEmailError("Vérifiez le format de votre email.");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  };

  const verifyPasswordMatch = (pwd: string, confirmPwd: string) => {
    if (pwd.length === 0 || confirmPwd.length === 0) {
      setPasswordError("");
      setConfirmPasswordError("");
      return;
    }

    if (pwd !== confirmPwd) {
      setPasswordError("Le mot de passe de confirmation ne correspond pas.");
      setConfirmPasswordError(
        "Le mot de passe de confirmation ne correspond pas."
      );
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
    }
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Toaster richColors />
      <Card className="w-100">
        <CardHeader>
          <CardTitle className="text-2xl">S'inscrire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mail@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  verifyEmailSyntax(e.target.value);
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
            <div className="grid gap-2">
              <Label htmlFor="email">Nom</Label>
              <Input
                id="lastName"
                type="text"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Prénom</Label>
              <Input
                id="firstName"
                type="text"
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  verifyPasswordMatch(e.target.value, confirmPassword);
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </Label>
              </div>
              <Input
                id="confirmPassword"
                type="password"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  verifyPasswordMatch(e.target.value, confirmPassword);
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
            <Button
              type="submit"
              className="w-full"
              onClick={register}
              disabled={submitDisabled}
            >
              {loading ? (
                <LoaderCircle color="white" className="animate-spin" />
              ) : (
                ""
              )}
              S'inscrire
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Vous avez déjà un compte ?{" "}
            <Link href="/auth/login" className="underline underline-offset-4">
              Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
