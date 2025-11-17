import { database, get, ref, update } from "../../../api/firebaseConfig.ts";

import type { UserPayloadType, UserResponseType, UserUpdatePayloadType, UserUpdateResponseType } from "./types.ts";

export const userService = Object.freeze({
    userFetch: async (payload: UserPayloadType): Promise<UserResponseType> => {
        try {
            const { uid } = payload;

            const res = await get(ref(database, `users/${uid}`));

            return { error: null, data: res.val() };
        } catch (error) {
            console.log(error);
            return { error, data: null };
        }
    },
    updateUser: async ({ uid, data }: UserUpdatePayloadType): Promise<UserUpdateResponseType> => {
        try {
            await update(ref(database, `users/${uid}`), data);
            return { error: null };
        } catch (error) {
            console.log(error);
            return { error };
        }
    },
});