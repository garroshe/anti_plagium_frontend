import {useMutation} from "@tanstack/react-query";
import {editorKeys} from "../../../bus/editor/store/editorKeys.ts";
import {editorServices} from "../../../bus/editor/service/editorServices.ts";

type MutationPayloadType = { text: string };

export const useFetchQueryMutation = () => {
    return useMutation({
        mutationFn: async ({ text }: MutationPayloadType) => {
            return await editorServices.fetchTextMutation({ text });
        },
        mutationKey: [editorKeys.fetchTextMutation],
    });
};
