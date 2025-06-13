import { supabase } from "@/lib/supabase";
import { Database } from "../../database.types";
import { toast } from "sonner";

export type ExerciseHistory = Database["public"]["Tables"]["exercise_history"]["Row"];

export const addExerciseSession = async (
  exerciseType: string,
  duration: number,
  notes?: string
): Promise<ExerciseHistory | null> => {
  try {
    const { data, error } = await supabase
      .from('exercise_history')
      .insert([{
        exercise_type: exerciseType,
        duration,
        notes,
      }])
      .select()
      .single();

    if (error) {
      toast.error("Erreur lors de l'enregistrement de la session");
      return null;
    }

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const fetchExerciseHistory = async (): Promise<ExerciseHistory[]> => {
  try {
    const { data, error } = await supabase
      .from('exercise_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Erreur lors de la récupération de l'historique");
      return [];
    }

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getExerciseStats = async () => {
  const history = await fetchExerciseHistory();
  
  const totalSessions = history.length;
  const totalDuration = history.reduce((sum, session) => sum + session.duration, 0);
  const averageDuration = totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0;
  
  // Calculer les statistiques par type d'exercice
  const statsByType = history.reduce((acc, session) => {
    if (!acc[session.exercise_type]) {
      acc[session.exercise_type] = {
        count: 0,
        totalDuration: 0,
      };
    }
    acc[session.exercise_type].count++;
    acc[session.exercise_type].totalDuration += session.duration;
    return acc;
  }, {} as Record<string, { count: number; totalDuration: number }>);

  return {
    totalSessions,
    totalDuration,
    averageDuration,
    statsByType,
  };
}; 