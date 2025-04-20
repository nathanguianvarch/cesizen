"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from "../../../database.types";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState<
    (User & Database["public"]["Tables"]["profile"]["Row"]) | null
  >(null);
  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profile, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();
    console.log(profile);

    if (!error && profile) {
      setUser({ ...user, ...profile });
      if (user.email) {
        setEmail(user.email);
        setLastName(profile.lastname);
        setFirstName(profile.firstname);
      }
    } else {
      console.error("Erreur lors de la récupération du profile :", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <p>{user?.email}</p>
      <p>{user?.firstname}</p>
      <p>{user?.lastname}</p>
      <h1>Modifier son compte</h1>
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="mail@example.com"
          required
          onChange={(e) => {
            setEmail(e.target.value);
            // verifyEmailSyntax(e.target.value);
          }}
          value={email}
          disabled
        />
        {/* {emailError ? (
          <div>
            <Label className="text-red-600 text-xs">{emailError}</Label>
          </div>
        ) : (
          ""
        )} */}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Nom</Label>
        <Input
          required
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          value={lastName}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Prénom</Label>
        <Input
          required
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          value={firstName}
        />
      </div>
      <div className="flex flex-row gap-2 items-center justify-center">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Compte actif ?
        </label>
      </div>
    </div>
  );
}
