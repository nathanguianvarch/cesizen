import { DynamicIcon, IconName } from "lucide-react/dynamic";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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

export default function Navbar() {
  return (
    <div className="flex justify-between flex-col p-5 gap-5 justify-center items-center sm:flex-row">
      <div className="flex flex justify-start">
        <img src="/logo.svg" alt="Logo" className="w-40 h-auto" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="bg-slate-100 flex flex md:flex-row gap-3 p-3 rounded-xl h-fit shadow items-center">
          {data.navMain.map((item) => (
            <Link
              href={item.url}
              className="text-md font-semibold"
              key={item.title}
            >
              <div className="flex flex-row gap-2 bg-slate-700 rounded-xl px-2.5 py-2 h-fit hover:bg-slate-600 items-center transition">
                <DynamicIcon name={item.icon} color="white" />
                <p className="hidden lg:block text-white">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-slate-100 flex sm:flex-col md:flex-row gap-3 p-3 rounded-xl shadow items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row gap-2 bg-slate-700 rounded-xl px-2.5 py-2 hover:bg-slate-500 items-center">
                <DynamicIcon name="user" color="white" />
                <p className="sm:hidden xl:block text-white truncate">
                  Nathan Guianvarch
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>nathanguianvarch@gmail.com</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
