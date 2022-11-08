import Cell from "@classes/Cell";
import Game from "@classes/Game";
import { CellType } from "@src/enums";
import * as React from "react";
import "./../assets/scss/Map.scss";
import CellComponent from "./CellComponent";
import EntityComponent from "./EntityComponent";
import EntityLayerComponent from "./EntityLayerComponent";

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
    let rows: Array<JSX.Element> = [];
    let walls: Array<Cell> = [];
    let cellWidth: number = 100 / (this.props.cellNum + 0.5);
    let cellHeight: number = cellWidth / 2;

    for (let i: number = 0; i < this.props.rowNum; i++) {
      let cells: Array<JSX.Element> = [];
      for (let j: number = 0; j < this.props.cellNum; j++) {
        let cell: Cell = Game.getCell(j, i);
        if (cell.type === CellType.Wall) {
          walls.push(cell);
        } else {
          cells.push(<CellComponent y={i} x={j} id={i * this.props.cellNum + j} width={cellWidth} height={cellHeight} />);
        }
      }
      rows.push(<g className={`row ${i % 2 === 0 ? "even" : "odd"}`}>{cells}</g>);
    }
    walls.sort((a, b) => a.y - b.y);

    let entities = [];
    entities.push(...walls);
    // TODO: add entities to "entities" array, with all elements sorted by "y"

    let w: number = this.props.cellNum * 2 + (this.props.rowNum > 1 ? 1 : 0);
    let h: number = (this.props.rowNum + 1) / 2;
    let height: number = h / w * 100;
    return (
      <div className="map">
        <svg className="tiles" viewBox={`0 0 100 ${height}`}>{rows}</svg>
        <svg className="entities" viewBox={`0 0 100 ${height}`}>
          <EntityLayerComponent entities={entities} />
        </svg>
      </div>
    );
  }
}

export default MapComponent;
