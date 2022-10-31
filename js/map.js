class Map extends Clickable {
  constructor(x, y, w, h, callback) {
    super(x, y, w, h, callback);

    this.traps = [];
    this.entities = [];
    this.actionStack = [];
    this.effectGenerator = null;
    this.animating = false;
    this.animSpeed = 5; // cell per second
    this.animCompletion = 0;
    this.shouldTriggerStack = false;
    this.initialized = false;
  }

  loadMapGraphics(w, h, mapID) {
    let mapData = loadJSON(`./assets/maps/${mapID}.json`, () => {
      let groundGraphics = createGraphics(w, h);
      map.initMap(mapData.Data[0].Cells);
      for (let i = 0; i < MAP_HEIGHT; i++) {
        let wallGraphics = createGraphics(w, CELL_H*2);
        let wall = false;
        for (let j = 0; j < MAP_WIDTH; j++) {
          switch (map.getCell(j, i).type) {
            case CELL.WALKABLE:
              drawCell(j, i, (i % 2 === 0 ? color('#8E8660') : color('#968E69')), color('#7E7961'), ''/*i * MAP_WIDTH + j*/, groundGraphics);
              break;
            case CELL.LOS_WALL:
              // drawCell(j, 2, color(0, 0, 0, 0), color(0, 0, 0, 0), '', gr);
              break;
            case CELL.WALL:
              drawWall(j, 2, color('#58533C'), color('#B8B6B2'), '', wallGraphics);
              wall = true;
              break;
            default:
              break;
          }
        }
        if (wall)
          canvas.addElement(wallGraphics, i, SUBLAYERS.MAP, (i % 2) * CELL_W/2, i * CELL_H/2 - CELL_H, w, CELL_H * 2);
      }
      canvas.addElement(groundGraphics, 0, SUBLAYERS.MAP, 0, 0, w, h);
    });
    canvas.addClickable(map);
  }

  click(x, y) {
    let cell = this.getCellAtPos(x, y);
    if (!cell) return false;

    switch (canvas.selectedSpell?.type) {
      case SPELL.TRAP:
        if (this.traps.some((trap) => trap.cell.x === cell.x && trap.cell.y === cell.y))
          break;
        this.placeTrap(new Trap(canvas.selectedSpell.effects.trap, cell));
        canvas.unselectSpell();
        break;
      case SPELL.ENTITY:
        if (this.entities.some((entity) => entity.cell.x === cell.x && entity.cell.y === cell.y))
          break;
        this.placeEntity(new Entity(1, cell, TEAM.DEFENDER, canvas.selectedSpell.effects.movable, canvas.selectedSpell.effects.image));
        canvas.unselectSpell();
        break;
      case SPELL.TRIGGER:
        this.triggerTraps(cell.x, cell.y);
        canvas.unselectSpell();
        break;
      case SPELL.KILL:
        if (!this.removeEntity(cell.x, cell.y)) {
          this.removeTrap(cell.x, cell.y);
        }
        canvas.unselectSpell();
        break;
      default:
        break;
    }
    return true;
  }

  getCellAtPos(posX, posY) {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j].click(posX - this.x, posY - this.y)) {
          return this.map[i][j];
        }
      }
    }
    return null;
  }

  initMap(cellData) {
    this.map = [];
    for (let i = 0; i < MAP_WIDTH; i++) {
      let row = [];
      for (let j = 0; j < MAP_HEIGHT; j++) {
        row.push(new Cell(i, j, CELL_W, CELL_H, () => {}, j * MAP_WIDTH + i, cellData[j][i]));
      }
      this.map.push(row);
    }
    this.initialized = true;
  }

  getCell(id_or_x, y) {
    if (!this.initialized) return;
    
    let x = (y === undefined ? id_or_x % MAP_WIDTH : id_or_x);
    y = (y === undefined ? Math.floor(id_or_x / MAP_WIDTH) : y);
    return this.map[x] && this.map[x][y] || undefined;
  }

  getEntity(id_or_x, y) {
    let x = (y === undefined ? id_or_x % MAP_WIDTH : id_or_x);
    y = (y === undefined ? Math.floor(id_or_x / MAP_WIDTH) : y);

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
    entity.canvasElement = loadEntity(entity);
    if (entity.cell !== undefined) {
      this.entities.push(entity);
    }
  }

  removeEntity(x, y) {
    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i].cell.x === x && this.entities[i].cell.y === y) {
        canvas.removeElements([this.entities[i].canvasElement]);
        this.entities = this.entities.filter(entity => entity !== this.entities[i]);
        return true;
      }
    }
    return false;
  }

  placeTrap(trap) {
    trap.canvasElements = loadTrap(trap, this.traps.length);
    if (trap.cell !== undefined) {
      this.traps.unshift(trap);
    }
  }

  removeTrap(x, y) {
    for (let i = 0; i < this.traps.length; i++) {
      if (this.traps[i].cell.x === x && this.traps[i].cell.y === y) {
        canvas.removeElements(this.traps[i].canvasElements);
        this.traps = this.traps.filter(trap => trap !== this.traps[i]);
        return true;
      }
    }
    return false;
  }

  getTrap(id_or_x, y) {
    let x = (y === undefined ? id_or_x % MAP_WIDTH : id_or_x);
    y = (y === undefined ? Math.floor(id_or_x / MAP_WIDTH) : y);

    for (let i = 0; i < this.traps.length; i++) {
      if (this.traps[i].cell.x === x && this.traps[i].cell.y === y) {
        return this.traps[i];
      }
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
    let x = (y === undefined ? id_or_x % MAP_WIDTH : id_or_x);
    y = (y === undefined ? Math.floor(id_or_x / MAP_WIDTH) : y);

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
      canvas.removeElements(this.traps[trapId].canvasElements);
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
    return cell1 && !this.getEntity(cell1.id) && cell1.type === CELL.WALKABLE
        && cell2 && !this.getEntity(cell2.id) && cell2.type === CELL.WALKABLE;
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

  static getCellPos(x, y) {
    let posX;
    let posY;

    if (y % 2 === 0) {
      posX = x * CELL_W;
      posY = (y/2) * CELL_H;
    } else {
      posX = x * CELL_W + CELL_W/2;
      posY = (y/2) * CELL_H;
    }

    return {
      x: posX,
      y: posY
    };
  }
}