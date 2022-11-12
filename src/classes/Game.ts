import Cell from "@classes/Cell";
import Entity from "@classes/Entity";
import Trap from "@classes/Trap";
import Action from "@classes/Action";

import Consts from "@json/Consts.json";
import { Area, CellBorders, CellType, Coordinates, Direction, EffectType, EntityName, Team, TrapType } from "@src/enums";
import { clockwise, isInArea, moveInDirection } from "@src/utils/mapUtils";
import TrapCell from "@classes/TrapCell";
import { randomInt } from "@src/utils/utils";

class Game {
  map: Array<Array<Cell>>;
  entities: Array<Entity>;
  traps: Array<Trap>;
  actionStack: Array<Action>;
  completedActionStack: Array<Action>;
  mapLoaded: boolean;
  
  width: number;
  height: number;

  actionGenerator: Generator<Entity>;
  waitingAnim: boolean;

  constructor(mapName: string) {
    this.width = Consts.mapWidth;
    this.height = Consts.mapHeight;
    this.entities = [];
    this.traps = [];
    this.actionStack = [];
    this.completedActionStack = [];
    this.mapLoaded = false;
    this.waitingAnim = false;

    this.loadMap(mapName);

    if (true) { // Debug
      // @ts-ignore
      window.Game = this;
      this.placeEntity(new Entity({ x: 7, y: 10 }, Team.Attacker, EntityName.Poutch));
      this.placeEntity(new Entity({ x: 13, y: 10 }, Team.Defender, EntityName.Poutch));
      this.placeTrap(new Trap({ x: 12, y: 11 }, TrapType.Repelling, this.entities[0]));
    }
  }

  /**
   * Forces the map component to update its values and children.
   */
  static refreshAll() {
    window.mapComponent.forceUpdate();
  }

  /**
   * Returns the trap cells of all placed traps.
   * 
   * @returns {Array<TrapCell>} The trap cells of all placed traps
   */
  getAllTrapCells(): Array<TrapCell> {
    let cells: Array<TrapCell> = [];

    for (let i: number = 0; i < this.traps.length; i++) {
      const trapCells = this.traps[i].getTrapCells();
      for (let j: number = 0; j < trapCells.length; j++) {
        if (this.map?.[trapCells[j].pos.x]?.[trapCells[j].pos.y]?.type === CellType.Ground) {
          trapCells[j].borders |= this.getCellBorders(trapCells[j].pos);
          cells.push(trapCells[j]);
        }
      }
    }

    return cells;
  }

  /**
   * Adds an entity in the entities property.
   * 
   * @param {Entity} entity 
   */
  placeEntity(entity: Entity) {
    this.entities.push(entity);
  }

  /**
   * Adds a trap at the start of the traps property.
   * 
   * @param {Trap} trap The trap to place
   */
  placeTrap(trap: Trap) {
    this.traps.unshift(trap);
  }

  /**
   * Returns the cell borders at the given coordinates.
   * A border is added if there is a wall or an empty cell next to the coordinates.
   * 
   * @param pos Coordinates of the cell
   * @returns {CellBorders} The borders at the given coordinates
   */
  getCellBorders(pos: Coordinates): CellBorders {
    let borders: CellBorders = 0;
    const dirToBorder = {
      [Direction.North]: CellBorders.North,
      [Direction.East]: CellBorders.East,
      [Direction.South]: CellBorders.South,
      [Direction.West]: CellBorders.West
    }

    for (const dir of [Direction.North, Direction.East, Direction.South, Direction.West]) {
      const moved: Coordinates = moveInDirection(pos, dir, 1);
      if (this.map?.[moved.x]?.[moved.y] === undefined || this.map[moved.x][moved.y].type !== CellType.Ground) {
        borders |= dirToBorder[dir];
      }
    }

    return borders;
  }

  /**
   * Load a map into the object's {map} property.
   * 
   * @param {string} name The name of the json map to load
   */
  loadMap(name: string) {
    const fileURL: string = `/assets/maps/${name}.json`;
    fetch(fileURL)
      .then(res => res.json())
      .then(
        (res) => {
          let map = res.Data[0].Cells;
          this.map = new Array<Array<Cell>>(map[0].length);
          for (let i = 0; i < map[0].length; i++) {
            this.map[i] = new Array<Cell>(map.length);
            for (let j = 0; j < map.length; j++) {
              this.map[i][j] = new Cell(map[j][i], { x: i, y: j});
            }
          }
          Game.refreshAll();
          this.mapLoaded = true;
        },
        (error) => {
          console.error(error);
        }
      )
    ;
  }

  /**
   * Returns the cell object at the given coordinates
   * 
   * @param {Coordinates} pos Coordinates of the cell
   * @returns {Cell} The cell object at the given coordinates
   */
  getCell(pos: Coordinates): Cell {
    return this.map?.[pos.x]?.[pos.y];
  }

  /**
   * Returns the entity at the given coordinates.
   * 
   * @param {Coordinates} pos Coordinates of the cell to check
   * @returns {Entity} The entity, or undefined if there is none
   */
  getEntity(pos: Coordinates): Entity {
    for (let i: number = 0; i < this.entities.length; i++) {
      if (this.entities[i].pos.x === pos.x && this.entities[i].pos.y === pos.y)
        return this.entities[i];
    }
    return undefined;
  }

  /**
   * Returns all entities in the given area.
   * 
   * @param {Coordinates} pos Coordinates of the center of the area
   * @param {Area} area Type of the area
   * @param {number} size Size of the area
   * @returns {Array<Entity>} List of entities in the given area
   */
  getEntitiesInArea(pos: Coordinates, area: Area, size: number): Array<Entity> {
    let entities: Array<Entity> = [];
    let clock = clockwise(pos);

    // maxCells = Number of cells in a circle twice the size of the area // Small hack to avoid checking the entire map
    // Todo: increase efficiency of this function ?
    const timesTwo: boolean = [Area.Diagonal, Area.Square].includes(area);
    const maxCells: number = ((size * (timesTwo ? 2 : 1)) * ((size * (timesTwo ? 2 : 1)) + 1)) * 2 + 1;

    for (let i: number = 0; i < maxCells; i++) {
      const clockPos: Coordinates = clock.next().value;
      if (isInArea(clockPos, area, pos, size)) {
        const entity: Entity = this.getEntity(clockPos);
        if (entity)
          entities.push(entity);
      }
    }
    return entities;
  }

  /**
   * Triggers all traps at the given coordinates and adds
   * all actions in a specific order to the action stack.
   * 
   * @param {Coordinates} pos Coordinates of the cell where traps are triggered
   * @returns {boolean} Returns true if one or more traps has been triggered
   */
  triggerTraps(pos: Coordinates, triggerStack: boolean = false): boolean {
    let triggered: Array<number> = [];
    for (let i: number = 0; i < this.traps.length; i++) {
      if (this.traps[i].isInTrap(pos)) {
        let localStack: Array<Action> = [];
        for (let j: number = 0; j < this.traps[i].effects.length; j++) {
          let entities: Array<Entity> = this.getEntitiesInArea(this.traps[i].pos, this.traps[i].effects[j].area, this.traps[i].effects[j].size);
          if (this.traps[i].effects[j].type === EffectType.Push) { // anticlockwise for Push effects
            entities = entities.reverse();
          }
          for (let k: number = 0; k < entities.length; k++) {
            const value = randomInt(this.traps[i].effects[j].min, this.traps[i].effects[j].max);
            localStack.unshift(new Action(this.traps[i].caster, entities[k], this.traps[i].pos, entities[k].pos, this.traps[i].effects[j].type, value));
          }
        }
        this.addToActionStack(...localStack);
        triggered.push(i);
      }
    }
    for (let i: number = triggered.length - 1; i >= 0; i--) {
      this.traps[triggered[i]].removeComponent();
      this.traps.splice(triggered[i], 1);
    }
    if (triggered.length > 0 && triggerStack) {
      this.triggerStack();
      return true;
    }
    return false;
  }

  /**
   * Adds one or more actions to the stack.
   * @param {Array<Action>} actions List of actions to be added.
   */
  addToActionStack(...actions: Array<Action>) {
    this.actionStack.push(...actions);
  }

  /**
   * Triggers the action stack.
   * Every action, starting from the last one is applied one by one.
   */
  triggerStack() {
    let action: Action = undefined;
    while (this.waitingAnim || (action = this.actionStack.pop())) {
      if (!this.waitingAnim) {
        this.completedActionStack.push(action);
        this.actionGenerator = action.apply();
      }
      const next = this.actionGenerator.next();
      if (!next.done && next.value) {
        this.waitingAnim = true;
        next.value.component.move(next.value.pos, next.value.animPos);
        return;
      } else {
        this.waitingAnim = false;
      }
    }
    Game.refreshAll();
  }

  /**
   * Returns true if the movement is not blocked by anything.
   * This function checks validity for a movement of 1 cell.
   * 
   * @param {Coordinates} fromPos Starting coordinates of movement
   * @param {Coordinates} toPos Last coordinates of movement
   * @param {Direction} dir Direction of movement
   * @returns {boolean}
   */
  isMovementPossible(fromPos: Coordinates, toPos: Coordinates, dir: Direction): boolean {
    const diagonal: boolean = [Direction.Northeast, Direction.Southeast, Direction.Southwest, Direction.Northwest].includes(dir);
    if (diagonal) {
      const splitDir = {
        [Direction.Northeast]: [Direction.North, Direction.East],
        [Direction.Northwest]: [Direction.North, Direction.West],
        [Direction.Southwest]: [Direction.South, Direction.West],
        [Direction.Southeast]: [Direction.South, Direction.East]
      };
      if (!this.isMovementPossible(fromPos, moveInDirection(fromPos, splitDir[dir][0], 1), splitDir[dir][0])
       || !this.isMovementPossible(fromPos, moveInDirection(fromPos, splitDir[dir][1], 1), splitDir[dir][1])) {
        return false;
      }
    }
    return this.getCell(toPos)?.type === CellType.Ground && this.getEntity(toPos) === undefined;
  }
}

export default new Game("empty");