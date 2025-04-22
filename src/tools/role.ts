import { supabase } from "@/lib/supabase";
import { Database } from "../../database.types";
import { toast } from "sonner";

export const fetchRoles = async (): Promise<Database["public"]["Tables"]["role"]["Row"][]> => {
  try {
    const { data, error } = await supabase
      .from('role')
      .select('*');

    if (error) {
      toast.error("Erreur lors de la récupération des informations");
      return [];
    }

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};