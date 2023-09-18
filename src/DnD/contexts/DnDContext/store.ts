import {
  ID,
  Droppable,
  Draggable,
  Active,
  Coordinates,
  DnDEventListeners,
  Over,
  CollisionDetector,
} from "../../types";

export type State = {
  activeItem: Active | null;
  overItem: Over | null;
  droppableAreas: Map<ID, Droppable>;
  draggableItems: Map<ID, Draggable>;
  eventListeners: DnDEventListeners;
  collisionDetector: CollisionDetector | null;
};

/**
 * @description
 * Action type should be modeled as Events not as Setters
 * @see {@link https://redux.js.org/style-guide/#model-actions-as-events-not-setters}
 */
export type Action =
  | {
      type: "onDnDInitialized";
      payload: {
        eventListeners: DnDEventListeners;
        collisionDetector: CollisionDetector;
      };
    }
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
      type: "onDroppableElementMounted";
      payload: {
        droppableItem: Droppable;
      };
    }
  | {
      type: "onDroppableElementUnmounted";
      payload: {
        id: ID;
      };
    }
  | {
      type: "onDragStart";
      payload: {
        activeItem: Omit<Active, "moveTo">;
      };
    }
  | {
      type: "onDragMove";
      payload: {
        currentPointerCoordinates: Coordinates;
      };
    }
  | {
      type: "onDragOver";
    }
  | {
      type: "onDragEnd";
      payload: {
        currentPointerCoordinates: Coordinates;
      };
    }
  | {
      type: "onDragCancel";
    };

export function makeInitState(): State {
  return {
    activeItem: null,
    overItem: null,
    droppableAreas: new Map(),
    draggableItems: new Map(),
    eventListeners: {},
    collisionDetector: null,
  };
}
