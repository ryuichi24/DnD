import { ID, Droppable, Draggable, Active, Coordinates } from "../../types";

export type State = {
  activeItem: Active | null;
  droppableAreas: Map<ID, Droppable>;
  draggableItems: Map<ID, Draggable>;
};

/**
 * @description
 * Action type should be modeled as Events not as Setters
 * @see {@link https://redux.js.org/style-guide/#model-actions-as-events-not-setters}
 */
export type Action =
  | {
      type: "draggableElementMounted";
      payload: {
        draggableItem: Draggable;
      };
    }
  | {
      type: "draggableElementUnmounted";
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
      type: "OnDragEnd";
    }
  | { type: "droppableElementMounted" };

export function makeInitState(): State {
  return {
    activeItem: null,
    droppableAreas: new Map(),
    draggableItems: new Map(),
  };
}
