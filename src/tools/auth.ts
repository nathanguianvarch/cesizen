import { supabase } from "@/lib/supabase";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";
import { toast } from "sonner";

export const login = async (credentials: SignInWithPasswordCredentials, onClose: () => void) => {
  const {data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    toast.error("Erreur lors de la connexion : " + error.message)
  } else {
    const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", data.user.id)
    .single();
    if(profileError) {
      toast.error("Erreur lors de la connexion : " + profileError.message)
    } else {
      if(profile.active) {
        onClose();
      } else {
        toast.error("Compte désactivé")
        await logout()
      }
    }
  }
};

export const register = async (credentials: SignInWithPasswordCredentials, userData: {firstname: string, lastname: string}, onClose: () => void) => {
  const { data, error } = await supabase.auth.signUp(credentials);
  const user = data.user;

  if (error) {
    toast.error(error.message);
  } else {
    if(user) {
      const { error } = await supabase
      .from("profile")
      .insert([{id: user.id, firstname: userData.firstname, lastname: userData.lastname}])
      .select();
      if (error) {
        toast.error(error.message);
      } else {
        onClose()
      }
    }
  }
};
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.error(error.message);
  }
};

export const verifyEmailSyntax = (email: string): string => {
  if (email.length !== 0) {
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    if (!regex.test(email)) {
      return "Vérifiez le format de votre email."
    }
  }
  return ""
};

export const verifyPasswordMatch = (password: string, confirmPassword: string): string => {
  if (password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword) {
    return "Le mot de passe de confirmation ne correspond pas."
  }
  return ""
};