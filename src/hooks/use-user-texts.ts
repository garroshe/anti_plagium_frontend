import { useQuery } from "@tanstack/react-query";
import { Timestamp, collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { firestore } from "../api/firebaseConfig.ts";
import { useUser } from "../context/user-context.tsx";
import type { PlagiarismResult } from "../types";

export type UserTextItem = {
  id: string;
  text: string;
  result: PlagiarismResult;
  uniqueness: number;
  checkedAt?: Timestamp | null;
  isFavorite?: boolean;
};

type UseUserTextsOptions = {
  onlyFavorites?: boolean;
};

export const useUserTexts = (options?: UseUserTextsOptions) => {
  const { onlyFavorites = false } = options || {};
  const { user } = useUser();
  const uid = user?.uid;

  return useQuery({
    queryKey: ["userTexts", uid, onlyFavorites ? "favorites" : "all"],
    enabled: !!uid,
    queryFn: async (): Promise<UserTextItem[]> => {
      if (!uid) return [];
      const colRef = collection(firestore, "userTexts", uid, "items");
      const q = onlyFavorites
        ? query(colRef, where("isFavorite", "==", true), orderBy("checkedAt", "desc"))
        : query(colRef, orderBy("checkedAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: (data.text as string) || "",
          result: data.result as PlagiarismResult,
          uniqueness: data.uniqueness as number,
          checkedAt: (data.checkedAt as Timestamp) ?? null,
          isFavorite: Boolean(data.isFavorite),
        };
      });
    },
  });
};

