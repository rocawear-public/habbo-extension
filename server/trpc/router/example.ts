import { router, publicProcedure } from "../trpc";
import { observable } from "@trpc/server/observable";
import { HFloorItem } from "gnode-api";
import { ee } from "../../events";
export const exampleRouter = router({
  floorItems: publicProcedure.subscription(() => {
    return observable<number[]>((emit) => {
      const onNewData = (data: number[]) => {
        emit.next(data);
      };
      ee.on("floorItems", onNewData);

      return () => {
        ee.off("floorItems", onNewData);
      };
    });
  }),
});
