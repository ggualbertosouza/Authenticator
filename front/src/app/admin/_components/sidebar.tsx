import { Home, FilePlus, Files, LifeBuoy } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import AdminHeader from "./sidebarHeader";

const items = [
  {
    title: "Todos Posts",
    url: "/admin/posts",
    icon: Files,
  },
  {
    title: "Novo Post",
    url: "/admin/posts/new",
    icon: FilePlus,
  },
];

const AdminSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <AdminHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin">
                <Home />
                Página inicial
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarGroupLabel>Posts</SidebarGroupLabel>
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
        <div className="flex flex-col gap-1 p-4 border-t text-xs text-muted-foreground">
          <a
            href="/admin/help"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <LifeBuoy className="w-4 h-4" />
            Ajuda / Suporte
          </a>
          <span className="text-[10px] mt-2">Versão 1.0.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
