import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Activity,
  BookText,
  ChartSpline,
  Home,
  List,
  Smile,
} from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import Link from "next/link";

const data: { navMain: { title: string; url: string; icon: IconName }[] } = {
  navMain: [
    {
      title: "Accueil",
      url: "/",
      icon: "home",
    },
    {
      title: "Informations",
      url: "/informations",
      icon: "book-text",
    },
    {
      title: "Diagnostics",
      url: "/diagnostics",
      icon: "chart-spline",
    },
    {
      title: "Exercices",
      url: "/exercices",
      icon: "activity",
    },
    {
      title: "Activités",
      url: "/activities",
      icon: "list",
    },
    {
      title: "Émotions",
      url: "/emotions",
      icon: "smile",
    },
  ],
};

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-slate-100 to-slate-50">
      <div className="flex justify-between flex-row p-5 gap-5 justify-center items-center">
        <div className="flex-1 flex justify-start">
          <img src="/logo.svg" alt="Logo" className="w-40 h-auto" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-slate-100 flex flex sm:flex-col md:flex-row gap-3 p-3 rounded-xl h-fit shadow items-center">
            {data.navMain.map((item) => (
              <Link href="/" className="text-md font-semibold" key={item.title}>
                <div className="flex flex-row gap-2 bg-slate-700 rounded-xl px-2.5 py-2 h-fit hover:bg-slate-600 items-center transition">
                  <DynamicIcon name={item.icon} color="white" />
                  <p className="sm:hidden xl:block text-white">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="bg-slate-100 flex sm:flex-col md:flex-row gap-3 p-3 rounded-xl shadow items-center">
            <Link href="/" className="text-md font-semibold">
              <div className="flex flex-row gap-2 bg-slate-600 rounded-xl px-2.5 py-2 hover:bg-slate-500 items-center">
                <DynamicIcon name="user" />
                <p className="sm:hidden xl:block">Nathan Guianvarch</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
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
      </div>
    </div>
  );
}
