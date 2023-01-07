import { router, publicProcedure } from "../trpc.js";
import { observable } from "@trpc/server/observable";
import { HFloorItem } from "gnode-api";
import { ee } from "../../events.js";
import z from "zod";

export const floorItemsSchema = z.array(z.number());
export type floorItems = z.infer<typeof floorItemsSchema>;

export const exampleRouter = router({
  floorItems: publicProcedure.subscription(() => {
    return observable<floorItems>((emit) => {
      const onNewData = (data: floorItems) => {
        emit.next(data);
      };
      ee.on("floorItems", onNewData);

      return () => {
        ee.off("floorItems", onNewData);
      };
    });
  }),
});
