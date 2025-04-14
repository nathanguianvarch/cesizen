"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Database } from "../../database.types";

type AppUser = User & Database["public"]["Tables"]["user_data"]["Row"];

type UserContextType = {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from("user_data")
          .select("*")
          .eq("id", user.id)
          .single()
          .then(({ data: userData }) => {
            if (userData) {
              const completeUser = { ...user, ...userData } as AppUser;
              setUser(completeUser);
            }
          });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        supabase
          .from("user_data")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data: userData }) => {
            if (userData) {
              const completeUser = { ...session.user, ...userData } as AppUser;
              setUser(completeUser);
            }
          });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
