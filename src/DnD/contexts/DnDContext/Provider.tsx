import React, { useEffect, useReducer } from "react";
import { dndContext } from "./Context";
import { State, Action, makeInitState } from "./store";
import { calculateDistanceToMove } from "../../util/calculateDistanceToMove";
import { DnDEventListeners } from "../../types";

function reducer(state: State, action: Action): State {
  const { type } = action;
  switch (type) {
    case "onDnDInitialized": {
      const { payload: eventListeners } = action;
      return { ...state, eventListeners: { ...eventListeners } };
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
    case "onDragStart": {
      const { activeItem: initialActiveItem } = action.payload;
      const activeItem = {
        ...initialActiveItem,
        distanceToMove: { x: 0, y: 0 },
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
      if (!state.activeItem) return state;
      return {
        ...state,
        activeItem: {
          ...state.activeItem,
          distanceToMove: calculateDistanceToMove(
            state.activeItem?.initialCoordinates,
            payload.currentPointerCoordinates
          ),
        },
      };
    }
    case "onDragEnd": {
      return { ...state, activeItem: null };
    }
    case "onDroppableElementMounted": {
      return { ...state };
    }
    default:
      return state;
  }
}

type DnDContextProviderProps = React.PropsWithChildren & {
  eventListeners?: DnDEventListeners;
};

export const DnDContextProvider = (props: DnDContextProviderProps) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, makeInitState());
  const { activeItem } = state;

  useEffect(() => {
    dispatch({
      type: "onDnDInitialized",
      payload: {
        ...props.eventListeners,
      },
    });
  }, [props.eventListeners]);

  const overId = "";
  // on Drag Over
  useEffect(() => {
    if (!activeItem) {
      return;
    }

    dispatch({
      type: "onDragOver",
    });
  }, [overId, activeItem]);

  return (
    <dndContext.Provider
      value={{
        dispatch,
        activeItem,
        collisions: [],
        draggableItems: new Map(),
        droppableAreas: new Map(),
        overItem: null,
      }}
    >
      {children}
    </dndContext.Provider>
  );
};
