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

type DragEvent = {
  active: Active;
  over: Over | null;
};

export type DragStartEvent = Omit<DragEvent, "over">;

export type DragMoveEvent = DragEvent;

export type DragOverEvent = DragEvent;

export type DragEndEvent = DragEvent;

export type DragCancelEvent = DragEvent;

export type DnDEventListeners = {
  onDragStart?(dragStartEvt: DragStartEvent): void;
  onDragMove?(dragMoveEvt: DragMoveEvent): void;
  onDragOver?(dragOverEvt: DragOverEvent): void;
  onDragEnd?(dragEndEvt: DragEndEvent): void;
  onDragCancel?(dragCancelEvt: DragCancelEvent): void;
};
