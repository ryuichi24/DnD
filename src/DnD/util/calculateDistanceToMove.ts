import { Coordinates } from "../types";

export function calculateDistanceToMove(
  initialCoordinates: Coordinates,
  currentCoordinates: Coordinates
) {
  return {
    x: currentCoordinates.x - initialCoordinates.x,
    y: currentCoordinates.y - initialCoordinates.y,
  };
}
