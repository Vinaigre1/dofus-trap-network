import { Coordinates, EntityData, EntityName, Team } from "@src/enums";
import Entities from "@json/Entities.json";

class Entity {
  pos: Coordinates;
  team: Team;
  data: EntityData;

  static entityData: Map<EntityName, EntityData> = new Map(Object.entries(Entities) as Array<[EntityName, EntityData]>);

  constructor(pos: Coordinates, team: Team, name: EntityName) {
    this.pos = pos;
    this.team = team;
    this.data = Entity.getEntityData(name);
  }

  static getEntityData(name: EntityName): EntityData {
    return Entity.entityData.get(name);
  }
}

export default Entity;