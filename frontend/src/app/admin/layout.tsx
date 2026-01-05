// app/admin/layout.tsx
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { RoleGuard } from "@/components/guards/RoleGuard"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <SidebarProvider
        style={{
          "--sidebar-width": "18rem", // Simplified spacing for stability
          "--header-height": "3.5rem",
        } as React.CSSProperties}
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          {/* Content area */}
          <main className="flex flex-1 flex-col">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </RoleGuard>
  )
}