import React from "react";
import { useDraggable } from "../../DnD";

type TestDraggableItemProps = {
  item: { id: string; name: string };
};

export const TestDraggableItem = ({ item }: TestDraggableItemProps) => {
  const { triggerListeners, setElementRef, isDragging, transform } =
    useDraggable({
      id: item.id,
    });

  const style = transform
    ? {
        transform,
      }
    : undefined;
  return (
    <li
      {...triggerListeners}
      ref={setElementRef}
      style={style}
      className={`h-[2rem] flex items-center justify-center border p-1 ${
        isDragging ? "cursor-grabbing" : "cursor-pointer"
      }`}
    >
      {item.name}
    </li>
  );
};
