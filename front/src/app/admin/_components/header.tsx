"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type PageHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {title}
        </CardTitle>
        <div>{children}</div>
      </CardHeader>
    </Card>
  );
};
export default PageHeader;
