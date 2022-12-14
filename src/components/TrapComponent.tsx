import Game from "@classes/Game";
import Trap from "@classes/Trap";
import { CellType, TrapClasses } from "@src/enums";
import { colorToInt } from "@src/utils/utils";
import * as React from "react";
import TrapCellComponent from "./TrapCellComponent";

type Props = {
  trap: Trap;
  setHighlight: (uuid: string, highlight: boolean) => void;
  highlight: boolean;
};

type States = {
  display: boolean;
};

class TrapComponent extends React.Component<Props, States>
{
  constructor(props: Props) {
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
    this.props.trap.imgComponent.style.display = "";
  }

  /**
   * Hides the trap component.
   */
  hide() {
    this.setState((state) => {
      return { ...state, display: false }
    });
    this.props.trap.imgComponent.style.display = "none";
  }

  /**
   * Set the highlight value of the trap component.
   */
  setHighlight(highlight: boolean) {
    const actions = Game.getActionsFromTrap(this.props.trap);
    actions.forEach(action => {
      action.component?.setHighlight(highlight);
    });
    this.props.setHighlight(this.props.trap.uuid, highlight);
  }

  render() {
    const cells: Array<JSX.Element> = [];
    const cellWidth: number = 100 / (Game.width + 0.5);
    const cellHeight: number = cellWidth / 2;

    const trapCells = this.props.trap.getTrapCells(this.props.highlight);
    for (let j: number = 0; j < trapCells.length; j++) {
      const center: boolean = trapCells[j].pos.x === this.props.trap.pos.x && trapCells[j].pos.y === this.props.trap.pos.y;
      if (!this.state.display && !center) continue;
      if (Game.getCell(trapCells[j].pos)?.type !== CellType.Ground) continue;

      trapCells[j].borders |= Game.getCellBorders(trapCells[j].pos);
      cells.push(<TrapCellComponent
        x={trapCells[j].pos.x}
        y={trapCells[j].pos.y}
        id={trapCells[j].pos.y * Game.width + trapCells[j].pos.x}
        center={center}
        setHighlight={(highlight: boolean) => { this.setHighlight(highlight); }}
        width={cellWidth}
        height={cellHeight}
        type={TrapClasses[colorToInt(trapCells[j].color)]}
        borders={trapCells[j].borders}
        key={j}
      />);
    }
    return (
      <g className={`trap trap-${TrapClasses[colorToInt(this.props.trap.color)]}`}>
        {cells}
      </g>
    );
  }
}

export default TrapComponent;
