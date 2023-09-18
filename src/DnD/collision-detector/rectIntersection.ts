import { Collision, CollisionDetector, Draggable, Droppable } from "../types";
import { intersectionRatio } from "../util/calculations/intersectionRatio";

export const rectIntersection: CollisionDetector = (
  draggableItem: Draggable,
  droppableAreas: Droppable[]
) => {
  if (!draggableItem.elementRef.current) return [];
  const draggableRect =
    draggableItem.elementRef.current.getBoundingClientRect();

  const collisions: Collision[] = [];
  for (const DA of droppableAreas) {
    const DARect = DA.elementRef.current?.getBoundingClientRect();
    if (!DARect) {
      throw new Error(`${DA.id} - droppableAreaRect is null.`);
    }

    const IR = intersectionRatio(draggableRect, DARect);

    if (0 < IR) {
      collisions.push({
        ...DA,
        criteria: IR,
      });
    }
  }

  return collisions.sort((a, b) => {
    return a.criteria - b.criteria;
  });
};
