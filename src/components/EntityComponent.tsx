import Game from "@classes/Game";
import { Area, Coordinates, EntityData, Team } from "@src/enums";
import { isInArea } from "@src/utils/mapUtils";
import * as React from "react";

type Props = {
  x: number;
  y: number;
  team: Team;
  data: EntityData;
};

type States = {
  animX: number;
  animY: number;
  mounted: boolean;
}

class EntityComponent extends React.Component<Props, States>
{
  transitionCounter: number;

  constructor(props: Props) {
    super(props);

    this.state ={
      animX: undefined,
      animY: undefined,
      mounted: false
    };
    this.transitionCounter = 0;
  }

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

  onTransitionEnd(event) {
    console.log(this.transitionCounter);
    if (this.transitionCounter <= 1) {
      Game.triggerStack();
    } else {
      this.transitionCounter--;
    }
  }

  render() {
    const cellWidth: number = 100 / (Game.width + 0.5);
    const cellHeight: number = cellWidth / 2;

    const width: number = 200 / (Game.width * 2 + (Game.width > 1 ? 1 : 0)) * this.props.data.defaultScale;
    const height: number = width; // Square image with transparent padding

    const root: Coordinates = {
      x: (this.state.animX ?? this.props.x) * cellWidth + ((this.state.animY ?? this.props.y) % 2 === 0 ? 0 : cellWidth / 2),
      y: (this.state.animY ?? this.props.y) * cellHeight / 2
    };

    return (
      <g className="entity">
        <ellipse
          className={`entity-circle ${this.props.team === Team.Attacker ? "attacker" : "defender"}`}
          cx={root.x + cellWidth / 2}
          cy={root.y + cellHeight / 2}
          rx={cellWidth * 0.3}
          ry={cellHeight * 0.3}
          onTransitionEnd={(event) => { this.onTransitionEnd(event) }}
        />
        <image
          className="entity-image"
          href={this.props.data.image}
          x={root.x - width / 2 + cellWidth / 2 + this.props.data.offsetX * cellWidth}
          y={root.y  - height + cellHeight * 0.75 + this.props.data.offsetY * cellHeight}
          width={width}
          height={height}
        />
      </g>
    );
  }
}

export default EntityComponent

{/* <image class="monster" width="73.0995966490847" height="73.0995966490847" x="372.42320819112626" y="304.7098976109215" transform="translate(-36.50613228048402, -65.07989472541111)" xlink:href="/asset/dofensive/monsters/4321"></image> */}