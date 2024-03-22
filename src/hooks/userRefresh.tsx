"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store";
import { self } from "@/api/auth";

const useRefreshHook = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["self"],
    queryFn: self,
    retry: false,
  });

  if (data?.data?.user) setAuth(data.data.user);
  return { isError, isLoading };
};

export default useRefreshHook;
