import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryCache = new QueryCache();
export const queryConfig = new QueryClient({
    queryCache,
    defaultOptions: {
        queries: {
            staleTime: 1000 * 2,
            refetchOnWindowFocus: false,
        },
    },
});