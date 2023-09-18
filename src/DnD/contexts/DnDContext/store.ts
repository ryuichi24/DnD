import {
  ID,
  Droppable,
  Draggable,
  Active,
  Coordinates,
  DnDEventListeners,
} from "../../types";

export type State = {
  activeItem: Active | null;
  droppableAreas: Map<ID, Droppable>;
  draggableItems: Map<ID, Draggable>;
  eventListeners: DnDEventListeners;
};

/**
 * @description
 * Action type should be modeled as Events not as Setters
 * @see {@link https://redux.js.org/style-guide/#model-actions-as-events-not-setters}
 */
export type Action =
  | {
      type: "onDraggableElementMounted";
      payload: {
        draggableItem: Draggable;
      };
    }
  | {
      type: "onDraggableElementUnmounted";
      payload: {
        id: ID;
      };
    }
  | {
      type: "onDragStart";
      payload: {
        activeItem: Omit<Active, "distanceToMove">;
      };
    }
  | {
      type: "onDragMove";
      payload: {
        currentPointerCoordinates: Coordinates;
      };
    }
  | {
      type: "onDragEnd";
      payload: {
        currentPointerCoordinates: Coordinates;
      };
    }
  | {
      type: "onDragOver";
    }
  | { type: "onDroppableElementMounted" }
  | {
      type: "onDnDInitialized";
      payload: DnDEventListeners;
    };

export function makeInitState(): State {
  return {
    activeItem: null,
    droppableAreas: new Map(),
    draggableItems: new Map(),
    eventListeners: {},
  };
}
