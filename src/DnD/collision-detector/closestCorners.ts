import { CollisionDetector, Draggable, Droppable } from "../types";

export const closestCorners: CollisionDetector = (
  draggableItem: Draggable,
  droppableAreas: Droppable[]
) => {
  console.log({ draggableItem });
  console.log({ droppableAreas });
  return [];
};
