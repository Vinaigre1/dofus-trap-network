import Game from "@classes/Game";
import Trap from "@classes/Trap";
import { CellType, TrapClasses } from "@src/enums";
import * as React from "react";
import TrapCellComponent from "./TrapCellComponent";

type Props = {
  trap: Trap;
  setHighlight: Function;
};

type States = {
  display: boolean;
};

class TrapComponent extends React.Component<Props, States>
{
  constructor(props) {
    super(props);

    this.state = {
      display: true
    };
  }

  /**
   * Shows the trap component.
   */
  show() {
    this.setState((state) => {
      return { ...state, display: true }
    });
  }

  /**
   * Hides the trap component.
   */
  hide() {
    this.setState((state) => {
      return { ...state, display: false }
    });
  }

  /**
   * Set the highlight value of the trap component.
   */
  setHighlight(highlight: boolean) {
    this.props.setHighlight(this.props.trap.uuid, highlight);
  }

  render() {
    if (!this.state.display) return;

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
        key={j}
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
