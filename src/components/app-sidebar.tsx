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

export interface UserData {
  firstName: string;
  lastName: string;
}

type FullUser = User & UserData;

const data = {
  navMain: [
    {
      title: "Application",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Informations", url: "#" },
        { title: "Diagnotics", url: "#" },
        { title: "Exercices", url: "#" },
        { title: "Activités", url: "#" },
        { title: "Emotions", url: "#" },
      ],
    },
    {
      title: "Administrateur",
      url: "#",
      icon: Bot,
      items: [{ title: "Genesis", url: "#" }],
    },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: Frame },
    { name: "Sales & Marketing", url: "#", icon: PieChart },
    { name: "Travel", url: "#", icon: Map },
  ],
};

export function AppSidebar() {
  const [user, setUser] = useState<FullUser | null>(null);

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

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "nathanguianvarch@gmail.com",
      password: "Nathan240904", // ⚠️ à remplacer par une variable d'environnement ou supprimé après test
    });

    fetchUser();

    if (error) {
      console.error("Erreur lors de la connexion :", error.message);
    } else {
      console.log("Connexion réussie :", data);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser user={user} logout={logout} />
        ) : (
          <Button onClick={login}>Se connecter</Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
