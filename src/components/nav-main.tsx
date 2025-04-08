"use client";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

export function NavMain({
  items,
}: {
  items?: {
    title: string;
    url: string;
    icon?: IconName;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          {items?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton asChild>
                <Link href={subItem.url}>
                  {subItem.icon ? <DynamicIcon name={subItem.icon} /> : ""}

                  <span>{subItem.title}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
