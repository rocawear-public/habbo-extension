import { Extension, HDirection, HFloorItem } from "gnode-api";
import { ee } from "../server/events.js";
import { floorItemsSchema } from "../server/trpc/router/example.js";
const extensionInfo = {
    name: "My Extension",
    description: "My first G-Node extension",
    version: "0.1",
    author: "Your name",
};
export const ext = new Extension(extensionInfo);
ext.interceptByNameOrHash(HDirection.TOCLIENT, "Objects", (hMessage) => {
    const packet = hMessage.getPacket();
    const items = HFloorItem.parse(packet);
    const floorItems = items.map((item) => item.id);
    floorItemsSchema.parse(floorItems);
    ee.emit("floorItems", floorItems);
});
