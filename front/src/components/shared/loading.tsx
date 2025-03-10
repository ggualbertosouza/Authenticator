"use client";

import useLoadingStore from "@/store/loading";

const GlobalLoading = () => {
  const { loading } = useLoadingStore();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
    </div>
  );
};

export default GlobalLoading;
