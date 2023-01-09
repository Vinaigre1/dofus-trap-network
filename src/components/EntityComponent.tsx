import Entity from "@classes/Entity";
import Game from "@classes/Game";
import { AreaType, Coordinates, Team } from "@src/enums";
import { isInArea } from "@src/utils/mapUtils";
import * as React from "react";

type Props = {
  entity: Entity;
};

type States = {
  animX: number;
  animY: number;
  display: boolean;
  highlight: boolean;
}

class EntityComponent extends React.Component<Props, States>
{
  transitionCounter: number;

  constructor(props: Props) {
    super(props);

    this.state ={
      animX: undefined,
      animY: undefined,
      display: true,
      highlight: false
    };
    this.transitionCounter = 0;
  }

  show() {
    this.setState((state) => {
      return { ...state, display: true }
    });
  }

  hide() {
    this.setState((state) => {
      return { ...state, display: false }
    });
  }

  /**
   * Moves an element on the screen.
   * *toPos* is used to know how many coordinates are changed
   * at the end of the css animation.
   * 
   * @param {Coordinates} fromPos Starting position
   * @param {Coordinates} toPos Ending position
   */
  move(fromPos: Coordinates, toPos: Coordinates) {
    this.transitionCounter = 2;
    if (isInArea(fromPos, { type: AreaType.Diagonal, min: 0, max: 40 }, toPos)) {
      this.transitionCounter = 1;
    }

    this.setState({
      animX: toPos.x,
      animY: toPos.y
    });
  }

  /**
   * Function triggered when a css transition of the entity circle ends.
   */
  onTransitionEnd() {
    if (this.transitionCounter <= 1) {
      this.setState({
        animX: undefined,
        animY: undefined
      });
      Game.onEntityTransitionEnd();
    } else {
      this.transitionCounter--;
    }
  }

  setHighlight(highlight: boolean) {
    this.setState((state) => ({ ...state, highlight }));
  }

  render() {
    if (!this.state.display) return;

    const cellWidth: number = 100 / (Game.width + 0.5);
    const cellHeight: number = cellWidth / 2;

    const width: number = 200 / (Game.width * 2 + (Game.width > 1 ? 1 : 0)) * this.props.entity.data.defaultScale;
    const height: number = width; // Square image with transparent padding

    const root: Coordinates = {
      x: (this.state.animX ?? this.props.entity.pos.x) * cellWidth + ((this.state.animY ?? this.props.entity.pos.y) % 2 === 0 ? 0 : cellWidth / 2),
      y: (this.state.animY ?? this.props.entity.pos.y) * cellHeight / 2
    };

    return (
      <g className={`entity ${this.props.entity.team === Team.Attacker ? "attacker" : "defender"} ${this.state.highlight ? "highlighted" : ""}`}>
        <ellipse
          className="entity-circle"
          cx={root.x + cellWidth / 2}
          cy={root.y + cellHeight / 2}
          rx={cellWidth * 0.3}
          ry={cellHeight * 0.3}
          onTransitionEnd={() => { this.onTransitionEnd() }}
        />
        <image
          className="entity-image"
          href={this.props.entity.data.image}
          x={root.x - width / 2 + cellWidth / 2 + this.props.entity.data.offsetX * cellWidth}
          y={root.y  - height + cellHeight * 0.75 + this.props.entity.data.offsetY * cellHeight}
          width={width}
          height={height}
        />
      </g>
    );
  }
}

export default EntityComponent
