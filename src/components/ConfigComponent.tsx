import Entity from "@classes/Entity";
import Trap from "@classes/Trap";
import { Team } from "@src/enums";
import * as React from "react";

type Props = {
  configObj: Entity | Trap;
};

class ConfigComponent extends React.Component<Props>
{
  onChange(e) {
    // Disable change while playing
    console.log(e);
  }

  render() {
    if (this.props.configObj instanceof Entity) {
      return <div>
        <div className="entity-infos">
          <div className="image">
            <img src={this.props.configObj.data.image} alt="" />
          </div>
          <div className="team">
            <img src={this.props.configObj.team === Team.Attacker ? "./assets/img/other/attacker.svg" : "./assets/img/other/defender.svg"} />
            <span>{this.props.configObj.data.name}</span>
          </div>
        </div>
        <div>{this.props.configObj.initialPos.x}, {this.props.configObj.initialPos.y}</div>
        <div>{this.props.configObj.pos.x}, {this.props.configObj.pos.y}</div>
        {/* États */}
        {/* Effets déclenchés */}
        {/* Stats */}
      </div>;
    } else if (this.props.configObj instanceof Trap) {
      return <div></div>;
    }

    return <div></div>;
  }
}

export default ConfigComponent;
