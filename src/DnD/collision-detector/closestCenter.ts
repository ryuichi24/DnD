import { Collision, CollisionDetector, Draggable, Droppable } from "../types";
import { distanceBetween } from "../util/calculations/distancebetween";
import { rectCenter } from "../util/calculations/rectCenter";

export const closestCenter: CollisionDetector = (
  draggableItem: Draggable,
  droppableAreas: Droppable[]
) => {
  if (!draggableItem.elementRef.current) return [];

  const draggableRect =
    draggableItem.elementRef.current.getBoundingClientRect();
  const draggableAreaCenter = rectCenter(draggableRect);

  const collisions: Collision[] = droppableAreas
    .map((DA) => {
      const droppableAreaRect = DA.elementRef.current?.getBoundingClientRect();

      if (!droppableAreaRect) {
        throw new Error(`${DA.id} - droppableAreaRect is null.`);
      }

      const droppableAreaCenter = rectCenter(droppableAreaRect);

      const bw = distanceBetween(droppableAreaCenter, draggableAreaCenter);

      return {
        ...DA,
        criteria: bw,
      };
    })
    .sort((a, b) => {
      return a.criteria - b.criteria;
    });

  return collisions;
};
