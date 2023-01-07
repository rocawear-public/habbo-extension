import { useState } from "react";
import { HFloorItem } from "gnode-api";
import { trpc } from "../utils/trpc";

export function RoomFurnitures() {
  const [floorItems, setFloorItems] = useState<HFloorItem[]>();

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
        <div key={item.id}>{item.id}</div>
      ))}
    </div>
  );
}
