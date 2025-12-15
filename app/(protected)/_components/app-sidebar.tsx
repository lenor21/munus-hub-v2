"use client";

import {
  Calendar,
  Home,
  Inbox,
  Settings,
  Users,
  Megaphone,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { NavUser } from "@/app/(protected)/_components/nav-user";
import { useCurrentUser } from "@/hooks/use-current-user";

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Projects",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Announcement",
    url: "#",
    icon: Megaphone,
  },
  {
    title: "Team",
    url: "#",
    icon: Users,
  },
  {
    title: "Admin",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const currentUser = useCurrentUser();

  const user = {
    name: currentUser?.name as string,
    email: currentUser?.email as string,
    avatar: currentUser?.image as string,
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="mt-2">
          <h1 className="flex justify-start items-center gap-x-2">
            <Image
              className="w-auto h-auto"
              src="/munus-logo.jpg"
              alt="Munus Logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold text-gray-900 font-serif">
              Munus Hub
            </span>
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <NavUser user={user} />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
