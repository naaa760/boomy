"use client";

import { Home, Music } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export default function SidebarMenuItems() {
  const path = usePathname();

  let items = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      active: false,
    },
    {
      title: "Create",
      url: "/create",
      icon: Music,
      active: false,
    },
  ];

  items = items.map((item) => ({
    ...item,
    active: path === item.url,
  }));

  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.active}
            className="hover:bg-accent/50 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground h-12 rounded-lg px-4 font-medium transition-all duration-200"
          >
            <a href={item.url} className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span className="font-caption">{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
