import React, { useEffect, useReducer } from "react";
import { dndContext } from "./Context";
import { State, Action, makeInitState } from "./store";
import { calculateDistanceToMove } from "../../util/calculateDistanceToMove";

function reducer(state: State, action: Action): State {
  const { type } = action;
  switch (type) {
    case "draggableElementMounted": {
      const draggableItemMap = new Map(state.draggableItems);
      const { draggableItem } = action.payload;
      draggableItemMap.set(draggableItem.id, draggableItem);
      return { ...state, draggableItems: draggableItemMap };
    }
    case "draggableElementUnmounted": {
      const draggableItemMap = new Map(state.draggableItems);
      const { id } = action.payload;
      draggableItemMap.delete(id);
      return { ...state, draggableItems: draggableItemMap };
    }
    case "onDragStart": {
      const { activeItem } = action.payload;
      return {
        ...state,
        activeItem: {
          ...activeItem,
          distanceToMove: { x: 0, y: 0 },
        },
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
    case "OnDragEnd": {
      return { ...state, activeItem: null };
    }
    case "droppableElementMounted": {
      return { ...state };
    }
    default:
      return state;
  }
}

type DnDContextProviderProps = React.PropsWithChildren & {
  //
};

export const DnDContextProvider = ({ children }: DnDContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, makeInitState());
  const { activeItem } = state;

  const overId = "";

  useEffect(() => {
    // onDragOver
  }, [overId]);

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
