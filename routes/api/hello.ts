import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req, _ctx) {
    return new Response("world", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  },
};
