"use client";
import { UserData } from "@/components/app-sidebar";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState<(User & UserData) | null>(null);
  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: userData, error } = await supabase
      .from("user_data")
      .select("*")
      .eq("id", user.id)
      .single();
    console.log(userData);

    if (!error && userData) {
      setUser({ ...user, ...userData });
    } else {
      console.error("Erreur lors de la récupération de userData :", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <p>{user?.email}</p>
      <p>{user?.firstName}</p>
      <p>{user?.lastName}</p>
    </div>
  );
}
