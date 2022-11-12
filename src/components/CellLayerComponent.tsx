import Game from "@classes/Game";
import Trap from "@classes/Trap";
import * as React from "react";
import TrapComponent from "@components/TrapComponent";
import { Coordinates, TrapClasses } from "@src/enums";

type Props = {
  rows: Array<JSX.Element>;
  traps: Array<Trap>;
};

type States = {
  hiddenElements: Array<number>;
};

class CellLayerComponent extends React.Component<Props, States>
{
  constructor(props: Props) {
    super(props);

    this.state = {
      hiddenElements: []
    };
  }

  hideElement(entityId: number) {
    this.setState((state) => {
      return { hiddenElements: [ ...state.hiddenElements, entityId ] };
    });
  }

  render() {
    const traps: Array<JSX.Element> = [];
    const trapImages: Array<JSX.Element> = [];

    const cellWidth: number = 100 / (Game.width + 0.5);
    const celHeight: number = cellWidth / 2;

    for (let i: number = this.props.traps.length - 1; i >= 0; i--) {
      const trap = this.props.traps[i];
      if (!this.state.hiddenElements.includes(i)) {
        traps.push(<TrapComponent
          trap={trap}
          ref={(component) => { trap.component = component }} 
          entityId={i}
          hide={(entityId: number) => { this.hideElement(entityId) }}
        />);

        const root: Coordinates = {
          x: trap.pos.x * cellWidth + (trap.pos.y % 2 === 0 ? 0 : cellWidth / 2),
          y: trap.pos.y * (celHeight / 2)
        };
        trapImages.push(<image
          className={`trap-image ${TrapClasses[trap.type]}`}
          href={trap.image}
          x={root.x + cellWidth * 0.15}
          y={root.y + celHeight * 0.15}
          width={cellWidth * 0.7}
          height={celHeight * 0.7}
        />);
      }
    }

    return [
      <g className="ground">
        {this.props.rows}
      </g>,
      <g className="traps">
        {traps}
        <g className="trap-images">
          {trapImages}
        </g>
      </g>
    ];
  }
}

export default CellLayerComponent;
