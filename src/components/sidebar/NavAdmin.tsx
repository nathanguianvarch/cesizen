import Link from "next/link";
import { SidebarGroup, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

const data: { title: string; url: string; icon: IconName }[] = [
  { title: "Gérer les utilisateurs", url: "/admin/users", icon: "user-cog" },
  {
    title: "Gérer les informations",
    url: "/admin/informations",
    icon: "file-cog",
  },
  {
    title: "Gérer les diagnoctics",
    url: "/admin/diagnostics",
    icon: "brain-cog",
  },
];
export default function NavAdmin() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {data.map((subItem) => (
          <SidebarMenuItem key={subItem.title}>
            <Link href={subItem.url}>
              <div className="hover:bg-black/5 px-3 py-1.5 rounded-lg">
                <div className="flex flex-row gap-2 items-center">
                  <DynamicIcon name={subItem.icon} />
                  <span className="text-md">{subItem.title}</span>
                </div>
              </div>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
