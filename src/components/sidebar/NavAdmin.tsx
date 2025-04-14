import { UserCog } from "lucide-react";
import Link from "next/link";
import { SidebarGroup, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";

const data = {
  navAdmin: [{ title: "Gérer les utilisateurs", url: "/admin/users" }],
};

export default function NavAdmin() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {data.navAdmin.map((subItem) => (
          <SidebarMenuItem key={subItem.title}>
            <Link href={subItem.url}>
              <div className="hover:bg-black/5 px-3 py-1.5 rounded-lg">
                <div className="flex flex-row gap-2 items-center">
                  <UserCog />
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
