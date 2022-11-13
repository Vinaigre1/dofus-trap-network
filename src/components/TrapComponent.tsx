import Game from "@classes/Game";
import Trap from "@classes/Trap";
import { CellType, TrapClasses } from "@src/enums";
import * as React from "react";
import TrapCellComponent from "./TrapCellComponent";

type Props = {
  trap: Trap;
  hide: Function
  entityId: number;
};

class TrapComponent extends React.Component<Props>
{
  /**
   * Hides the trap component.
   */
  hide() {
    this.props.hide(this.props.entityId);
  }

  render() {
    let cells: Array<JSX.Element> = [];
    let cellWidth: number = 100 / (Game.width + 0.5);
    let cellHeight: number = cellWidth / 2;

    const trapCells = this.props.trap.getTrapCells();
    for (let j: number = 0; j < trapCells.length; j++) {
      if (Game.getCell(trapCells[j].pos)?.type !== CellType.Ground) continue;

      trapCells[j].borders |= Game.getCellBorders(trapCells[j].pos);
      cells.push(<TrapCellComponent
        x={trapCells[j].pos.x}
        y={trapCells[j].pos.y}
        id={trapCells[j].pos.y * Game.width + trapCells[j].pos.x}
        width={cellWidth}
        height={cellHeight}
        type={trapCells[j].type}
        borders={trapCells[j].borders}
      />);
    }
    return (
      <g className={`trap ${TrapClasses[this.props.trap.type]}`}>
        {cells}
      </g>
    );
  }
}

export default TrapComponent;
