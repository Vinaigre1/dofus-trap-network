import Game from "@classes/Game";
import Trap from "@classes/Trap";
import * as React from "react";
import TrapComponent from "@components/TrapComponent";
import { Coordinates, TrapClasses } from "@src/enums";
import { colorToInt } from "@src/utils/utils";
import SpellData from "@json/Spells";

type Props = {
  rows: Array<JSX.Element>;
  traps: Array<Trap>;
};

type States = {
  highlighted: Array<string>;
};

class CellLayerComponent extends React.Component<Props, States>
{
  constructor(props: Props) {
    super(props);

    this.state = {
      highlighted: []
    };
  }

  setHighlight(uuid: string, highlight: boolean) {
    this.setState((state) => {
      const copy: Array<string> = state.highlighted;
      if (highlight) {
        copy.push(uuid);
      } else {
        let index = 0;
        while ((index = copy.indexOf(uuid)) !== -1) {
          copy.splice(index, 1);
        }
      }
      return { ...state, highlighted: copy };
    });
  }

  render() {
    const traps: Array<JSX.Element> = [];
    const trapImages: Array<JSX.Element> = [];
    const highlightedTraps: Array<JSX.Element> = [];
    const highlightedImages: Array<JSX.Element> = [];

    const cellWidth: number = 100 / (Game.width + 0.5);
    const celHeight: number = cellWidth / 2;

    for (let i: number = this.props.traps.length - 1; i >= 0; i--) {
      const trap: Trap = this.props.traps[i];
      const sizeCoef: number = 0.7 * SpellData[trap.spellId].sfxSize;

      const root: Coordinates = {
        x: trap.pos.x * cellWidth + (trap.pos.y % 2 === 0 ? 0 : cellWidth / 2),
        y: trap.pos.y * (celHeight / 2)
      };

      traps.push(<TrapComponent
        trap={trap}
        ref={(component) => { trap.component = component; }} 
        setHighlight={(uuid: string, highlight: boolean) => { this.setHighlight(uuid, highlight); }}
        highlight={false}
        key={'trap-' + trap.uuid}
      />);

      if (!this.state.highlighted.includes(this.props.traps[i].uuid)) {
        trapImages.push(<><image
            className={`trap-image ${TrapClasses[colorToInt(trap.color)]}`}
            href={SpellData[trap.spellId].sfx}
            x={root.x + cellWidth * ((1 - sizeCoef) / 2)}
            y={root.y + celHeight * ((1 - sizeCoef) / 2)}
            width={cellWidth * sizeCoef}
            height={celHeight * sizeCoef}
            key={trap.uuid}
            ref={(component) => { trap.imgComponent = component; } }
            style={{ display: this.props.traps[i].active ? "" : "none" }} />
            {Game.options.order ? <text className='trap-text' x={root.x} y={root.y}>{this.props.traps.length - i}</text> : undefined}
          </>
        );
      } else {
        highlightedTraps.push(<TrapComponent
          trap={trap}
          ref={(component) => { trap.component = component; }} 
          setHighlight={(uuid: string, highlight: boolean) => { this.setHighlight(uuid, highlight); }}
          highlight={true}
          key={'trap-hl-' + trap.uuid}
        />);

        highlightedImages.push(<><image
            className={`trap-image ${TrapClasses[colorToInt(trap.color)]}`}
            href={SpellData[trap.spellId].sfx}
            x={root.x + cellWidth * ((1 - (sizeCoef * 1.2)) / 2)}
            y={root.y + celHeight * ((1 - (sizeCoef * 1.2)) / 2)}
            width={cellWidth * sizeCoef * 1.2}
            height={celHeight * sizeCoef * 1.2}
            key={trap.uuid}
            ref={(component) => { trap.imgComponent = component; } } />
            <text className='trap-text' x={root.x} y={root.y}>{this.props.traps.length - i}</text>
          </>);
      }
    }

    return [
      <g key='g-1' className="tiles">
        {this.props.rows}
      </g>,
      <g key='g-2' className="traps">
        {traps}
        <g className="trap-images">
          {trapImages}
        </g>
        <g className="trap-highlighted">
          {highlightedTraps}
          <g className="trap-highlighted-images">
            {highlightedImages}
          </g>
        </g>
      </g>
    ];
  }
}

export default CellLayerComponent;
