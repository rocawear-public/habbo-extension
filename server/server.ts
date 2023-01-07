import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import { appRouter, type AppRouter } from "./trpc/router/_app.js";
import { createContext } from "./trpc/context.js";
import { ext } from "../extension/index.js";

const { server, listen } = createHTTPServer({
  router: appRouter,
  createContext,
});

const wss = new WebSocketServer({ server });

applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext,
});

ext.run();
listen(2022);

console.log("Running server");
