import { AppSidebar } from "@/components/app-sidebar";
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
    <div>
      <div className="flex justify-between flex-row m-5 gap-5 justify-center items-center">
        <div className="flex-1 flex justify-start">
          <img src="/logo.svg" alt="Logo" className="w-40 h-auto" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-[#3EAD62] flex-1 flex sm:flex-col md:flex-row gap-3 p-3 rounded-xl h-fit shadow items-center">
            {data.navMain.map((item) => (
              <Link href="/" className="text-md font-semibold" key={item.title}>
                <div className="flex flex-row gap-2 bg-white/15 rounded-xl px-2 py-2 h-fit hover:bg-white/50 items-center transition">
                  <DynamicIcon name={item.icon} />
                  <p className="sm:hidden xl:block">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="bg-[#3EAD62] flex sm:flex-col md:flex-row gap-3 p-3 rounded-xl shadow items-center">
            <Link href="/" className="text-md font-semibold">
              <div className="flex flex-row gap-2 bg-[#ffdd58] rounded-xl px-2 py-2 hover:bg-[#3EAD62]/50 items-center">
                <DynamicIcon name="log-in" />
                <p className="sm:hidden xl:block">Se connecter</p>
              </div>
            </Link>
            <Link href="/" className="text-md font-semibold">
              <div className="flex flex-row gap-2 bg-[#ffdd58] rounded-xl px-2 py-2 hover:bg-[#3EAD62]/50 items-center">
                <DynamicIcon name="user" />
                <p className="sm:hidden xl:block">Nathan Guianvarch</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="text-center text-4xl font-bold">
          Bonjour, Nathan Guianvarc&apos;h
        </p>
      </div>
    </div>
  );
}
