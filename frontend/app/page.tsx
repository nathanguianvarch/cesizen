import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Activity, BookOpen, Brain, Heart, Smile, Users } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-slate-100">
      <Navbar />
      <div className="w-full">
        <section className="w-full py-12 md:py-24 lg:py-32  dark:from-blue-950 dark:to-background flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    CESIZen - L&apos;application de votre santé mentale
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Gérez votre stress, améliorez votre bien-être et prenez soin
                    de votre santé mentale avec CESIZen.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground"
                    >
                      Commencer maintenant
                    </Button>
                  </Link>
                  <Link href="/informations">
                    <Button size="lg" variant="outline">
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-full bg-gradient-to-b from-primary/20 to-primary/5 p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-slate-50 p-8 shadow-lg dark:bg-slate-900">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-primary">
                          😌
                        </div>
                        <h3 className="mt-4 text-xl font-bold">
                          Retrouvez votre sérénité
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32  dark:from-blue-950 dark:to-background flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-slate-700 px-3 py-1 text-sm text-primary-foreground">
                  Fonctionnalités
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Tout ce dont vous avez besoin pour votre bien-être mental
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  CESIZen vous propose des outils complets pour comprendre et
                  améliorer votre santé mentale au quotidien.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-xl p-6 shadow">
                <div className="rounded-full bg-slate-700 p-4">
                  <BookOpen className="h-6 w-6 text-primary" color="white" />
                </div>
                <h3 className="text-xl font-bold">Informations</h3>
                <p className="text-center text-muted-foreground">
                  Accédez à des ressources fiables sur la santé mentale et sa
                  prévention.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Diagnostics</h3>
                <p className="text-center text-muted-foreground">
                  Évaluez votre niveau de stress avec des outils
                  d'auto-diagnostic.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Exercices de respiration</h3>
                <p className="text-center text-muted-foreground">
                  Pratiquez la cohérence cardiaque avec des exercices
                  personnalisables.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Activités de détente</h3>
                <p className="text-center text-muted-foreground">
                  Découvrez des activités pour vous détendre et réduire votre
                  stress.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Smile className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Tracker d'émotions</h3>
                <p className="text-center text-muted-foreground">
                  Suivez vos émotions au quotidien et visualisez leur évolution.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Comptes personnalisés</h3>
                <p className="text-center text-muted-foreground">
                  Créez votre compte pour sauvegarder vos préférences et suivre
                  vos progrès.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
