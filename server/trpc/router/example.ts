import { router, publicProcedure } from "../trpc";
import { observable } from "@trpc/server/observable";
import { floorItems } from "../../extension/index";
import { HFloorItem } from "gnode-api";

export const exampleRouter = router({
  floorItems: publicProcedure.subscription(() => {
    return observable<HFloorItem[]>((emit) => {
      emit.next(floorItems);
    });
  }),
});
