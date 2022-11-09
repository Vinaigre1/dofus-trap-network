import Game from "@classes/Game";
import { EntityData, Team } from "@src/enums";
import * as React from "react";

type Props = {
  x: number;
  y: number;
  team: Team;
  data: EntityData;
};

class EntityComponent extends React.Component<Props>
{
  constructor(props) {
    super(props);
  }

  render() {
    let cellWidth: number = 100 / (Game.width + 0.5);
    let cellHeight: number = cellWidth / 2;

    let width: number = 200 / (Game.width * 2 + (Game.width > 1 ? 1 : 0)) * this.props.data.defaultScale;
    let height: number = width; // Square image with transparent padding

    let root = {
      x: this.props.x * cellWidth + (this.props.y % 2 === 0 ? 0 : cellWidth / 2),
      y: this.props.y * cellHeight / 2
    };

    return (
      <g>
        <ellipse
          className={`entityCircle ${this.props.team === Team.Attacker ? "attacker" : "defender"}`}
          cx={root.x + cellWidth / 2}
          cy={root.y + cellHeight / 2}
          rx={cellWidth * 0.3}
          ry={cellHeight * 0.3}
        />
        <image
          className="entity"
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