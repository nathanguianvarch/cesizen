/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import NavAdmin from "./NavAdmin";
import { IconName } from "lucide-react/dynamic";
import { AuthDialog } from "../auth/AuthDialog";
import { useUser } from "@/context/UserContext";

export interface UserData {
  firstName: string;
  lastName: string;
  active: boolean;
  role: number;
}

const data: {
  title: string;
  url: string;
  icon?: IconName;
}[] = [
  { title: "Accueil", url: "/", icon: "home" },
  { title: "Informations", url: "/informations", icon: "book-text" },
  { title: "Diagnotics", url: "/diagnostics", icon: "chart-spline" },
  { title: "Exercices", url: "/exercices", icon: "activity" },
  { title: "Activités", url: "/activities", icon: "list" },
  { title: "Emotions", url: "/emotions", icon: "smile" },
];

export function AppSidebar() {
  const { user } = useUser();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    // setUser(null);

    console.log("ok");
  };

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
    } else {
      console.error("Erreur lors de la récupération de userData :", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center my-5">
        <img src="logo.svg" alt="" className="w-46" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
        {user && user.role === 1 ? <NavAdmin /> : ""}
      </SidebarContent>
      <SidebarFooter>
        {user ? <NavUser user={user} logout={logout} /> : <AuthDialog />}
      </SidebarFooter>
    </Sidebar>
  );
}
