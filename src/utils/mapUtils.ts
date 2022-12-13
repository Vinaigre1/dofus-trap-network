import { AreaType, CellBorders, Coordinates, Direction } from "@src/enums";

/**
 * Returns all cells present in the given area
 * 
 * @param {Coordinates} pos Position of the area
 * @param {AreaType} area Type of area
 * @param {number} size Size of the area
 * @returns {Array<Coordinates>} List of all Coordinates in the given area
 */
export function getCellsInArea(pos: Coordinates, area: AreaType, size: number): Array<Coordinates> {
  const cells: Array<Coordinates> = [];
  const clock: Generator<Coordinates> = clockwise(pos);

  // maxCells = Number of cells in a circle twice the size of the area // Small hack to avoid checking the entire map
  // Todo: increase efficiency of this function ?
  const timesTwo: boolean = [AreaType.Diagonal, AreaType.Square].includes(area);
  const maxCells: number = ((size * (timesTwo ? 2 : 1)) * ((size * (timesTwo ? 2 : 1)) + 1)) * 2 + 1;

  for (let i: number = 0; i < maxCells; i++) {
    const clockPos: Coordinates = clock.next().value;
    
    if (isInArea(clockPos, area, pos, size)) {
      cells.push(clockPos);
    }
  }

  return cells;
}

/**
 * Checks if a given coordinates is present in a given area.
 * 
 * @param {Coordinates} pos Position to check
 * @param {AreaType} area Type of area
 * @param {Coordinates} areaPos Position of the area
 * @param {number} size Size of the area
 * @returns {boolean} true if *pos* is in the given area
 */
export function isInArea(pos: Coordinates, area: AreaType, areaPos: Coordinates, size: number): boolean {
  const distance = getDistance(areaPos, pos);

  switch (area) {
    case AreaType.Cell:
      return areaPos.x === pos.x && areaPos.y === pos.y;
    case AreaType.Cross:
      return distance.real <= size && distance.absolute.x === distance.absolute.y;
    case AreaType.Circle:
      return distance.real <= size;
    case AreaType.Diagonal:
      return (distance.absolute.x === 0 && distance.absolute.y <= size * 2) ||
             (distance.absolute.y === 0 && distance.absolute.x <= size * 2);
    case AreaType.Ring:
      return distance.real === size;
    case AreaType.Square:
      return distance.absolute.x + distance.absolute.y <= size * 2;
    default:
      return false;
  }
}

/**
 * Generates coordinates using the clockwise system.
 * 
 * @generator
 * @param {Coordinates} pos Coordinates of the center
 * @yields {Coordinates} The next coordinates
 */
export function *clockwise(pos: Coordinates): Generator<Coordinates> {
  let nextPos: Coordinates = pos;
  yield { ...pos };
  // Iterate first by distance from origin
  for (let dis: number = 1; true; dis++) {
    // i = cardinal point of the chunk of cells
    for (const dir of [Direction.North, Direction.East, Direction.South, Direction.West]) {
      // Get the coordinates of the first cell
      const moved: Coordinates = moveInDirection(pos, dir, dis);
      nextPos = moved;
      yield { ...moved };
      // Iterate through the cells of that chunk
      for (let j: number = 0; j < dis - 1; j++) {
        switch (dir) {
          case Direction.North:
            nextPos.y += 2;
            break;
          case Direction.East:
            nextPos.x--;
            break;
          case Direction.South:
            nextPos.y -= 2;
            break;
          case Direction.West:
            nextPos.x++;
            break;
          default:
            break;
        }
        yield { ...nextPos };
      }
    }
  }
}

/**
 * Returns the coordinates of the cell in the given
 * direction from a given coordinates.
 * 
 * @param {Coordinates} pos Starting position
 * @param {Direction} direction Direction of the movement
 * @param {number} distance Number of cells to move
 * @returns {Coordinates} The calculated coordinates
 */
export function moveInDirection(pos: Coordinates, direction: Direction, distance: number): Coordinates {
  pos = { ...pos };
  switch (direction) {
    case Direction.North:
      pos.x += Math.floor((distance + (pos.y % 2)) / 2);
      pos.y -= distance;
      break;
    case Direction.East:
      pos.x += Math.floor((distance + (pos.y % 2)) / 2);
      pos.y += distance;
      break;
    case Direction.South:
      pos.x -= Math.floor((distance + ((1 - pos.y % 2))) / 2);
      pos.y += distance;
      break;
    case Direction.West:
      pos.x -= Math.floor((distance + ((1 - pos.y % 2))) / 2);
      pos.y -= distance;
      break;
    case Direction.Northeast:
      pos.x += Math.ceil(distance / 2);
      break;
    case Direction.Southeast:
      pos.y += Math.ceil(distance / 2) * 2;
      break;
    case Direction.Southwest:
      pos.x -= Math.ceil(distance / 2);
      break;
    case Direction.Northwest:
      pos.y -= Math.ceil(distance / 2) * 2;
      break;
    default:
      break;
  }
  return pos;
}

/**
 * Calculates the distance between two coordinates with details
 * such as absolute and relative distances, and total distance.
 * 
 * @param {Coordinates} pos1 First coordinates
 * @param {Coordinates} pos2 Second coordinates
 * @returns {{ real: number, absolute: Coordinates, relative: Coordinates }} An object describing the distance between the two coordinates
 */
export function getDistance(pos1: Coordinates, pos2: Coordinates): { real: number; absolute: Coordinates; relative: Coordinates; } {
  const dis: Coordinates = {
    x: 2 * (pos1.x - pos2.x),
    y: pos1.y - pos2.y
  };

  if (pos1.y % 2 !== pos2.y % 2) {
    if (pos2.y % 2 === 1) {
      dis.x--;
    } else {
      dis.x++;
    }
  }

  return {
    real: Math.max(Math.abs(dis.x), Math.abs(dis.y)),
    absolute: {
      x: Math.abs(dis.x),
      y: Math.abs(dis.y)
    },
    relative: {
      x: -dis.x,
      y: -dis.y
    }
  };
}

/**
 * Calculates the borders of a cell in an area between its
 * coordinates and the exterior of the area.
 * 
 * @param {Coordinates} areaPos Center coordinates of the area
 * @param {Coordinates} pos Coordinates of the cell
 * @param {AreaType} area Type of area
 * @param {number} size Size of the area
 * @returns {CellBorders} The borders of the given cell in the given area
 */
export function getBorders(areaPos: Coordinates, pos: Coordinates, area: AreaType, size: number): CellBorders {
  const distance = getDistance(areaPos, pos);

  let borders = 0;
  if (size === 0) borders |= CellBorders.North | CellBorders.East | CellBorders.South | CellBorders.West;

  switch (area) {
    case AreaType.Cell:
    case AreaType.Diagonal:
    case AreaType.Ring:
      borders |= CellBorders.North | CellBorders.East | CellBorders.South | CellBorders.West;
      break;
    case AreaType.Cross:
      if (distance.real === 0) break;
      if (distance.relative.x < 0 === distance.relative.y < 0) borders |= CellBorders.North | CellBorders.South;
      else borders |= CellBorders.East | CellBorders.West;
      if (distance.relative.x > 0 && distance.relative.y < 0 && distance.real === size) borders |= CellBorders.North;
      if (distance.relative.x > 0 && distance.relative.y > 0 && distance.real === size) borders |= CellBorders.East;
      if (distance.relative.x < 0 && distance.relative.y > 0 && distance.real === size) borders |= CellBorders.South;
      if (distance.relative.x < 0 && distance.relative.y < 0 && distance.real === size) borders |= CellBorders.West;
      break;
    case AreaType.Circle:
      if (distance.real < size) break;
      if (distance.relative.x === size)  borders |= CellBorders.North | CellBorders.East;
      if (distance.relative.y === size)  borders |= CellBorders.South | CellBorders.East;
      if (distance.relative.x === -size) borders |= CellBorders.South | CellBorders.West;
      if (distance.relative.y === -size) borders |= CellBorders.North | CellBorders.West;
      break;
    case AreaType.Square:
      if (distance.absolute.x + distance.absolute.y < size * 2) break;
      if (distance.relative.x >= 0 && distance.relative.y <= 0) borders |= CellBorders.North;
      if (distance.relative.x >= 0 && distance.relative.y >= 0) borders |= CellBorders.East;
      if (distance.relative.x <= 0 && distance.relative.y >= 0) borders |= CellBorders.South;
      if (distance.relative.x <= 0 && distance.relative.y <= 0) borders |= CellBorders.West;
      break;
    default:
      break;
  }
  return borders;
}

/**
 * Returns the direction of a movement from *fromPos* to *toPos*.
 * 
 * The returned direction is one of the 8 possible in the *Direction* enum.
 * 
 * @param {Coordinates} fromPos Starting coordinates
 * @param {Coordinates} toPos Ending coordinates
 * @returns {Direction} The direction of the movement
 */
export function getDirection(fromPos: Coordinates, toPos: Coordinates): Direction {
  const distance = getDistance(fromPos, toPos);

  // Diagonal directions
  if (distance.absolute.x === 0) {
    if (distance.relative.y > 0) {
      return Direction.Southeast;
    } else if (distance.relative.y < 0) {
      return Direction.Northwest;
    } else {
      return undefined;
    }
  } else if (distance.absolute.y === 0) {
    if (distance.relative.x > 0) {
      return Direction.Northeast;
    } else if (distance.relative.x < 0) {
      return Direction.Southwest;
    }
  }

  // Non-diagonal directions
  if (distance.relative.x > 0 && distance.relative.y > 0) {
    return Direction.East;
  } else if (distance.relative.x > 0 && distance.relative.y < 0) {
    return Direction.North;
  } else if (distance.relative.x < 0 && distance.relative.y > 0) {
    return Direction.South;
  } else if (distance.relative.x < 0 && distance.relative.y < 0) {
    return Direction.West;
  }

  return undefined;
}
