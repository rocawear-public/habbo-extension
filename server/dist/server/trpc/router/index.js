import { router } from "../trpc";
import { exampleRouter } from "./example";
export const appRouter = router({
    example: exampleRouter,
});
