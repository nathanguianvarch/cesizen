"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import NavAdmin from "./nav-admin";
import LoginDialog from "./LoginDialog";
import { IconName } from "lucide-react/dynamic";
import { AuthDialog } from "./AuthDialog";

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
  { title: "Informations", url: "/informations", icon: "book-text" },
  { title: "Diagnotics", url: "/diagnostics", icon: "chart-spline" },
  { title: "Exercices", url: "/exercices", icon: "activity" },
  { title: "Activités", url: "/activities", icon: "list" },
  { title: "Emotions", url: "/emotions", icon: "smile" },
];

export function AppSidebar() {
  const [user, setUser] = useState<(User & UserData) | null>(null);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    setUser(null);

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
      setUser({ ...user, ...userData });
    } else {
      console.error("Erreur lors de la récupération de userData :", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarFooter>
        {user && user.role === 1 ? <NavAdmin /> : ""}
        {user ? <NavUser user={user} logout={logout} /> : <AuthDialog />}
      </SidebarFooter>
    </Sidebar>
  );
}
