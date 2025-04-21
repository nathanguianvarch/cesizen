import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const deleteUserById = async (id: string) => {
  const { error } = await supabase.auth.admin.deleteUser(
    id
  )
  if (error) {
    toast.error("Erreur lors de la suppression : " + error.message)
  } else {
  }
};

export const disableUserById = async (id: string) => {
  const { error } = await supabase
  .from('profile')
  .update({ active: false })
  .eq('id', id)
  if (error) {
    toast.error("Erreur lors de la désactivation : " + error.message)
  } else {
  }
};

export const ActivateUserById = async (id: string) => {
  const { error } = await supabase
  .from('profile')
  .update({ active: true })
  .eq('id', id)
  if (error) {
    toast.error("Erreur lors de la activation : " + error.message)
  } else {
  }
};