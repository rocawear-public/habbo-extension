import { Extension, HDirection, HFloorItem } from "gnode-api";

const extensionInfo = {
  name: "My Extension",
  description: "My first G-Node extension",
  version: "0.1",
  author: "Your name",
};

export const ext = new Extension(extensionInfo);
export let floorItems: HFloorItem[] = [];

ext.interceptByNameOrHash(HDirection.TOCLIENT, "Objects", (hMessage) => {
  const packet = hMessage.getPacket();
  floorItems = HFloorItem.parse(packet);
});
