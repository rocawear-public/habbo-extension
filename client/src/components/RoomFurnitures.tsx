import { useState } from "react";
import { HFloorItem } from "gnode-api";
import { trpc } from "../utils/trpc";
import { floorItems } from "../../../server/trpc/router/example";

export function RoomFurnitures() {
  const [floorItems, setFloorItems] = useState<floorItems>();

  trpc.example.floorItems.useSubscription(undefined, {
    onData(data) {
      console.log("received", data);
      setFloorItems(data);
    },
  });

  if (!floorItems) return <div>Loading...</div>;

  return (
    <div>
      {floorItems.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
