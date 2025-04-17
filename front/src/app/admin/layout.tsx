"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Routes } from "../routes";
import PageHeader from "./_components/header";
import AdminSidebar from "./_components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const pageName = Routes[pathname]?.pageName;

  return (
    <body className="w-full min-h-screen">
      <SidebarProvider className="flex h-screen">
        <AdminSidebar />
        <SidebarTrigger />
        <main className="flex-1 p-4 overflow-y-auto scroll-smooth scrollbar-hide">
          {pageName && <PageHeader title={pageName} />}
          {children}
        </main>
      </SidebarProvider>
    </body>
  );
};

export default AdminLayout;
