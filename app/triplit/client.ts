import { TriplitClient } from "@triplit/client";
import { schema } from "./schema";

export type Models = typeof triplit extends TriplitClient<infer M> ? M : never;

const isBrowser = typeof window !== "undefined";
export const triplit = new TriplitClient({
  schema,
  serverUrl: new URL(
    "/triplit",
    typeof window === "undefined"
      ? "http://example.com"
      : window.location.origin
  ).toString(),
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6ImFub24iLCJpYXQiOjE3MjUwMzMxMjV9.XHtxKvpvVPp7wKojqnKkFtC1WMivClbbOgGNOJAqaH8",
  autoConnect: isBrowser,
  storage: isBrowser ? "indexeddb" : "memory",
});
