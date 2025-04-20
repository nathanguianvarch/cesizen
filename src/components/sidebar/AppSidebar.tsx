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
import { useEffect, useState } from "react";
import NavAdmin from "./NavAdmin";
import { IconName } from "lucide-react/dynamic";
import { AuthDialog } from "../auth/AuthDialog";
import { fetchCurrentUser } from "@/tools/user";
import { User } from "@supabase/supabase-js";
import { Database } from "../../../database.types";

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
  const [user, setUser] = useState<{
    user: User;
    profile: Database["public"]["Tables"]["profile"]["Row"];
  } | null>(null);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    // setUser(null);

    console.log("ok");
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchCurrentUser();
      setUser(user);
    };
    fetchData();
  }, []);

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center my-5">
        <img src="../logo.svg" alt="" className="w-46" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
        {user && user.profile.role === 1 ? <NavAdmin /> : ""}
      </SidebarContent>
      <SidebarFooter>
        {user ? <NavUser user={user} logout={logout} /> : <AuthDialog />}
      </SidebarFooter>
    </Sidebar>
  );
}
