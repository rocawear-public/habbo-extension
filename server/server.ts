import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import ws from "ws";
import { appRouter, type AppRouter } from "./trpc/router/_app";
import { createContext } from "./trpc/context";
import { ext } from "./extension";

const { server, listen } = createHTTPServer({
  router: appRouter,
  createContext,
});

const wss = new ws.Server({ server });
applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext,
});

ext.run();
listen(2022);
console.log("Running server");
