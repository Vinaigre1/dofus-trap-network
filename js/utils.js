function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDirection(id_or_fromX, id2_or_fromY, toX, toY) {
  let fromX = (toX === undefined ? id_or_fromX % MAP_WIDTH : id_or_fromX);
  let fromY = (toX === undefined ? Math.floor(id_or_fromX / MAP_WIDTH) : id2_or_fromY);
  toX = (toX === undefined ? id2_or_fromY % MAP_WIDTH : toX);
  toY = (toY === undefined ? Math.floor(id2_or_fromY / MAP_WIDTH) : toY);

  let distance = Map.distance(fromX, fromY, toX, toY);

  // Diagonal directions
  if (distance.x === 0) {
    if (distance.relative.y > 0) {
      return DIRECTION.SOUTHEAST;
    } else if (distance.relative.y < 0) {
      return DIRECTION.NORTHWEST;
    } else {
      return DIRECTION.NONE;
    }
  } else if (distance.y === 0) {
    if (distance.relative.x > 0) {
      return DIRECTION.NORTHEAST;
    } else if (distance.relative.x < 0) {
      return DIRECTION.SOUTHWEST;
    }
  }

  // Non-diagonal directions
  if (distance.relative.x > 0 && distance.relative.y > 0) {
    return DIRECTION.EAST;
  } else if (distance.relative.x > 0 && distance.relative.y < 0) {
    return DIRECTION.NORTH;
  } else if (distance.relative.x < 0 && distance.relative.y > 0) {
    return DIRECTION.SOUTH;
  } else if (distance.relative.x < 0 && distance.relative.y < 0) {
    return DIRECTION.WEST;
  }

  return DIRECTION.NONE; // Will probably never go there
}

function moveInDirection(x, y, direction, distance = 1) {
  switch (direction) {
    case DIRECTION.NORTH:
      x += Math.floor((distance + (y % 2)) / 2);
      y -= distance;
      break;
    case DIRECTION.EAST:
      x += Math.floor((distance + (y % 2)) / 2);
      y += distance;
      break;
    case DIRECTION.SOUTH:
      x -= Math.floor((distance + ((1 - y % 2))) / 2);
      y += distance;
      break;
    case DIRECTION.WEST:
      x -= Math.floor((distance + ((1 - y % 2))) / 2);
      y -= distance;
      break;
    case DIRECTION.NORTHEAST:
      x += Math.ceil(distance / 2);
      break;
    case DIRECTION.SOUTHEAST:
      y += Math.ceil(distance / 2) * 2;
      break;
    case DIRECTION.SOUTHWEST:
      x -= Math.ceil(distance / 2);
      break;
    case DIRECTION.NORTHWEST:
      y -= Math.ceil(distance / 2) * 2;
      break;
    default:
      break;
  }
  return { x, y };
}

function *clockwise(x, y) {
  let posX = x;
  let posY = y;
  yield { x, y, id: x + y * MAP_WIDTH };
  // Iterate first by distance from origin
  for (let d = 1; true; d++) {
    // i = cardinal point of the chunk of cells
    // 0: North // 1: East // 2: South // 3: West
    for (let i = 0; i < 4; i++) {
      // Get the coordinates of the first cell
      let newPos = moveInDirection(x, y, i, d);
      posX = newPos.x;
      posY = newPos.y;
      yield { x: posX, y: posY, id: posX + posY * MAP_WIDTH };
      // Iterate through the cells of that chunk
      for (let j = 0; j < d - 1; j++) {
        switch (i) {
          case DIRECTION.NORTH:
            posY += 2;
            break;
          case DIRECTION.EAST:
            posX--;
            break;
          case DIRECTION.SOUTH:
            posY -= 2;
            break;
          case DIRECTION.WEST:
            posX++;
            break;
          default:
            break;
        }
        yield { x: posX, y: posY, id: posX + posY * MAP_WIDTH };
      }
    }
  }
}

function isInArea(x, y, areaX, areaY, area) {
  let distance = Map.distance(areaX, areaY, x, y);

  switch (area.type) {
    case AREA.CELL:
      return areaX === x && areaY === y;
    case AREA.CROSS:
      return distance.real <= area.size && distance.x === distance.y;
    case AREA.CIRCLE:
      return distance.real <= area.size;
    case AREA.DIAGONAL:
      return (distance.x === 0 && distance.y <= area.size * 2) ||
             (distance.y === 0 && distance.x <= area.size * 2);
    case AREA.RING:
      return distance.real === area.size;
    default:
      return false;
  }
}