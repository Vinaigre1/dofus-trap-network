import Entity from "@classes/Entity";
import Game from "@classes/Game";
import { Area, Coordinates, EntityData, Team } from "@src/enums";
import { isInArea } from "@src/utils/mapUtils";
import * as React from "react";

type Props = {
  entity: Entity;
};

type States = {
  animX: number;
  animY: number;
  display: boolean;
}

class EntityComponent extends React.Component<Props, States>
{
  transitionCounter: number;

  constructor(props: Props) {
    super(props);

    this.state ={
      animX: undefined,
      animY: undefined,
      display: true
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
    if (isInArea(fromPos, Area.Diagonal, toPos, 40)) {
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
      Game.triggerStack();
    } else {
      this.transitionCounter--;
    }
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
      <g className="entity">
        <ellipse
          className={`entity-circle ${this.props.entity.team === Team.Attacker ? "attacker" : "defender"}`}
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

{/* <image class="monster" width="73.0995966490847" height="73.0995966490847" x="372.42320819112626" y="304.7098976109215" transform="translate(-36.50613228048402, -65.07989472541111)" xlink:href="/asset/dofensive/monsters/4321"></image> */}