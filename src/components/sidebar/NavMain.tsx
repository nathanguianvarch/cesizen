"use client";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
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
      <SidebarMenu className="flex gap-2">
        {items?.map((subItem) => (
          <SidebarMenuItem key={subItem.title}>
            <Link href={subItem.url}>
              <div className="hover:bg-black/5 px-3 py-1.5 rounded-lg">
                <div className="flex flex-row items-center gap-3">
                  {subItem.icon ? (
                    <DynamicIcon name={subItem.icon} size={22} />
                  ) : (
                    ""
                  )}

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
