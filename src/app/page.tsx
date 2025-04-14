/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartPulse, BookOpen, Activity, BarChart4 } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

const data: {
  title: string;
  description: string;
  url: string;
  icon: IconName;
  exercice?: boolean;
  disabled?: boolean;
}[] = [
  {
    title: "Prenez soin de votre santé mentale",
    description:
      "Pratiquez des techniques de respiration guidée pour réduire le stress et l’anxiété. Nos exercices de respiration vous aident à atteindre la cohérence cardiaque et à apaiser votre esprit grâce à des schémas respiratoires contrôlés.",
    url: "/exercices",
    icon: "heart-pulse",
    exercice: true,
  },
  {
    title: "Information",
    description:
      "Apprenez-en plus sur la santé mentale et la gestion du stress. Accédez à des ressources et des articles sur la santé mentale, la prévention du stress et des stratégies de bien-être.",
    url: "/informations",
    icon: "heart-pulse",
  },
  {
    title: "Diagnostic du stress",
    description:
      "Évaluez votre niveau de stress grâce à nos outils d’évaluation. Répondez à notre questionnaire basé sur l’échelle de Holmes et Rahe pour mieux comprendre vos niveaux de stress actuels.",
    url: "/informations",
    icon: "activity",
  },
  {
    title: "Information",
    description:
      "Apprenez-en plus sur la santé mentale et la gestion du stress. Accédez à des ressources et des articles sur la santé mentale, la prévention du stress et des stratégies de bien-être.",
    url: "/informations",
    icon: "heart-pulse",
  },
];

export default function Home() {
  return (
    <div>
      <HeroSection />
      <main className="flex-1">
        <section className="container px-4 py-12 md:py-24 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Prenez soin de votre santé mentale
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              CESIZen vous propose des outils et des ressources pour vous aider
              à gérer le stress, suivre vos émotions et améliorer votre
              bien-être mental global.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {data.map((item) => (
              <Card className="flex flex-col h-full max-w-80" key={item.title}>
                <CardHeader>
                  <DynamicIcon
                    name={item.icon}
                    className="h-8 w-8 mb-2 text-primary"
                  />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={item.url} className="w-full">
                    {item.exercice ? (
                      <Button className="w-full">Commencer l'exercice</Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        Voir plus
                      </Button>
                    )}
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <HeartPulse className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Exercices de respiration</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Pratiquez des techniques de respiration guidée pour réduire le
                  stress et l’anxiété. Nos exercices de respiration vous aident
                  à atteindre la cohérence cardiaque et à apaiser votre esprit
                  grâce à des schémas respiratoires contrôlés.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/breathing" className="w-full">
                  <Button className="w-full">Commencer l'exercice</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <BookOpen className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Information</CardTitle>
                <CardDescription>
                  Learn about mental health and stress management
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Access resources and articles about mental health, stress
                  prevention, and wellbeing strategies.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/informations" className="w-full">
                  <Button variant="outline" className="w-full">
                    Voir plus
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <Activity className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Stress Diagnostics</CardTitle>
                <CardDescription>
                  Evaluate your stress levels with our assessment tools
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Take our stress questionnaire based on the Holmes and Rahe
                  scale to understand your current stress levels.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Désactivé
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <BarChart4 className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Emotion Tracker</CardTitle>
                <CardDescription>
                  Monitor and analyze your emotional patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Track your emotions over time and gain insights into your
                  emotional wellbeing with our emotion journal.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Désactivé
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
