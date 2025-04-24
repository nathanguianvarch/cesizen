import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#3EAD63]">
              CESI
            </h1>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#FFDD58]">
              ZEN
            </h1>
          </div>
          <h2 className="text-xl font-medium sm:text-2xl md:text-3xl text-muted-foreground">
            Votre compagnon pour la santé mentale
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
            Gérez votre stress, pratiquez la pleine conscience et améliorez
            votre bien-être mental grâce à notre suite d’outils et de
            ressources.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/register">
            <Button size="lg">Commencer</Button>
          </Link>
          <Link href="/information">
            <Button variant="outline" size="lg">
              Voir plus
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
