import { Area, CellBorders, Coordinates, Direction } from "@src/enums";

export function getCellsInArea(pos: Coordinates, area: Area, size: number): Array<Coordinates> {
  let cells: Array<Coordinates> = [];
  let clock: Generator<Coordinates> = clockwise(pos);

  // Number of cells in a circle twice the size of the area // Small hack to avoid checking the entire map
  const timesTwo: boolean = (+area) in [Area.Diagonal, Area.Square];
  const maxCells: number = ((size * (timesTwo ? 2 : 1)) * ((size * (timesTwo ? 2 : 1)) + 1)) * 2 + 1; // Todo: increase efficiency of this function ?

  for (let i: number = 0; i < maxCells; i++) {
    const clockPos: Coordinates = clock.next().value;
    
    if (isInArea(clockPos, area, pos, size)) {
      cells.push(clockPos);
    }
  }

  return cells;
}

export function isInArea(pos: Coordinates, area: Area, areaPos: Coordinates, size: number) {
  let distance = getDistance(areaPos, pos);

  switch (+area) {
    case Area.Cell:
      return areaPos.x === pos.x && areaPos.y === pos.y;
    case Area.Cross:
      return distance.real <= size && distance.absolute.x === distance.absolute.y;
    case Area.Circle:
      return distance.real <= size;
    case Area.Diagonal:
      return (distance.absolute.x === 0 && distance.absolute.y <= size * 2) ||
             (distance.absolute.y === 0 && distance.absolute.x <= size * 2);
    case Area.Ring:
      return distance.real === size;
    case Area.Square:
      return distance.absolute.x + distance.absolute.y <= size * 2;
    default:
      return false;
  }
}

export function *clockwise(pos: Coordinates): Generator<Coordinates> {
  let nextPos: Coordinates = pos;
  yield { ...pos };
  // Iterate first by distance from origin
  for (let dis: number = 1; true; dis++) {
    // i = cardinal point of the chunk of cells
    for (const dir of [Direction.North, Direction.East, Direction.South, Direction.West]) {
      // Get the coordinates of the first cell
      let moved: Coordinates = moveInDirection(pos, dir, dis);
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

export function getDistance(pos1: Coordinates, pos2: Coordinates) {
  let dis: Coordinates = {
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

export function getBorders(areaPos: Coordinates, pos: Coordinates, area: Area, size: number) {
  const distance = getDistance(areaPos, pos);

  let borders = 0;
  if (size === 0) borders |= CellBorders.North | CellBorders.East | CellBorders.South | CellBorders.West;

  switch (+area) {
    case Area.Cell:
    case Area.Diagonal:
    case Area.Ring:
      borders |= CellBorders.North | CellBorders.East | CellBorders.South | CellBorders.West;
      break;
    case Area.Cross:
      if (distance.real === 0) break;
      if (distance.relative.x < 0 === distance.relative.y < 0) borders |= CellBorders.North | CellBorders.South;
      else borders |= CellBorders.East | CellBorders.West;
      if (distance.relative.x > 0 && distance.relative.y < 0 && distance.real === size) borders |= CellBorders.North;
      if (distance.relative.x > 0 && distance.relative.y > 0 && distance.real === size) borders |= CellBorders.East;
      if (distance.relative.x < 0 && distance.relative.y > 0 && distance.real === size) borders |= CellBorders.South;
      if (distance.relative.x < 0 && distance.relative.y < 0 && distance.real === size) borders |= CellBorders.West;
      break;
    case Area.Circle:
      if (distance.real < size) break;
      if (distance.relative.x === size)  borders |= CellBorders.North | CellBorders.East;
      if (distance.relative.y === size)  borders |= CellBorders.South | CellBorders.East;
      if (distance.relative.x === -size) borders |= CellBorders.South | CellBorders.West;
      if (distance.relative.y === -size) borders |= CellBorders.North | CellBorders.West;
      break;
    case Area.Square:
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
