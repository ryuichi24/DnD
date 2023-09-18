import React, { useEffect, useReducer } from "react";
import { dndContext } from "./Context";
import { State, Action, makeInitState } from "./store";
import { CollisionDetector, DnDEventListeners } from "../../types";
import { coordinatesToMoveTo } from "../../util/calculations/coordinatesToMoveTo";
import { rectIntersection } from "../../collision-detector";

function reducer(state: State, action: Action): State {
  const { type } = action;
  switch (type) {
    case "onDnDInitialized": {
      const { eventListeners, collisionDetector } = action.payload;
      return { ...state, eventListeners, collisionDetector };
    }
    case "onDraggableElementMounted": {
      const draggableItemMap = new Map(state.draggableItems);
      const { draggableItem } = action.payload;
      draggableItemMap.set(draggableItem.id, draggableItem);
      return { ...state, draggableItems: draggableItemMap };
    }
    case "onDraggableElementUnmounted": {
      const draggableItemMap = new Map(state.draggableItems);
      const { id } = action.payload;
      draggableItemMap.delete(id);
      return { ...state, draggableItems: draggableItemMap };
    }
    case "onDroppableElementMounted": {
      const droppableAreaMap = new Map(state.droppableAreas);
      const { droppableItem } = action.payload;
      droppableAreaMap.set(droppableItem.id, droppableItem);
      return { ...state, droppableAreas: droppableAreaMap };
    }
    case "onDroppableElementUnmounted": {
      const droppableAreaMap = new Map(state.droppableAreas);
      const { id } = action.payload;
      droppableAreaMap.delete(id);
      return { ...state, droppableAreas: droppableAreaMap };
    }
    case "onDragStart": {
      const { activeItem: initialActiveItem } = action.payload;
      const activeItem = {
        ...initialActiveItem,
        moveTo: { x: 0, y: 0 },
      };
      const { onDragStart } = state.eventListeners;
      if (onDragStart) {
        onDragStart({ active: activeItem });
      }
      return {
        ...state,
        activeItem,
      };
    }
    case "onDragMove": {
      const { payload } = action;
      const {
        activeItem,
        droppableAreas,
        eventListeners: { onDragMove },
        collisionDetector,
      } = state;
      if (
        !activeItem! ||
        !activeItem.elementRef.current ||
        !collisionDetector
      ) {
        return state;
      }

      const collisions = collisionDetector(
        activeItem,
        Array.from(droppableAreas.values())
      );

      const [firstCollision] = collisions;

      const overItem = firstCollision
        ? {
            id: firstCollision?.id,
            elementRef: firstCollision?.elementRef,
          }
        : null;

      if (onDragMove) {
        onDragMove({
          active: activeItem,
          over: overItem,
        });
      }
      return {
        ...state,
        activeItem: {
          ...activeItem,
          moveTo: coordinatesToMoveTo(
            activeItem.initialCoordinates,
            payload.currentPointerCoordinates
          ),
        },
        overItem,
      };
    }
    case "onDragOver": {
      const {
        activeItem,
        overItem,
        eventListeners: { onDragOver },
      } = state;
      if (onDragOver) {
        onDragOver({
          active: activeItem,
          over: overItem,
        });
      }
      return { ...state };
    }
    case "onDragEnd": {
      const {
        eventListeners: { onDragEnd },
        activeItem,
        overItem,
      } = state;
      if (onDragEnd) {
        onDragEnd({ active: activeItem, over: overItem });
      }
      return { ...state, activeItem: null, overItem: null };
    }
    case "onDragCancel": {
      return { ...state };
    }
    default:
      return state;
  }
}

type DnDContextProviderProps = React.PropsWithChildren & {
  eventListeners?: DnDEventListeners;
  collisionDetector?: CollisionDetector;
};

export const DnDContextProvider = (props: DnDContextProviderProps) => {
  const {
    children,
    eventListeners,
    collisionDetector = rectIntersection,
  } = props;
  const [state, dispatch] = useReducer(reducer, makeInitState());
  const { activeItem, overItem } = state;

  useEffect(() => {
    dispatch({
      type: "onDnDInitialized",
      payload: {
        eventListeners: { ...eventListeners },
        collisionDetector,
      },
    });
  }, [eventListeners, collisionDetector]);

  useEffect(() => {
    if (!activeItem || !overItem) {
      return;
    }

    dispatch({
      type: "onDragOver",
    });
  }, [overItem, activeItem]);

  return (
    <dndContext.Provider
      value={{
        dispatch,
        activeItem,
        overItem,
        collisions: [],
        draggableItems: new Map(),
        droppableAreas: new Map(),
      }}
    >
      {children}
    </dndContext.Provider>
  );
};
