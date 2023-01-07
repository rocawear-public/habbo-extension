import { router } from "../trpc.js";
import { exampleRouter } from "./example.js";
export const appRouter = router({
    example: exampleRouter,
});
