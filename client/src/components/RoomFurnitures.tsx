import { useState } from "react";
import { HFloorItem } from "gnode-api";
import { trpc } from "../utils/trpc";

export function RoomFurnitures() {
  const [floorItems, setFloorItems] = useState<number[]>();

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
