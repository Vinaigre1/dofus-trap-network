class Map {
  constructor(w = MAP_WIDTH, h = MAP_HEIGHT) {
    this.width = w;
    this.height = h;
    this.traps = [];
    this.initMap();
    this.entities = [];
    this.actionStack = [];
    this.effectGenerator = null;
    this.animating = false;
    this.animSpeed = 10; // cell per second
    this.animCompletion = 0;
    this.shouldTriggerStack = false;
  }

  initMap() {
    this.map = [];
    for (let i = 0; i < this.width; i++) {
      let row = [];
      for (let j = 0; j < this.height; j++) {
        row.push(new Cell(j * this.width + i, i, j));
      }
      this.map.push(row);
    }
  }

  getCell(id_or_x, y) {
    let x = (y === undefined ? id_or_x % this.width : id_or_x);
    y = (y === undefined ? Math.floor(id_or_x / this.width) : y);
    return this.map[x] && this.map[x][y] || undefined;
  }

  getEntity(id_or_x, y) {
    let x = (y === undefined ? id_or_x % this.width : id_or_x);
    y = (y === undefined ? Math.floor(id_or_x / this.width) : y);

    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i].cell.x === x && this.entities[i].cell.y === y) {
        return this.entities[i];
      }
    }
  }

  addToActionStack(...args) {
    if (args.length === 1 && Array.isArray(args[0]))
      args = args[0];
    this.actionStack.push(...args);
  }

  triggerStack() {
    let action = undefined;
    while (this.animating || (action = this.actionStack.pop())) {
      if (!this.animating) {
        this.effectGenerator = action.target.applyEffect(action.effect, action.caster);
      }
      let next = this.effectGenerator.next();
      if (!next.done) {
        this.animating = true;
        this.shouldTriggerStack = false;
        return;
      } else {
        this.animating = false;
      }
    }
    this.shouldTriggerStack = false;
  }

  placeEntity(entity) {
    if (entity.cell !== undefined) {
      this.entities.push(entity);
    }
  }

  placeTrap(trap) {
    if (trap.cell !== undefined) {
      this.traps.unshift(trap);
    }
  }

  getEntitiesInArea(area, cell) {
    let entities = [];
    let clock = clockwise(cell.x, cell.y);
    let maxCells = ((area.size * 2) * ((area.size * 2) + 1)) * 2 + 1; // Number of cells in a circle twice the size of the area // Small hack to avoid checking the entire map
    for (let i = 0; i < maxCells; i++) {
      let cellPos = clock.next().value;
      if (isInArea(cellPos.x, cellPos.y, cell.x, cell.y, area)) {
        let entity = this.getEntity(cellPos.x, cellPos.y);
        if (entity)
          entities.push(entity);
      }
    }
    return entities;
  }

  triggerTraps(id_or_x, y) {
    let x = (y === undefined ? id_or_x % this.width : id_or_x);
    y = (y === undefined ? Math.floor(id_or_x / this.width) : y);

    let triggered = [];
    this.traps.forEach((trap, i) => {
      if (trap.isInTrap(x, y)) {
        let localStack = [];
        trap.trap.effects.forEach(effect => {
          let entities = this.getEntitiesInArea(effect.area, trap.cell);
          if (effect.type === EFFECT.PUSH) { // anticlockwise
            entities = entities.reverse();
          }
          for (let i = 0; i < entities.length; i++) {
            localStack.unshift(new Action(trap.caster, entities[i], new Effect(effect.type, trap.cell, entities[i].cell, effect.value.min, effect.value.max)));
          }
        });
        this.addToActionStack(localStack);
        triggered.push(i);
      }
    });
    triggered.reverse().forEach(trapId => {
      this.traps.splice(trapId, 1);
    });
    if (triggered.length > 0) {
      this.shouldTriggerStack = true;
      return true;
    }
    return false;
  }

  checkDiagonalMovement(cell, direction) {
    let splitDir = {
      [DIRECTION.NORTHEAST]: [DIRECTION.NORTH, DIRECTION.EAST],
      [DIRECTION.NORTHWEST]: [DIRECTION.NORTH, DIRECTION.WEST],
      [DIRECTION.SOUTHWEST]: [DIRECTION.SOUTH, DIRECTION.WEST],
      [DIRECTION.SOUTHEAST]: [DIRECTION.SOUTH, DIRECTION.EAST]
    }
    let pos1 = moveInDirection(cell.x, cell.y, splitDir[direction][0], 1);
    let pos2 = moveInDirection(cell.x, cell.y, splitDir[direction][1], 1);
    let cell1 = map.getCell(pos1.x, pos1.y);
    let cell2 = map.getCell(pos2.x, pos2.y);
    return cell1 && !this.getEntity(cell1.id) && cell2 && !this.getEntity(cell2.id);
  }

  static distance(x1, y1, x2, y2) {
    let distanceX = 2 * (x1 - x2);
    let distanceY = y1 - y2;
    if (y1 % 2 !== y2 % 2) {
      if (y2 % 2 === 1) {
        distanceX--;
      } else {
        distanceX++;
      }
    }

    return {
      real: Math.max(Math.abs(distanceX), Math.abs(distanceY)),
      x: Math.abs(distanceX),
      y: Math.abs(distanceY),
      relative: {
        x: -distanceX,
        y: -distanceY
      }
    };
  }
}