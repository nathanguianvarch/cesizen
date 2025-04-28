import { supabase } from "@/lib/supabase";
import { Database } from "../../database.types";
import { toast } from "sonner";

export const fetchInformations = async (): Promise<Database["public"]["Tables"]["information"]["Row"][]> => {
  try {
    const { data, error } = await supabase
      .from('information')
      .select('*')
      .order("created_at");

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

export const addInformation = async (title: string | null, content: string | null, image: string | null, category: number | null) => {
  const { error } = await supabase
  .from('information')
  .insert([ {title, content, image, category } ])

  if(error) {
    toast.error(error.message)
  } else {
    toast.success("Information ajouté.")
  }
}

export const updateInformationById = async (id: number, data: { category?: number | null ; content?: string | null; image?: string | null ; title?: string | null ; url?: string | null; }) => {
  const { error } = await supabase
  .from('information')
  .update(data)
  .eq("id", id)

  if(error) {
    toast.error(error.message)
  } else {
    toast.success("Information mis à jour.")
  }
}

export const deleteInformationById = async (id: number) => {
  const { error } = await supabase
  .from('information')
  .delete()
  .eq("id", id)

  if(error) {
    toast.error(error.message)
  } else {
    toast.success("Information supprimé.")
  }
}