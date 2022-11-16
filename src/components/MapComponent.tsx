import Cell from "@classes/Cell";
import Entity from "@classes/Entity";
import Game from "@classes/Game";
import Trap from "@classes/Trap";
import { CellType } from "@src/enums";
import * as React from "react";
import "@assets/scss/Map.scss";
import CellComponent from "@components/CellComponent";
import EntityLayerComponent from "@components/EntityLayerComponent";
import CellLayerComponent from "@components/CellLayerComponent";

type Props = {
  cellNum: number;
  rowNum: number;
};

class MapComponent extends React.Component<Props>
{
  constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  render() {
    const rows: Array<JSX.Element> = [];
    const traps: Array<Trap> = [];
    const walls: Array<Cell | Entity> = [];

    const cellWidth: number = 100 / (this.props.cellNum + 0.5);
    const cellHeight: number = cellWidth / 2;

    for (let i: number = 0; i < this.props.rowNum; i++) {
      const cells: Array<JSX.Element> = [];
      for (let j: number = 0; j < this.props.cellNum; j++) {
        const cell: Cell = Game.getCell({ x: j, y: i });
        if (cell?.type === CellType.Wall) {
          walls.push(cell);
        } else {
          cells.push(<CellComponent key={`cell-${i * this.props.cellNum + j}`} y={i} x={j} id={i * this.props.cellNum + j} width={cellWidth} height={cellHeight} />);
        }
      }
      rows.push(<g className={`row ${i % 2 === 0 ? "even" : "odd"}`} key={`row-${i}`}>{cells}</g>);
    }

    traps.push(...Game.traps);

    const entities = Array<Cell | Entity>();
    entities.push(...walls);
    entities.push(...Game.entities);
    entities.sort((a, b) => a.pos.y - b.pos.y);

    const w: number = this.props.cellNum * 2 + (this.props.rowNum > 1 ? 1 : 0);
    const h: number = (this.props.rowNum + 1) / 2;
    const height: number = h / w * 100;
    return (
      <div className="relative-height-source map">
        <svg className="tiles" viewBox={`0 0 100 ${height}`}>
          <CellLayerComponent rows={rows} traps={traps} />
        </svg>
        <svg className="entities" viewBox={`0 0 100 ${height}`}>
          <EntityLayerComponent entities={entities} startPoint={Game.startPoint} />
        </svg>
      </div>
    );
  }
}

export default MapComponent;
