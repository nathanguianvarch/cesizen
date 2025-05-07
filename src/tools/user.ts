import { supabase, supabaseAdmin } from "@/lib/supabase";
import { Database } from "../../database.types";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export const fetchAllUsers = async (): Promise<{
  user: User;
  profile: Database["public"]["Tables"]["profile"]["Row"];
}[]> => {
  // Récupère tous les utilisateurs via l'admin API
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) {
    toast.error("Erreur récupération des utilisateurs : " + listError.message);
    return [];
  }

  const { data: profiles, error: profilesError } = await supabase
    .from("profile")
    .select(`*`)
  if (profilesError) {
    toast.error("Erreur récupération des profils : " + profilesError.message);
    return [];
  }

  return users.map((user) => ({
    user,
    profile: profiles.find((p) => p.id === user.id)!,
  }));
};


export const fetchCurrentUser = async (): Promise<{
  user: User;
  profile: Database["public"]["Tables"]["profile"]["Row"];
} | null> => {
  const { data, error: userError } = await supabase.auth.getUser();
  if (userError || !data.user) {
    toast.error(
      "Erreur lors de la récupération de l'utilisateur courant : " +
        (userError?.message ?? "Utilisateur non connecté")
    );
    return null;
  }
  const userId = data.user.id;

  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) {
    toast.error("Erreur lors de la récupération du profil : " + profileError.message);
    return null;
  }

  return { user: data.user, profile };
};

export const getRoleName = async (roleId: number): Promise<string | null> => {
  const { data: role, error: roleError } = await supabase
    .from("role")
    .select("name")
    .eq("id", roleId)
    .single();

  if (roleError) {
    toast.error("Erreur lors de la récupération du rôle : " + roleError.message);
    return null;
  }

  return role?.name ?? null;
};

export const subscribeToCurrentUser = (callback: (current: { user: User; profile: Database["public"]["Tables"]["profile"]["Row"] } | null) => void) => {
  fetchCurrentUser().then(callback);

  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      const updated = await fetchCurrentUser();
      callback(updated);
    } else {
      callback(null);
    }
  });

  return () => {
    subscription.unsubscribe();
  };
};

export const updateUserById = async (id: string, data: {
  active?: boolean;
  created_at?: string;
  firstname?: string;
  lastname?: string;
  role?: number | null;
}) => {
  const { error } = await supabase
  .from('profile')
  .update(data)
  .eq('id', id)
  if(error) {
    toast.error(error.message)
  } else {
    toast.success("Utilisateur mis à jour.")
  }
}

export const changePasswordByEmail = async (email: string, newPassword: string) => {
  const { data: allUsers, error } = await supabaseAdmin.auth.admin.listUsers();
  if(error) {
    toast.error(error.message)
    return null
  }
  const user = allUsers.users.find((u) => u.email === email);
  if(user) {
    const { error: errorChangePassword } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: newPassword
    });
    if(errorChangePassword) {
      toast.error(errorChangePassword.message)
    } else {
      toast.success("Utilisateur mis à jour.")
    }
  }
}