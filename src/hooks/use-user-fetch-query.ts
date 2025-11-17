import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { userService } from "../bus/user/service/userService.ts";
import { userQueryKeys } from "../bus/user/store/queryKeys.ts";
import type { User } from "../types";

export const useUserFetchQuery = () => {
  const [user, setUser] = useState<User | null | undefined>(null);

  const uid = localStorage.getItem("userId");

  const {
    data: response,
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      return await userService.userFetch({ uid });
    },
    queryKey: [userQueryKeys.userFetch, uid],
    enabled: !!uid,
  });

  const { data, error } = response || {};

  useEffect(() => {
    setUser(data);
  }, [data]);

  try {
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
  }

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };

  return {
    isUserLoading: isFetching || isLoading,
    userFetch: user || null,
    logout,
    onFetch: refetch,
    refreshUser: async () => {
      await refetch();
    },
  };
};
