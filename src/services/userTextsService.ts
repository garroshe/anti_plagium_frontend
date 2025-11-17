import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";

import { firestore } from "../api/firebaseConfig.ts";
import type { PlagiarismResult } from "../types";

type CreateUserTextPayload = {
  uid: string;
  text: string;
  result: PlagiarismResult;
  uniqueness: number;
  isFavorite?: boolean;
};

export const userTextsService = {
  async create({ uid, text, result, uniqueness, isFavorite = false }: CreateUserTextPayload) {
    const userTextsCollection = collection(firestore, "userTexts", uid, "items");
    return await addDoc(userTextsCollection, {
      text,
      result,
      checkedAt: serverTimestamp(),
      uniqueness,
      isFavorite,
    });
  },

  async setFavorite(uid: string, textId: string, isFavorite: boolean) {
    const docRef = doc(firestore, "userTexts", uid, "items", textId);
    await updateDoc(docRef, {
      isFavorite,
    });
  },
};

