import * as React from "react";

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="w-full h-full">
      <main>
        <h1>LOGADO</h1>
        {children}
      </main>
    </body>
  );
};

export default LayoutMain;
