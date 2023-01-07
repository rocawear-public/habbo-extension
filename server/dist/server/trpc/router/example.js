import { router, publicProcedure } from "../trpc.js";
import { observable } from "@trpc/server/observable";
import { ee } from "../../events.js";
import z from "zod";
export const floorItemsSchema = z.array(z.number());
export const exampleRouter = router({
    floorItems: publicProcedure.subscription(() => {
        return observable((emit) => {
            const onNewData = (data) => {
                emit.next(data);
            };
            ee.on("floorItems", onNewData);
            return () => {
                ee.off("floorItems", onNewData);
            };
        });
    }),
});
