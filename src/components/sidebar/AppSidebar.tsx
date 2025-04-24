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
import NavAdmin from "./NavAdmin";
import { IconName } from "lucide-react/dynamic";
import { AuthDialog } from "../auth/AuthDialog";
import { logout } from "@/tools/auth";
import { useAuth } from "@/context/AuthContext";

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
  const { auth } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center my-5">
        <img src="../logo.svg" alt="" className="w-46" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
        {auth && auth.profile.role === 1 ? <NavAdmin /> : ""}
      </SidebarContent>
      <SidebarFooter>
        {auth ? <NavUser user={auth} logout={logout} /> : <AuthDialog />}
      </SidebarFooter>
    </Sidebar>
  );
}
