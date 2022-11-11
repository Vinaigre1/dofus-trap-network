import Cell from "@classes/Cell";
import Entity from "@classes/Entity";
import Trap from "@classes/Trap";

import Consts from "@json/Consts.json";
import { CellBorders, CellType, Coordinates, Direction, EntityName, Team, TrapType } from "@src/enums";
import { moveInDirection } from "@src/utils/mapUtils";
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
      this.placeTrap(new Trap({ x: 6, y: 8 }, TrapType.Paralysing));
      this.placeTrap(new Trap({ x: 8, y: 12 }, TrapType.Drift));
      this.placeTrap(new Trap({ x: 3, y: 21 }, TrapType.Tricky));
    }
  }

  static refreshAll() {
    window.mapComponent.forceUpdate();
  }

  getAllTrapCells(): Array<TrapCell> {
    let cells: Array<TrapCell> = [];

    for (let i: number = 0; i < this.traps.length; i++) {
      const trapCells = this.traps[i].getTrapCells();
      for (let j: number = 0; j < trapCells.length; j++) {
        if (this.map?.[trapCells[j].pos.x]?.[trapCells[j].pos.y].type === CellType.Ground) {
          trapCells[j].borders |= this.getCellBorders(trapCells[j].pos);
          cells.push(trapCells[j]);
        }
      }
    }

    return cells;
  }

  placeEntity(entity: Entity) {
    this.entities.push(entity);
  }

  placeTrap(trap: Trap) {
    this.traps.push(trap);
  }

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
      if (this.map[moved.x][moved.y].type !== CellType.Ground) {
        borders |= dirToBorder[dir];
      }
    }

    return borders;
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
    return this.map?.[x]?.[y] || new Cell(CellType.Empty, { x, y });
  }
}

export default new Game("solar");