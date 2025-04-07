"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Bot, Frame, PieChart, SquareTerminal, Map } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import NavAdmin from "./nav-admin";
import LoginDialog from "./LoginDialog";

export interface UserData {
  firstName: string;
  lastName: string;
  active: boolean;
  role: number;
}

const data = {
  navMain: {
    title: "Application",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      { icon: "plus", title: "Informations", url: "/informations" },
      { title: "Diagnotics", url: "/diagnostics" },
      { title: "Exercices", url: "/exercices" },
      { title: "Activités", url: "/activities" },
      { title: "Emotions", url: "/emotions" },
    ],
  },
};

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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user && user.role === 1 ? <NavAdmin /> : ""}
        {user ? <NavUser user={user} logout={logout} /> : <LoginDialog />}
      </SidebarFooter>
    </Sidebar>
  );
}
