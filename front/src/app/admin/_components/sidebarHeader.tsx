"use client";

import Link from "next/link";
import { User, LogOut, UserRound } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/auth";

const AdminHeader = () => {
  const { user, logout } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-left w-full focus:outline-none cursor-pointer p-4 border-b">
        <Avatar className="w-8 h-8 flex items-center justify-center bg-slate-100">
          {user?.image ? (
            <AvatarImage src={user?.image} />
          ) : (
            <UserRound className="h-[50%] w-[50%]" />
          )}
        </Avatar>
        <div className="flex flex-col text-sm">
          <span className="font-medium leading-none">{user?.name}</span>
          <span className="text-xs text-muted-foreground">{user?.role}</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" className="z-50 w-48 mt-2">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/admin/profile"
            className="flex items-center cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminHeader;
