import Cell from "@classes/Cell";
import Entity from "@classes/Entity";
import Trap from "@classes/Trap";

import * as Consts from "@json/Consts.json";

class Game {
  map: Array<Array<Cell>>;
  entities: Array<Entity>;
  traps: Array<Trap>;

  width: number;
  height: number;

  constructor() {
    this.width = Consts.mapWidth;
    this.height = Consts.mapHeight;
  }

  async loadMap(name: string) {
    const filename: string = `@assets/maps/${name}.json`;
    const file = await require(filename);
    console.log(file);
  }
}

export default Game;