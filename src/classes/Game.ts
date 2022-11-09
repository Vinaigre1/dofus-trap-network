import Cell from "@classes/Cell";
import Entity from "@classes/Entity";
import Trap from "@classes/Trap";

import Consts from "@json/Consts.json";
import { CellType, EntityName, Team } from "@src/enums";

class Game {
  map: Array<Array<Cell>>;
  entities: Array<Entity>;
  traps: Array<Trap>;

  width: number;
  height: number;

  constructor(mapName: string) {
    this.width = Consts.mapWidth;
    this.height = Consts.mapHeight;
    this.entities = [];

    this.loadMap(mapName);
    this.placeEntity(new Entity(11, 20, Team.Attacker, EntityName.Cawwot));
    this.placeEntity(new Entity(8, 20, Team.Defender, EntityName.Poutch));
    if (true) { // Debug
      // @ts-ignore
      window.Game = this;
    }
  }

  static refreshAll() {
    window.mapComponent.forceUpdate();
  }

  placeEntity(entity: Entity) {
    this.entities.push(entity);
  }

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
              this.map[i][j] = new Cell(map[j][i], i, j);
            }
          }
          Game.refreshAll();
        },
        (error) => {
          console.error(error);
        }
      )
    ;
  }

  getCell(x: number, y: number): Cell {
    return this.map && this.map[x] && this.map[x][y] || new Cell(CellType.Empty, x, y);
  }
}

export default new Game("solar");