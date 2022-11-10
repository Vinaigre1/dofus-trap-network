import Cell from "@classes/Cell";
import Entity from "@classes/Entity";
import Trap from "@classes/Trap";

import Consts from "@json/Consts.json";
import { CellBorders, CellType, EntityName, Team, TrapType } from "@src/enums";
import TrapCell from "./TrapCell";

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
    this.traps = [];

    this.loadMap(mapName);

    if (true) { // Debug
      // @ts-ignore
      window.Game = this;
      this.placeEntity(new Entity({ x: 11, y: 20 }, Team.Attacker, EntityName.Cawwot));
      this.placeEntity(new Entity({ x: 8, y: 20 }, Team.Defender, EntityName.Poutch));
      this.placeTrap(new Trap({ x: 4, y: 4 }, TrapType.Paralysing));
    }
  }

  static refreshAll() {
    window.mapComponent.forceUpdate();
  }

  getAllTrapCells(): Array<TrapCell> {
    let cells: Array<TrapCell> = [];

    for (let i = 0; i < this.traps.length; i++) {
      cells.push(...this.traps[i].getTrapCells());
    }

    return cells;
  }

  placeEntity(entity: Entity) {
    this.entities.push(entity);
  }

  placeTrap(trap: Trap) {
    this.traps.push(trap);
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
              this.map[i][j] = new Cell(map[j][i], { x: i, y: j});
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
    return this.map && this.map[x] && this.map[x][y] || new Cell(CellType.Empty, { x, y });
  }
}

export default new Game("empty");