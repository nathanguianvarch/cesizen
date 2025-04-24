// context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Database } from "../../database.types";

type Profile = Database["public"]["Tables"]["profile"]["Row"];
type AuthState = { user: User; profile: Profile } | null;

interface AuthContextType {
  auth: AuthState;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // 1. Charger la session existante
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (profile && mounted) setAuth({ user: session.user, profile });
      }
      setLoading(false);
    });

    // 2. Écouter les changements d’auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setAuth(profile ? { user: session.user, profile } : null);
      } else {
        setAuth(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
