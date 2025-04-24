import { supabase } from "@/lib/supabase";
import { Database } from "../../database.types";
import { toast } from "sonner";

export const fetchRespirations = async (): Promise<Database["public"]["Tables"]["respiration"]["Row"][]> => {
  try {
    const { data, error } = await supabase
      .from('respiration')
      .select('*')
      .order("created_at");

    if (error) {
      toast.error("Erreur lors de la récupération des exercices de respiration");
      return [];
    }

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};