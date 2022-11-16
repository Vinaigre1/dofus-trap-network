import Cell from "@classes/Cell";
import Entity from "@classes/Entity";
import Trap from "@classes/Trap";
import Action from "@classes/Action";

import Consts from "@json/Consts.json";
import { ActionName, Area, CellBorders, CellType, Coordinates, Direction, EffectType, EntityName, Team, TrapType } from "@src/enums";
import { clockwise, isInArea, moveInDirection } from "@src/utils/mapUtils";
import TrapCell from "@classes/TrapCell";
import { randomInt } from "@src/utils/utils";
import MapComponent from "@components/MapComponent";
import HistoryComponent from "@components/HistoryComponent";
import { Spell } from "@src/@types/SpellDataType";

class Game {
  map: Array<Array<Cell>>;
  mapLoaded: boolean;
  mapComponent: MapComponent;
  historyComponent: HistoryComponent;

  entities: Array<Entity>;
  traps: Array<Trap>;
  startPoint: Coordinates;
  savedActionStack: Array<Action>;

  width: number;
  height: number;

  actionStack: Array<Action>;
  completedActionStack: Array<Action>;
  currentAction: Action;

  actionGenerator: Generator<Entity>;
  waitingAnim: boolean;
  remainingSteps: number;

  selectedSpell: Spell;

  constructor(mapName: string) {
    this.width = Consts.mapWidth;
    this.height = Consts.mapHeight;
    this.entities = [];
    this.traps = [];
    this.actionStack = [];
    this.completedActionStack = [];
    this.savedActionStack = [];
    this.currentAction = undefined;
    this.mapLoaded = false;
    this.waitingAnim = false;
    this.mapComponent = undefined;
    this.startPoint = undefined;
    this.remainingSteps = -1;

    this.loadMap(mapName);

    if (false) { // Debug
      // @ts-ignore
      window.Game = this;
      this.placeEntity(new Entity({ x: 6, y: 34 }, Team.Attacker, EntityName.Poutch));
      this.placeEntity(new Entity({ x: 3, y: 29 }, Team.Defender, EntityName.Poutch));
      this.placeEntity(new Entity({ x: 4, y: 26 }, Team.Defender, EntityName.Poutch));
      this.placeTrap(new Trap({ x: 3, y: 30 }, TrapType.Repelling, this.entities[0]));
      this.placeTrap(new Trap({ x: 3, y: 28 }, TrapType.Repelling, this.entities[0]));
      this.placeTrap(new Trap({ x: 3, y: 31 }, TrapType.Drift, this.entities[0]));
      this.placeTrap(new Trap({ x: 5, y: 26 }, TrapType.Tricky, this.entities[0]));
      this.placeTrap(new Trap({ x: 4, y: 27 }, TrapType.Sickrat, this.entities[0]));
      this.placeTrap(new Trap({ x: 5, y: 30 }, TrapType.Repelling, this.entities[0]));
      this.placeTrap(new Trap({ x: 6, y: 27 }, TrapType.Tricky, this.entities[0]));
      this.placeTrap(new Trap({ x: 6, y: 28 }, TrapType.Sickrat, this.entities[0]));
      this.placeTrap(new Trap({ x: 8, y: 28 }, TrapType.Tricky, this.entities[0]));
      this.placeTrap(new Trap({ x: 7, y: 29 }, TrapType.Sickrat, this.entities[0]));
      this.setStartPoint({ x: 3, y: 29 });
    }
  }

  /**
   * Sets the start point of the network.
   * 
   * @param {Coordinates} point The start point
   */
  setStartPoint(point: Coordinates) {
    this.startPoint = point;
  }

  /**
   * Runs the trap network.
   */
  run() {
    this.savedActionStack = [];
    this.triggerTraps(this.startPoint);
    this.remainingSteps = -1;
    this.triggerStack();
  }

  /**
   * Runs the trap network.
   */
  runOne() {
    this.remainingSteps = 1;
    if (this.actionStack.length === 0) {
      this.savedActionStack = [];
      this.triggerTraps(this.startPoint);
    }
    this.triggerStack();
  }

  pause() {
    this.remainingSteps = 0;
  }

  /**
   * Forces the map component to update its values and children.
   */
  refreshMap() {
    this.mapComponent?.forceUpdate();
  }

  /**
   * Forces the history component to update its values and children.
   */
  refreshHistory() {
    this.historyComponent?.forceUpdate();
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
          this.refreshMap();
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
   * Returns the trap at the given coordinates.
   * 
   * @param {Coordinates} pos Coordinates of the cell to check
   * @returns {Trap} The trap, or undefined if there is none
   */
  getTrap(pos: Coordinates): Trap {
    for (let i: number = 0; i < this.traps.length; i++) {
      if (this.traps[i].pos.x === pos.x && this.traps[i].pos.y === pos.y)
        return this.traps[i];
    }
    return undefined;
  }

  /**
   * Removes one entity at the given coordinates.
   * 
   * @param {Coordinates} pos Coordinates of the entity to remove
   */
  removeEntity(pos: Coordinates) {
    for (let i: number = 0; i < this.entities.length; i++) {
      if (this.entities[i].pos.x === pos.x && this.entities[i].pos.y === pos.y) {
        this.entities.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Removes one trap at the given coordinates.
   * 
   * @param {Coordinates} pos Coordinates of the trap to remove
   */
  removeTrap(pos: Coordinates) {
    for (let i: number = 0; i < this.traps.length; i++) {
      if (this.traps[i].pos.x === pos.x && this.traps[i].pos.y === pos.y) {
        this.traps.splice(i, 1);
        break;
      }
    }
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
  triggerTraps(pos: Coordinates): boolean {
    let triggered: Array<number> = [];
    for (let i: number = 0; i < this.traps.length; i++) {
      if (this.traps[i].isInTrap(pos)) {
        let localStack: Array<Action> = [];
        for (let j: number = 0; j < this.traps[i].effects.length; j++) {
          let entities: Array<Entity> = this.getEntitiesInArea(this.traps[i].pos, this.traps[i].effects[j].area, this.traps[i].effects[j].size);
          if (this.traps[i].effects[j].type === EffectType.Push) { // anticlockwise for Push effects
            entities = entities.reverse();
          }
          const value = randomInt(this.traps[i].effects[j].min, this.traps[i].effects[j].max);
          for (let k: number = 0; k < entities.length; k++) {
            localStack.unshift(new Action(this.traps[i].caster, entities[k], this.traps[i].pos, entities[k].pos, this.traps[i].effects[j].type, value, this.traps[i]));
          }
        }
        this.addToActionStack(...localStack);
        triggered.push(i);
      }
    }
    for (let i: number = triggered.length - 1; i >= 0; i--) {
      this.traps[triggered[i]].disable();
    }
    return (triggered.length > 0);
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
   * 
   * This function uses this.remainingSteps = number of actions to trigger. -1 = no limit
   */
  triggerStack() {
    while (this.waitingAnim || (this.remainingSteps-- !== 0 && (this.currentAction = this.actionStack.pop()))) {
      this.refreshHistory();
      if (!this.waitingAnim) {
        this.actionGenerator = this.currentAction.apply();
      }
      const next = this.actionGenerator.next();
      if (!next.done && next.value) {
        this.waitingAnim = true;
        next.value.component.move(next.value.pos, next.value.animPos);
        return;
      } else {
        this.completedActionStack.push(this.currentAction);
        this.currentAction = undefined;
        this.waitingAnim = false;
      }
    }
    this.refreshMap();
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

  /**
   * Returns all actions in an object.
   * 
   * @returns Object containing all actions: completed, current and waiting
   */
  getActionStack(): { waiting: Array<Action>, completed: Array<Action>, current: Action } {
    if (this.savedActionStack.length > 0) {
      return {
        waiting: [],
        completed: this.savedActionStack,
        current: undefined
      };
    }
    return {
      waiting: this.actionStack,
      completed: this.completedActionStack,
      current: this.currentAction
    };
  }

  /**
   * Reset all traps and entities to their original position,
   * save the completed action stack and reset some properties.
   */
  resetAll() {
    for (let i: number = 0; i < this.entities.length; i++) {
      this.entities[i].reset();
    }

    for (let i: number = 0; i < this.traps.length; i++) {
      this.traps[i].enable();
    }

    this.savedActionStack = this.completedActionStack;
    this.completedActionStack = [];
    this.actionStack = [];
    this.currentAction = undefined;
    this.waitingAnim = false;

    this.refreshMap();
  }

  /**
   * Returns all actions corresponding to the given trap.
   * 
   * @param {Trap} trap
   * @returns {Array<Action>} All the actions of the trap
   */
  getActionsFromTrap(trap: Trap): Array<Action> {
    const actions: Array<Action> = [];
    for (let i: number = 0; i < this.savedActionStack.length; i++) {
      if (this.savedActionStack[i].originTrap.uuid === trap.uuid) {
        actions.push(this.savedActionStack[i]);
      }
    }
    for (let i: number = 0; i < this.actionStack.length; i++) {
      if (this.actionStack[i].originTrap.uuid === trap.uuid) {
        actions.push(this.actionStack[i]);
      }
    }
    for (let i: number = 0; i < this.completedActionStack.length; i++) {
      if (this.completedActionStack[i].originTrap.uuid === trap.uuid) {
        actions.push(this.completedActionStack[i]);
      }
    }
    if (this.currentAction?.originTrap.uuid === trap.uuid) {
      actions.push(this.currentAction);
    }
    return actions;
  }

  /**
   * Function triggered when an entity stops moving.
   */
  onEntityTransitionEnd() {
    this.triggerStack();
  }

  /**
   * Selects a spell.
   * 
   * @param {Spell} spell Spell to select
   */
  selectSpell(spell: Spell) {
    this.selectedSpell = spell;
  }

  onCellClick(pos: Coordinates) {
    if (this.selectedSpell?.effect?.trap !== undefined) {
      if (this.getTrap(pos) === undefined)
        this.placeTrap(new Trap(pos, this.selectedSpell.effect.trap, this.entities[0]));
    }
    if (this.selectedSpell?.effect?.entity !== undefined) {
      if (this.getEntity(pos) === undefined)
        this.placeEntity(new Entity(pos, Team.Defender,this.selectedSpell.effect.entity))
    }
    if (this.selectedSpell?.effect?.action !== undefined) {
      this.runActionSpell(pos, this.selectedSpell.effect.action);
    }
    this.refreshMap();
  }

  runActionSpell(pos: Coordinates, actionName: ActionName) {
    switch (actionName) {
      case ActionName.Remove:
        if (this.getEntity(pos)) {
          this.removeEntity(pos);
        } else if (this.getTrap(pos)) {
          this.removeTrap(pos);
        }
        break;
      case ActionName.Select:
        this.setStartPoint(pos);
        break;
      default:
        break;
    }
  }
}

export default new Game("empty");