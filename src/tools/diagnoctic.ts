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

export const addDiagnotic = async (title: string | null, points: number | null) => {
  const { error } = await supabase
  .from('diagnostic_event')
  .insert([ {title, points} ])
  .select()

  if(error) {
    toast.error(error.message)
  } else {
    toast.success("Diagnostic ajouté.")
  }
}

export const updateDiagnoticById = async (id: number, data: {title?: string | null ; points?: number | null; }) => {
  const { error } = await supabase
  .from('diagnostic_event')
  .update(data)
  .eq("id", id)

  if(error) {
    toast.error(error.message)
  } else {
    toast.success("Diagnostic mis à jour.")
  }
}

export const deleteDiagnoticById = async (id: number) => {
  const { error } = await supabase
  .from('diagnostic_event')
  .delete()
  .eq("id", id)

  if(error) {
    toast.error(error.message)
  } else {
    toast.success("Diagnostic supprimé.")
  }
}