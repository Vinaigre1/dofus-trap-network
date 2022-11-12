import { Coordinates, Direction, EffectType, EntityData, EntityName, Team } from "@src/enums";
import Entities from "@json/Entities.json";
import EntityComponent from "@components/EntityComponent";
import { v4 as uuidv4 } from "uuid";

class Entity {
  uuid: string;
  pos: Coordinates;
  team: Team;
  data: EntityData;
  animPos: Coordinates;
  component: EntityComponent;

  static entityData: Map<EntityName, EntityData> = new Map(Object.entries(Entities) as Array<[EntityName, EntityData]>);

  constructor(pos: Coordinates, team: Team, name: EntityName) {
    this.uuid = uuidv4();
    this.pos = pos;
    this.team = team;
    this.data = Entity.getEntityData(name);
    this.animPos = undefined;
  }

  static getEntityData(name: EntityName): EntityData {
    return Entity.entityData.get(name);
  }

  isMovable(): boolean {
    return true;
  }
}

export default Entity;