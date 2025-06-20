"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LoaderCircle } from "lucide-react";
import { ExerciseHistory, getExerciseStats } from "@/tools/exercise-history";
import { formatDate } from "@/tools/format";

export function ExerciseHistoryComponent() {
  const [stats, setStats] = useState<Awaited<
    ReturnType<typeof getExerciseStats>
  > | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getExerciseStats();
        setStats(data);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-row gap-2 p-4">
        <LoaderCircle className="animate-spin" />
        Chargement des statistiques
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vos statistiques d'exercices</CardTitle>
          <CardDescription>
            Suivez votre progression dans la pratique des exercices de
            respiration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Sessions totales</h3>
              <p className="text-2xl font-bold">{stats.totalSessions}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Durée totale</h3>
              <p className="text-2xl font-bold">
                {Math.round(stats.totalDuration / 60)} min
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Durée moyenne</h3>
              <p className="text-2xl font-bold">{stats.averageDuration} sec</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Statistiques par type d'exercice
            </h3>
            {Object.entries(stats.statsByType).map(([type, data]) => (
              <div key={type} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{type}</span>
                  <span>{data.count} sessions</span>
                </div>
                <Progress value={(data.count / stats.totalSessions) * 100} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
