import Cell from "@classes/Cell";
import Entity from "@classes/Entity";
import Trap from "@classes/Trap";

import Consts from "@json/Consts.json";
import { CellType } from "@src/enums";

class Game {
  map: Array<Array<Cell>>;
  entities: Array<Entity>;
  traps: Array<Trap>;

  width: number;
  height: number;

  constructor(mapName: string) {
    this.width = Consts.mapWidth;
    this.height = Consts.mapHeight;

    this.loadMap(mapName);
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
          console.log(this.map);
          window.mapComponent.forceUpdate();
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

export default new Game("bouftouroyal");