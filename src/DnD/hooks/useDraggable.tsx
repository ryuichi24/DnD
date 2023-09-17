import { useContext, useEffect, useMemo } from "react";
import { useElementRef } from "../util/hooks/useElementRef";
import { dndContext } from "../contexts/DnDContext/Context";
import { ID } from "../types";
import { makeListenerManager } from "../util/makeListenerManager";
import { getCoordinates } from "../util/getCoordinates";

type Args = {
  id: ID;
};

export function useDraggable(args: Args) {
  const { id } = args;
  const { dispatch, activeItem } = useContext(dndContext);
  const [elementRef, setElementRef] = useElementRef();
  const isDragging = useMemo(() => activeItem?.id === id, [activeItem, id]);
  const transform = useMemo(
    () =>
      isDragging
        ? `translate3d(${activeItem?.distanceToMove.x}px, ${activeItem?.distanceToMove.y}px, 0)`
        : undefined,
    [activeItem?.distanceToMove, isDragging]
  );

  const onPointerDown = (onPointerDownEvt: React.PointerEvent<HTMLElement>) => {
    /**
     * @description
     * Exclude any non-left click actions (0 means left click)
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value}
     */
    if (onPointerDownEvt.button !== 0) return;

    const initialPointerCoordinates = getCoordinates(onPointerDownEvt);

    dispatch({
      type: "onDragStart",
      payload: {
        activeItem: {
          id,
          elementRef,
          initialCoordinates: initialPointerCoordinates,
        },
      },
    });

    const ownerDocument = (onPointerDownEvt.target as HTMLElement)
      .ownerDocument;

    const listenerManager = makeListenerManager(ownerDocument);

    listenerManager.add("pointermove", (onPointerMoveEvt: PointerEvent) => {
      const currentPointerCoordinates = getCoordinates(onPointerMoveEvt);
      dispatch({
        type: "onDragMove",
        payload: { currentPointerCoordinates: currentPointerCoordinates },
      });
    });

    listenerManager.add("pointerup", () => {
      dispatch({ type: "OnDragEnd" });
      listenerManager.removeAll();
    });
  };

  useEffect(() => {
    dispatch({
      type: "draggableElementMounted",
      payload: {
        draggableItem: {
          id,
          elementRef,
        },
      },
    });
    return () => {
      dispatch({
        type: "draggableElementUnmounted",
        payload: {
          id,
        },
      });
    };
  }, [dispatch, elementRef, id]);

  return {
    triggerListeners: {
      onPointerDown,
    },
    setElementRef,
    isDragging,
    transform,
  } as const;
}
