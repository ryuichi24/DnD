import React from "react";
import { useDroppable } from "../../DnD/hooks/useDroppable";

type TestDroppableAreaProps = {
  id: string;
};

export const TestDroppableArea = (props: TestDroppableAreaProps) => {
  const { id } = props;
  const { setElementRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setElementRef}
      className={`border p-2 min-h-[2rem] ${isOver ? "bg-red-400" : ""}`}
    ></div>
  );
};
