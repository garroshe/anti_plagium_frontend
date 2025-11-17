import { axiosInstance } from "../../../api/axiosConfig.ts";

type PayloadType = {
  text: string;
};

export const editorServices = Object.freeze({
  fetchTextMutation: async ({ text }: PayloadType) => {
    try {
      const res = await axiosInstance.post("/check", {
        text,
        options: {
          blockSize: 3,
          concurrency: 4,
        },
      });

      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});
