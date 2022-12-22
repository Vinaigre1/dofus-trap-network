import { Coordinates, EntityType, State, Team } from "@src/enums";
import Entities from "@json/Entities";
import EntityComponent from "@components/EntityComponent";
import { v4 as uuidv4 } from "uuid";
import { EntityData } from "@src/@types/EntityDataType";

class Entity {
  uuid: string;
  pos: Coordinates;
  initialPos: Coordinates;
  team: Team;
  data: EntityData;
  animPos: Coordinates;
  component: EntityComponent;
  states: State;

  constructor(pos: Coordinates, team: Team, type: EntityType) {
    this.uuid = uuidv4();
    this.pos = pos;
    this.initialPos = pos;
    this.team = team;
    this.data = Entities[type];
    this.animPos = undefined;
    this.states = 0;
  }

  /**
   * Returns true if the entity is movable.
   * 
   * @returns {boolean} true if the entity is movable
   */
  isMovable(): boolean {
    return this.data.movable;
  }

  /**
   * Resets the entity values.
   */
  reset() {
    this.pos = this.initialPos;
    this.component?.show();
    return true;
  }

  /**
   * Removes a state from the entity
   * 
   * @param {State} state State to remove
   */
  removeState(state: State) {
    this.states &= ~state;
  }

  /**
   * Adds a state to the entity
   * 
   * @param {State} state State to add
   */
  addState(state: State) {
    this.states |= state;
  }

  /**
   * Checks if the entity has a given state
   * 
   * @param {State} state State to check
   * @returns {boolean} If the entity has the given state
   */
  hasState(state: State): boolean {
    return !!(this.states & state);
  }

  /**
   * Executed when the entity receive direct damage
   */
  onDamage() {
    alert('test');
  }
}

export default Entity;