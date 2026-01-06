"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  IconDashboard,
  IconFileDescription,
  IconUsers,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    { title: "Dashboard", url: "/admin/dashboard", icon: IconDashboard },
    {
      title: "Content",
      url: "/admin/content",
      icon: IconFileDescription,
      items: [
        { title: "All Articles", url: "/admin/articles" },
        { title: "Create New", url: "/admin/create" },
        { title: "Categories", url: "/admin/categories" },
      ],
    },
    { title: "Users & Authors", url: "/admin/users", icon: IconUsers },
  ],
  navSecondary: [
    { title: "View Site", url: "/", icon: IconSearch },
    { title: "Settings", url: "/admin/settings", icon: IconSettings },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const processedNav = data.navMain.map((item) => ({
    ...item,
    isActive: pathname.startsWith(item.url),
    items: item.items?.map((sub) => ({
      ...sub,
      isActive: pathname === sub.url,
    })),
  }));

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <IconFileDescription className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ThePost.</span>
                  <span className="truncate text-xs text-muted-foreground">Admin CMS</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={processedNav} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}