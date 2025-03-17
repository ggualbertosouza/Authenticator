"use client";

import * as React from "react";

import useAuthStore from "@/store/auth";
import { useRouter } from "next/navigation";

const AuthRedirect = () => {
  const router = useRouter();
  const { token } = useAuthStore();

  React.useEffect(() => {
    if (!token) router.push("/auth/login");
  }, [router, token]);

  return null;
};

export default AuthRedirect;
