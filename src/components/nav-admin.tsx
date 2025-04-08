import { UserCog } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";

const data = {
  navAdmin: [{ title: "Gérer les utilisateurs", url: "/admin/users" }],
};

export default function NavAdmin() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          {data.navAdmin.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton asChild>
                <a href={subItem.url}>
                  <div className="flex flex-row gap-2 items-center">
                    <UserCog />
                    <span>{subItem.title}</span>
                  </div>
                </a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
