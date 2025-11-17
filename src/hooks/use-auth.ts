import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  type UserCredential,
} from "firebase/auth";

import { auth, database, FirebaseError, get, ref, set } from "../api/firebaseConfig.ts";
import { useModal } from "../context/modal-context.tsx";
import { getFirebaseErrorMessage } from "../utils/get-firebase-error-message.ts";
import { useUserFetchQuery } from "./use-user-fetch-query.ts";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { closeModal } = useModal();
  const { onFetch } = useUserFetchQuery();

  const afterLogin = async (
    userCred: UserCredential,
    name?: string,
    lastName?: string,
    loginName?: string,
    role: "user" | "premium" | "admin" = "user",
  ) => {
    const uid = userCred.user.uid;
    localStorage.setItem("userId", uid);

    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      await set(userRef, {
        uid,
        email: userCred.user.email,
        userName: name || userCred.user.displayName || userCred.user.email?.split("@")[0] || "Користувач",
        lastName: lastName || "Аноннім",
        loginName: loginName || userCred.user.email?.split("@")[0] || "Аноннім",
        avatar: userCred.user.photoURL,
        role: role,
        checkedTexts: [],
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    window.dispatchEvent(new Event("storage"));
    await onFetch();
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      await afterLogin(userCred);
      closeModal();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(error.code);
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    lastName: string,
    loginName: string,
    role: "user" | "premium" | "admin" = "user",
  ) => {
    try {
      setLoading(true);
      setError("");
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await afterLogin(userCred, name, lastName, loginName, role);
      closeModal();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(error.code);
        setError(message);
      } else {
        setError("Помилка реєстрації. Спробуйте ще раз.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError("");
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      await afterLogin(userCred);
      closeModal();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
          setError("");
        } else {
          const message = getFirebaseErrorMessage(error.code);
          setError(message);
        }
      } else {
        const errorMessage = error instanceof Error ? error.message : "Помилка авторизації";
        if (!errorMessage.includes("Cross-Origin-Opener-Policy")) {
          setError(errorMessage);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithEmail,
    signInWithGoogle,
    signUp,
    loading,
    error,
  };
};
