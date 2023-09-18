import { createContext } from "react";
import {
  Active,
  Over,
  DraggableMap,
  DroppableMap,
  Collision,
} from "../../types";
import { Action } from "./store";
import { emptyFunc } from "../../util/emptyFunc";

type DnDContext = {
  activeItem: Active | null;
  overItem: Over | null;
  draggableItems: DraggableMap;
  droppableAreas: DroppableMap;
  collisions: Collision[];
  dispatch: React.Dispatch<Action>;
};

export const dndContext = createContext<DnDContext>({
  activeItem: null,
  overItem: null,
  draggableItems: new Map(),
  droppableAreas: new Map(),
  collisions: [],
  dispatch: emptyFunc,
});
