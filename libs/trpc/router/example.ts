import { router, publicProcedure } from "../trpc.js";
import { observable } from "@trpc/server/observable";
import { HFloorItem } from "gnode-api";
import { ee } from "@/apps/server/events.js";

import { floorItems } from "@/libs/shared-types/index.js";

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
