import { EntityData, EntityName, Team } from "@src/enums";
import Entities from "@json/Entities.json";

class Entity {
  x: number;
  y: number;
  team: Team;
  data: EntityData;

  static entityData: Map<EntityName, EntityData> = new Map(Object.entries(Entities) as Array<[EntityName, EntityData]>);

  constructor(x: number, y: number, team: Team, name: EntityName) {
    this.x = x;
    this.y = y;
    this.team = team;
    this.data = Entity.getEntityData(name);
  }

  static getEntityData(name: EntityName): EntityData {
    return Entity.entityData.get(name);
  }
}

export default Entity;