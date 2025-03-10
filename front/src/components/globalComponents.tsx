import AuthRedirect from "@/components/redirect/authRedirect";
import GlobalLoading from "@/components/shared/loading";
import { Toaster } from "@/components/ui/sonner";

const GlobalComponents = () => {
  return (
    <>
      <Toaster />
      <AuthRedirect />
      <GlobalLoading />
    </>
  );
};

export default GlobalComponents;
