"use client";

import { IconChartBar, IconDashboard, IconLink } from "@tabler/icons-react";
import Link from "next/link";
import { ManageTagDialog } from "~/components/manage-tag-dialog";
import { QuickCreateDialog } from "~/components/quick-create-dialog";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "~/shadcn/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard
  },
  {
    title: "Links",
    url: "/links",
    icon: IconLink
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: IconChartBar
  }
] as const;

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="flex flex-row gap-2">
          <SidebarMenuItem className="flex flex-1 items-center gap-2">
            <QuickCreateDialog />
          </SidebarMenuItem>
          <SidebarMenuItem className="flex items-center gap-2">
            <ManageTagDialog />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
