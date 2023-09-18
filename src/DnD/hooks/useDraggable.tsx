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
        ? `translate3d(${activeItem?.moveTo.x}px, ${activeItem?.moveTo.y}px, 0)`
        : undefined,
    [activeItem?.moveTo, isDragging]
  );

  const onPointerDown = (pointerDownEvt: React.PointerEvent<HTMLElement>) => {
    /**
     * @description
     * Exclude any non-left click actions (0 means left click)
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value}
     */
    if (pointerDownEvt.button !== 0) return;

    const ownerDocument = (pointerDownEvt.target as HTMLElement).ownerDocument;
    const listenerManager = makeListenerManager(ownerDocument);

    listenerManager.add("pointermove", (pointerMoveEvt: PointerEvent) => {
      dispatch({
        type: "onDragMove",
        payload: {
          currentPointerCoordinates: getCoordinates(pointerMoveEvt),
        },
      });
    });

    listenerManager.add("pointerup", (pointerUpEvt: PointerEvent) => {
      listenerManager.removeAll();
      dispatch({
        type: "onDragEnd",
        payload: { currentPointerCoordinates: getCoordinates(pointerUpEvt) },
      });
    });

    dispatch({
      type: "onDragStart",
      payload: {
        activeItem: {
          id,
          elementRef,
          initialCoordinates: getCoordinates(pointerDownEvt),
        },
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: "onDraggableElementMounted",
      payload: {
        draggableItem: {
          id,
          elementRef,
        },
      },
    });
    return () => {
      dispatch({
        type: "onDraggableElementUnmounted",
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
