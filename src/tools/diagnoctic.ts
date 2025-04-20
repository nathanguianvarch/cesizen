import { supabase } from "@/lib/supabase";
import { Database } from "../../database.types";
import { toast } from "sonner";

export const fetchDiagnosticsEvents = async (): Promise<Database["public"]["Tables"]["diagnostic_event"]["Row"][]> => {
  try {
    const { data, error } = await supabase
      .from('diagnostic_event')
      .select('*')
      .order("points", {ascending: false});

    if (error) {
      toast.error("Erreur lors de la récupération des catégories d'informations");
      return [];
    }

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};