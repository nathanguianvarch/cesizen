/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    disabled: true,
  },
  {
    title: "Suivi des émotions",
    description:
      "Analysez vos émotions et identifiez vos schémas émotionnels. Suivez vos émotions au fil du temps et obtenez des informations précieuses sur votre bien-être émotionnel grâce à notre journal des émotions.",
    url: "/informations",
    icon: "chart-bar",
    disabled: true,
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

          <div className="flex flex-wrap gap-4 items-stretch">
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
                    ) : item.disabled ? (
                      <Button variant="outline" className="w-full" disabled>
                        Désactivé
                      </Button>
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
        </section>
      </main>
    </div>
  );
}
