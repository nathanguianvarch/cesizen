import { supabase } from "@/lib/supabase";
import { Database } from "../../database.types";
import { toast } from "sonner";

export const fetchInformations = async (): Promise<Database["public"]["Tables"]["information"]["Row"][]> => {
  try {
    const { data, error } = await supabase
      .from('information')
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

export const fetchInformationCategories = async (): Promise<Database["public"]["Tables"]["information_category"]["Row"][]> => {
  try {
    const { data, error } = await supabase
      .from('information_category')
      .select('*');

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