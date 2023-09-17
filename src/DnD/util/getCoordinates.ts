function hasPointerCoordinates(
  event: Event | React.PointerEvent<HTMLElement>
): event is Event & Pick<PointerEvent, "clientX" | "clientY"> {
  return "clientX" in event && "clientY" in event;
}

export function getCoordinates(event: Event | React.PointerEvent<HTMLElement>) {
  if (!hasPointerCoordinates(event))
    throw new Error("Invalid Event: Does not have mouse pointer coordinates.");

  return {
    x: event.clientX,
    y: event.clientY,
  };
}
