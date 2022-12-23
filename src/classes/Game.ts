import Cell from "@classes/Cell";
import Entity from "@classes/Entity";
import Trap from "@classes/Trap";
import Action from "@classes/Action";
import Consts from "@json/Consts.json";
import { Area, AreaType, CellBorders, CellType, Coordinates, Direction, EffectType, EntityType, Team } from "@src/enums";
import { clockwise, isInArea, moveInDirection } from "@src/utils/mapUtils";
import TrapCell from "@classes/TrapCell";
import { randomInt } from "@src/utils/utils";
import MapComponent from "@components/MapComponent";
import HistoryComponent from "@components/HistoryComponent";
import { Effect, Spell, SpellLevel } from "@src/@types/SpellDataType";
import SpellsComponent from "@components/SpellsComponent";
import SpellData from "@json/Spells";

class Game {
  map: Array<Array<Cell>>;
  mapLoaded: boolean;
  mapComponent: MapComponent;
  historyComponent: HistoryComponent;
  spellsComponent: SpellsComponent;
  preparingEffects: Array<EffectType>;
  mainCharacter: Entity;

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
  isRunning: boolean;

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
    this.isRunning = false;
    this.preparingEffects = [
      EffectType.PlaceTrap,
      EffectType.CreateEntity,
      EffectType.StartPoint,
      EffectType.Remove
    ];
    this.mainCharacter = new Entity({ x: 0, y: 0 }, Team.Attacker, EntityType.Player);

    this.loadMap(mapName);
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
    if (!this.startPoint) {
      this.spellsComponent.setPlay(false);
      return;
    }

    this.isRunning = true;
    this.savedActionStack = [];
    this.triggerTraps(this.startPoint);
    this.remainingSteps = -1;
    this.triggerStack();
  }

  /**
   * Runs the trap network.
   */
  runOne() {
    if (!this.startPoint) {
      this.spellsComponent.setPlay(false);
      return;
    }

    this.isRunning = true;
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
    const cells: Array<TrapCell> = [];

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
    const fileURL: string = `./assets/maps/${name}.json`;
    fetch(fileURL)
      .then(res => res.json())
      .then(
        (res) => {
          this.prepareNewMap();
          const map = res.Data[0].Cells;
          this.map = new Array<Array<Cell>>(map[0].length);
          for (let i = 0; i < map[0].length; i++) {
            this.map[i] = new Array<Cell>(map.length);
            for (let j = 0; j < map.length; j++) {
              this.map[i][j] = new Cell(map[j][i], { x: i, y: j});
            }
          }
          this.refreshMap();
          this.refreshHistory();
          this.mapLoaded = true;
        },
        (error) => {
          console.error(error);
        }
      )
    ;
  }

  /**
   * Resets all properties related to the map
   */
  prepareNewMap(refresh: boolean = false) {
    this.traps = [];
    this.entities = [];
    this.actionStack = [];
    this.currentAction = undefined;
    this.completedActionStack = [];
    this.savedActionStack = [];
    this.startPoint = undefined;
    this.waitingAnim = false;
    this.remainingSteps = -1;
    this.mapLoaded = false;

    if (refresh) {
      this.refreshMap();
      this.refreshHistory();
    }
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
   * @param {Area} area The area
   * @returns {Array<Entity>} List of entities in the given area
   */
  getEntitiesInArea(pos: Coordinates, area: Area): Array<Entity> {
    const entities: Array<Entity> = [];
    const clock = clockwise(pos);

    // maxCells = Number of cells in a circle twice the size of the area // Small hack to avoid checking the entire map
    // Todo: increase efficiency of this function ?
    const timesTwo: boolean = [AreaType.Diagonal, AreaType.Square, AreaType.Star].includes(area.type);
    const maxCells: number = ((area.max * (timesTwo ? 2 : 1)) * ((area.max * (timesTwo ? 2 : 1)) + 1)) * 2 + 1;

    for (let i: number = 0; i < maxCells; i++) {
      const clockPos: Coordinates = clock.next().value;
      if (isInArea(clockPos, area, pos)) {
        const entity: Entity = this.getEntity(clockPos);
        if (entity)
          entities.push(entity);
      }
    }
    return entities;
  }

  /**
   * Triggers all traps at the given coordinates and executes their spells.
   * 
   * @param {Coordinates} pos Coordinates of the cell where traps are triggered
   * @returns {boolean} Returns true if one or more traps has been triggered
   */
  triggerTraps(pos: Coordinates): boolean {
    const triggered: Array<number> = [];
    for (let i: number = 0; i < this.traps.length; i++) {
      if (this.traps[i].isInTrap(pos)) {
        this.executeSpell(SpellData[this.traps[i].spellId].levels[this.traps[i].spellLevel], this.traps[i].pos, this.traps[i].caster, this.traps[i]);
        triggered.push(i);
      }
    }
    for (let i: number = triggered.length - 1; i >= 0; i--) {
      this.traps[triggered[i]].disable();
    }
    return (triggered.length > 0);
  }

  /**
   * Execute a spell at a given coordinates and adds new actions to the action stack.
   * 
   * @param {SpellLevel} spell Spell to execute
   * @param {Coordinates} pos Coordinates of the spell
   * @param {Entity} caster Caster entity
   * @param {Trap} originTrap Trap triggering the effect
   */
  executeSpell(spell: SpellLevel, pos: Coordinates, caster: Entity, originTrap: Trap) {
    const localStack: Array<Action> = [];
    const effects = spell.effects;
    for (let i: number = 0; i < effects.length; i++) {
      let entities: Array<Entity> = this.getEntitiesInArea(pos, effects[i].area);
      if (effects[i].effectType === EffectType.Push) { // anticlockwise for Push effects
        entities = entities.reverse();
      }
      const value = randomInt(effects[i].min, effects[i].max);
      for (let j: number = 0; j < entities.length; j++) {
        localStack.unshift(new Action(caster, entities[j], pos, entities[j].pos, effects[i].effectType, value, effects[i], originTrap, effects[i].targetMask));
      }
    }
    this.addToActionStack(...localStack);
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
    this.spellsComponent.setPlay(false);
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
    this.isRunning = false;

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
    if (this.selectedSpell === undefined || this.isRunning) return;
    // TODO: get spell level

    const effects = this.selectedSpell?.levels[0].effects;
    this.applyPreparingEffects(effects, pos);

    this.refreshMap();
  }

  applyPreparingEffects(effects: Array<Effect>, pos: Coordinates) {
    for (let i: number = 0; i < effects.length; i++) {
      if (!this.preparingEffects.includes(effects[i].effectType)) continue;

      const action = new Action(this.mainCharacter, null, this.mainCharacter.pos, pos, effects[i].effectType, 0, effects[i]);
      const gen = action.apply(false);
      const ret = gen.next();
      if (!ret.done) {
        console.error('Preparing effect is yielding but should not.');
      }
    }
  }
}

export default new Game("0");