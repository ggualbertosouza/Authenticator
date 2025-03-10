"use client";

import useAuthStore from "@/store/auth";
import { useRouter } from "next/navigation";
import * as React from "react";

const AuthRedirect = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  React.useEffect(() => {
    if (isAuthenticated) router.push("/");
    if (!isAuthenticated) router.push("/auth/login");
  }, [router, isAuthenticated]);

  return null;
};

export default AuthRedirect;
