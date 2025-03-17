"use client";

import * as React from "react";
import useAuthStore from "@/store/auth";

const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div>
      {user && (
        <div>
          <p>{user.email}</p>
          <p>{user.name}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
