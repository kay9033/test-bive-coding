import { Handlers } from "$fresh/server.ts";
import { getKv } from "../../lib/db.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const kv = await getKv();
    const logs = [];
    for await (const entry of kv.list({ prefix: ["logs"] })) {
      logs.push(entry.value);
    }
    return new Response(JSON.stringify(logs), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async POST(req, _ctx) {
    const kv = await getKv();
    const id = crypto.randomUUID();
    const log = {
      id,
      time: new Date().toISOString(),
      url: new URL(req.url).pathname,
      userAgent: req.headers.get("user-agent") ?? "unknown",
    };
    await kv.set(["logs", id], log);
    return new Response(JSON.stringify(log), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  },
};
