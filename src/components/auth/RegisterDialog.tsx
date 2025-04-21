/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register, verifyEmailSyntax, verifyPasswordMatch } from "@/tools/auth";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RegisterPage({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    if (
      lastname &&
      firstname &&
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
  }, [
    lastname,
    firstname,
    email,
    password,
    confirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
  ]);

  const handleSubmit = async () => {
    setLoading(true);
    register({ email, password }, { firstname, lastname }, onClose);
    setLoading(false);
  };

  useEffect(() => {
    setEmailError(verifyEmailSyntax(email));
  }, [email]);

  useEffect(() => {
    setPasswordError(verifyPasswordMatch(password, confirmPassword));
    setConfirmPasswordError(verifyPasswordMatch(password, confirmPassword));
  }, [password, confirmPassword]);

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
          <Label>Nom</Label>
          <Input
            required
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            value={lastname}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Prénom</Label>
          <Input
            required
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            value={firstname}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="password">Mot de passe</Label>
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
              <Label className="text-red-600 text-xs">{passwordError}</Label>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
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
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit}
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
      <div className="flex flex-col justify-center items-center">
        <p>Vous avez déjà un compte ?</p>
        <Link href="/auth/login" className="underline underline-offset-4">
          Se connecter
        </Link>
      </div>
    </div>
  );
}
