"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Play, Pause, Settings, LoaderCircle, History } from "lucide-react";
import { fetchRespirations } from "@/tools/respiration";
import { toast } from "sonner";
import { addExerciseSession } from "@/tools/exercise-history";
import { ExerciseHistoryComponent } from "@/components/exercise/ExerciseHistory";

interface Respiration {
  id: number;
  inspiration: number;
  apnea: number;
  expiration: number;
}

export default function RespirationPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState("inspiration");
  const [progress, setProgress] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState("748");
  const [customSettings, setCustomSettings] = useState({
    inspiration: 7,
    apnee: 4,
    expiration: 8,
  });
  const [respirations, setRespirations] = useState<Respiration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRespirations();
        setRespirations(data);
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message);
        } else {
          toast.error("Une erreur est survenue");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const presets = respirations.reduce((acc, ex) => {
    acc[ex.id.toString()] = {
      inspiration: ex.inspiration,
      apnee: ex.apnea,
      expiration: ex.expiration,
    };
    return acc;
  }, {} as Record<string, { inspiration: number; apnee: number; expiration: number }>);

  const settings =
    selectedPreset === "custom"
      ? customSettings
      : presets[selectedPreset] ?? customSettings;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;

          if (
            currentPhase === "inspiration" &&
            newProgress >= settings.inspiration
          ) {
            setCurrentPhase("apnee");
            return 0;
          } else if (
            currentPhase === "apnee" &&
            newProgress >= settings.apnee
          ) {
            setCurrentPhase("expiration");
            return 0;
          } else if (
            currentPhase === "expiration" &&
            newProgress >= settings.expiration
          ) {
            setCurrentPhase("inspiration");
            return 0;
          }

          return newProgress;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentPhase, settings]);

  const togglePlay = async () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentPhase("inspiration");
      setProgress(0);
    } else {
      // Enregistrer la session quand l'exercice est terminé
      const duration =
        settings.inspiration + settings.apnee + settings.expiration;
      await addExerciseSession(
        selectedPreset === "custom"
          ? "Personnalisé"
          : `Préréglage ${selectedPreset}`,
        duration
      );
    }
  };

  const handleCustomSettingChange = (setting: string, value: number[]) => {
    setCustomSettings({
      ...customSettings,
      [setting]: value[0],
    });
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "inspiration":
        return "bg-blue-500";
      case "apnee":
        return "bg-purple-500";
      case "expiration":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case "inspiration":
        return "Inspirez";
      case "apnee":
        return "Retenez";
      case "expiration":
        return "Expirez";
      default:
        return "";
    }
  };

  const getProgressPercentage = () => {
    switch (currentPhase) {
      case "inspiration":
        return (progress / settings.inspiration) * 100;
      case "apnee":
        return (progress / settings.apnee) * 100;
      case "expiration":
        return (progress / settings.expiration) * 100;
      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-row gap-2 p-4">
        <LoaderCircle className="animate-spin" />
        Chargement des données
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Exercices de respiration
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Pratiquez la cohérence cardiaque pour réduire votre stress et
                améliorer votre bien-être.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-4xl py-12">
            <Tabs defaultValue="exercise" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="exercise">
                  <Play className="h-4 w-4 mr-2" />
                  Exercice
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </TabsTrigger>
                <TabsTrigger value="history">
                  <History className="h-4 w-4 mr-2" />
                  Historique
                </TabsTrigger>
              </TabsList>
              <TabsContent value="exercise" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cohérence cardiaque</CardTitle>
                    <CardDescription>
                      Suivez le rythme pour synchroniser votre respiration et
                      votre rythme cardiaque
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="relative w-64 h-64 mb-8">
                      <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                      <div
                        className={`absolute inset-0 rounded-full ${getPhaseColor()} transition-all duration-1000 ease-in-out opacity-20`}
                        style={{
                          transform:
                            currentPhase === "inspiration"
                              ? `scale(${
                                  0.5 + (progress / settings.inspiration) * 0.5
                                })`
                              : currentPhase === "expiration"
                              ? `scale(${
                                  1 - (progress / settings.expiration) * 0.5
                                })`
                              : "scale(1)",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {getPhaseText()}
                        </span>
                      </div>
                      <div
                        className={`absolute bottom-0 left-0 h-1 ${getPhaseColor()}`}
                        style={{ width: `${getProgressPercentage()}%` }}
                      ></div>
                    </div>
                    <div className="text-center mb-6">
                      <p className="text-lg font-medium">
                        {selectedPreset === "custom"
                          ? "Personnalisé"
                          : `Préréglage: ${selectedPreset}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Inspiration: {settings.inspiration}s |
                        {settings.apnee > 0
                          ? ` Apnée: ${settings.apnee}s | `
                          : " "}
                        Expiration: {settings.expiration}s
                      </p>
                    </div>
                    <Button
                      size="lg"
                      onClick={togglePlay}
                      className="w-full max-w-xs"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" /> Commencer
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres de l&apos;exercice</CardTitle>
                    <CardDescription>
                      Choisissez un préréglage ou personnalisez votre exercice
                      de respiration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Préréglages</Label>
                        <RadioGroup
                          defaultValue="748"
                          value={selectedPreset}
                          onValueChange={setSelectedPreset}
                        >
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="748" id="748" />
                              <Label htmlFor="748">
                                7-4-8 (Inspiration: 7s, Apnée: 4s, Expiration:
                                8s)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="55" id="55" />
                              <Label htmlFor="55">
                                5-5 (Inspiration: 5s, Expiration: 5s)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="46" id="46" />
                              <Label htmlFor="46">
                                4-6 (Inspiration: 4s, Expiration: 6s)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="custom" id="custom" />
                              <Label htmlFor="custom">Personnalisé</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {selectedPreset === "custom" && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="inspiration">
                              Durée d&apos;inspiration (secondes):{" "}
                              {customSettings.inspiration}
                            </Label>
                            <Slider
                              id="inspiration"
                              min={1}
                              max={10}
                              step={1}
                              value={[customSettings.inspiration]}
                              onValueChange={(value) =>
                                handleCustomSettingChange("inspiration", value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apnee">
                              Durée d&apos;apnée (secondes):{" "}
                              {customSettings.apnee}
                            </Label>
                            <Slider
                              id="apnee"
                              min={0}
                              max={10}
                              step={1}
                              value={[customSettings.apnee]}
                              onValueChange={(value) =>
                                handleCustomSettingChange("apnee", value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expiration">
                              Durée d&apos;expiration (secondes):{" "}
                              {customSettings.expiration}
                            </Label>
                            <Slider
                              id="expiration"
                              min={1}
                              max={10}
                              step={1}
                              value={[customSettings.expiration]}
                              onValueChange={(value) =>
                                handleCustomSettingChange("expiration", value)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      // onClick={() => {
                      //   document
                      //     .querySelector('[data-value="exercise"]')
                      //     .click();
                      // }}
                    >
                      Appliquer et commencer l&apos;exercice
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                <ExerciseHistoryComponent />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
