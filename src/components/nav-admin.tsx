import { SquareTerminal } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";

const data = {
  navAdmin: {
    title: "Application",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [{ title: "Gérer les utilisateurs", url: "#" }],
  },
};

export default function NavAdmin() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={data.navAdmin.title}>
            <data.navAdmin.icon />
            <span>{data.navAdmin.title}</span>
          </SidebarMenuButton>
          <SidebarMenuSub>
            {data.navAdmin.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <a href={subItem.url}>
                    <span>{subItem.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
