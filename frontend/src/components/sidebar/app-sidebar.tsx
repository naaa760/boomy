"use server";

import { UserButton } from "@daveyplate/better-auth-ui";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Credits } from "./credits";
import SidebarMenuItems from "./sidebar-menu-items";
import { User } from "lucide-react";
import Upgrade from "./upgrade";

export async function AppSidebar() {
  return (
    <Sidebar className="border-border/50 border-r">
      <SidebarContent className="px-6 py-8">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-12 flex flex-col items-start justify-start">
            <div className="font-display text-foreground text-2xl font-bold tracking-tight">
              MUSIC
            </div>
            <div className="font-display text-muted-foreground text-lg font-medium tracking-wide">
              GENERATOR
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-border/50 border-t px-6 py-6">
        <div className="mb-4 flex w-full items-center justify-between">
          <Credits />
          <Upgrade />
        </div>
        <UserButton
          variant="outline"
          className="w-full"
          additionalLinks={[
            {
              label: "Customer Portal",
              href: "/customer-portal",
              icon: <User className="h-4 w-4" />,
            },
          ]}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
