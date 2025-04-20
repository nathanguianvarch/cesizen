"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { fetchDiagnosticsEvents } from "@/tools/diagnoctic";
import { Database } from "../../../database.types";

export default function DiagnosticsPage() {
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [diagnocticsEvents, setDiagnocticsEvents] = useState<
    Database["public"]["Tables"]["diagnostic_event"]["Row"][]
  >([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const getDiagnosticsEvents = async () => {
      const data = await fetchDiagnosticsEvents();
      setDiagnocticsEvents(data);
    };
    getDiagnosticsEvents();
  });

  const totalPoints = selectedEvents.reduce((sum, eventId) => {
    const event = diagnocticsEvents.find((e) => e.id === eventId);
    return sum + (event ? event.points : 0);
  }, 0);

  const handleEventToggle = (eventId: number) => {
    setSelectedEvents((prev: number) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const getStressLevel = () => {
    if (totalPoints < 150) return { level: "Faible", color: "text-green-500" };
    if (totalPoints < 300) return { level: "Modéré", color: "text-yellow-500" };
    return { level: "Élevé", color: "text-red-500" };
  };

  const resetDiagnostic = () => {
    setSelectedEvents([]);
    setShowResults(false);
  };

  return (
    <div className="m-4 flex flex-col gap-6 items-center">
      <div className="flex flex-row gap-4 items-center">
        <SidebarTrigger size="lg" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Diagnostic de stress
        </h1>
      </div>
      <div className="w-100 lg:w-150">
        {!showResults ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Questionnaire de stress
              </CardTitle>
              <CardDescription>
                Cochez les événements que vous avez vécus au cours des 12
                derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {diagnocticsEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-2 border-b py-2"
                  >
                    <Checkbox
                      checked={selectedEvents.includes(event.id)}
                      onCheckedChange={() => handleEventToggle(event.id)}
                    />
                    <div className="flex flex-1 items-center justify-between">
                      <label className="text-sm">{event.title}</label>
                      <span className="text-sm text-muted-foreground">
                        {event.points} points
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Total: <span className="font-bold">{totalPoints} points</span>
              </div>
              <Button onClick={() => setShowResults(true)}>
                Voir les résultats
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Résultats de votre diagnostic</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="text-6xl font-bold">{totalPoints}</div>
                <div className="text-xl">
                  Niveau de stress :{" "}
                  <span className={getStressLevel().color}>
                    {getStressLevel().level}
                  </span>
                </div>
                <Progress
                  value={Math.min(totalPoints / 4, 100)}
                  className={"w-full h-3"}
                />
                <div className="flex justify-between w-full text-xs text-muted-foreground">
                  <span>0</span>
                  <span>150</span>
                  <span>300</span>
                  <span>400+</span>
                </div>
              </div>
              <div className="rounded-lg bg-muted p-4 flex flex-col gap-2">
                <h3 className="font-medium">Événements sélectionnés</h3>
                {selectedEvents.length > 0 ? (
                  <ul className="space-y-1 text-sm">
                    {selectedEvents.map((eventId) => {
                      const event = diagnocticsEvents.find(
                        (e) => e.id === eventId
                      );
                      return (
                        <li key={eventId} className="flex justify-between">
                          <span>{event?.title}</span>
                          <span>{event?.points} points</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Aucun événement sélectionné
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={resetDiagnostic}
                className="w-full sm:w-auto"
              >
                Recommencer le diagnostic
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
