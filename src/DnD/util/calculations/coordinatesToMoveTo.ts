type Coordinates = {
  x: number;
  y: number;
};

export function coordinatesToMoveTo(
  initialCoordinates: Coordinates,
  currentCoordinates: Coordinates
) {
  return {
    x: currentCoordinates.x - initialCoordinates.x,
    y: currentCoordinates.y - initialCoordinates.y,
  };
}
