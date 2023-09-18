import { useContext, useEffect, useMemo } from "react";
import { useElementRef } from "../util/hooks/useElementRef";
import { dndContext } from "../contexts/DnDContext/Context";
import { ID } from "../types";

type Args = {
  id: ID;
  disabled?: boolean;
};

export function useDroppable(args: Args) {
  const { id, disabled = false } = args;
  const { dispatch, overItem } = useContext(dndContext);
  const [elementRef, setElementRef] = useElementRef();
  const isOver = useMemo(() => id === overItem?.id, [overItem, id]);

  useEffect(() => {
    dispatch({
      type: "onDroppableElementMounted",
      payload: {
        droppableItem: {
          id,
          elementRef,
          disabled,
        },
      },
    });

    return () => {
      dispatch({
        type: "onDroppableElementUnmounted",
        payload: {
          id,
        },
      });
    };
  }, [dispatch, id, disabled, elementRef]);

  return {
    setElementRef,
    isOver,
  } as const;
}
