"use client";

import useRefreshHook from "@/hooks/userRefresh";
import { Loader } from "@/components/loader";

export const RefreshComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, isError } = useRefreshHook();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }
  return <>{children}</>;
};
