import { handler } from "./handler.ts";

export function main() {
  Deno.serve({ port: 8000, handler });
}
