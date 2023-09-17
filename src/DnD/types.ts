import { MutableRefObject } from "react";

export type ID = string | number;

export type Active = {
  id: ID;
  elementRef: MutableRefObject<HTMLElement | null>;
  initialCoordinates: Coordinates;
  distanceToMove: { x: number; y: number };
};

export type Over = {
  id: ID;
  elementRef: MutableRefObject<HTMLElement | null>;
};

export type Draggable = {
  id: ID;
  elementRef: MutableRefObject<HTMLElement | null>;
};

export type Droppable = {
  id: ID;
  elementRef: MutableRefObject<HTMLElement | null>;
  disabled: boolean;
};

export type Collision = {
  id: ID;
};

export type DraggableMap = Map<ID, Draggable | undefined>;

export type DroppableMap = Map<ID, Droppable | undefined>;

export type Coordinates = {
  x: number;
  y: number;
};
