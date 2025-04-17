import Header from "@/components/shared/header";
import * as React from "react";

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <Header />
      {children}
    </body>
  );
};

export default LayoutMain;
