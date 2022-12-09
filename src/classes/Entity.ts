import { Coordinates, EntityData, EntityName, Team } from "@src/enums";
import Entities from "@json/Entities.json";
import EntityComponent from "@components/EntityComponent";
import { v4 as uuidv4 } from "uuid";

class Entity {
  uuid: string;
  pos: Coordinates;
  initialPos: Coordinates;
  team: Team;
  data: EntityData;
  animPos: Coordinates;
  component: EntityComponent;

  static entityData: Map<EntityName, EntityData> = new Map(Object.entries(Entities) as Array<[EntityName, EntityData]>);

  constructor(pos: Coordinates, team: Team, name: EntityName) {
    this.uuid = uuidv4();
    this.pos = pos;
    this.initialPos = pos;
    this.team = team;
    this.data = Entity.getEntityData(name);
    this.animPos = undefined;
  }

  /**
   * Returns an Entity object with data from Entities.json.
   * 
   * @param {EntityName} name Name of the entity
   * @returns {Entity} An Entity object
   */
  static getEntityData(name: EntityName): EntityData {
    return Entity.entityData.get(name);
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
}

export default Entity;