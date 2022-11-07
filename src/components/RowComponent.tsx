import * as React from "react";
import CellComponent from "./CellComponent";

type Props = {
  y: number;
  cellNum: number;
};

class RowComponent extends React.Component<Props>
{
  render() {
    let cells = [];
    let cellWidth = 100 / (this.props.cellNum + 0.5);
    let cellHeight = cellWidth / 2;
    for (let i = 0; i < this.props.cellNum; i++) {
      cells.push(<CellComponent
        width={cellWidth}
        height={cellHeight}
        x={i}
        y={this.props.y}
        id={this.props.y * this.props.cellNum + i}
      />);
    }
    return <g className={`row ${this.props.y % 2 === 0 ? "even" : "odd"}`}>{cells}</g>;
  }
}

export default RowComponent;
