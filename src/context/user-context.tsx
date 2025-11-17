import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import { useUserFetchQuery } from "../hooks/use-user-fetch-query";

export type UserContextProps = {
  children: ReactNode;
};

export type User = {
  uid: string;
  email: string;
  loginName?: string;
  lastName?: string;
  userName?: string;
  avatar?: string;
};

export type UserContext = {
  logout: () => void;
  user: User | null;
  isUserLoading: boolean;
  refreshUser: () => Promise<void>;
};

const UserProvider = createContext<UserContext | null>(null);

export const UserContextProvider = ({ children }: UserContextProps) => {
  const { userFetch, isUserLoading, logout, refreshUser } = useUserFetchQuery();

  return (
    <UserProvider.Provider value={{ user: userFetch, logout, isUserLoading, refreshUser }}>
      {children}
    </UserProvider.Provider>
  );
};

export const useUser = (): UserContext => {
  const context = useContext(UserProvider);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
