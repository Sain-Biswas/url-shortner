import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient
} from "@tanstack/react-query";
import superJson from "superjson";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000
      },
      dehydrate: {
        serializeData: superJson.serialize,
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending"
      },
      hydrate: {
        deserializeData: superJson.deserialize
      }
    }
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) return makeQueryClient();
  else {
    browserQueryClient ??= makeQueryClient();
    return browserQueryClient;
  }
}
