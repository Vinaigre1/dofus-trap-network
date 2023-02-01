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
      const healthPercent = (this.props.configObj.currentHealth / (this.props.configObj.health <= 0 ? 1 : this.props.configObj.health));
      return <div>
        <div className="entity-infos">
          <div className={`image team-${this.props.configObj.team === Team.Attacker ? 'red' : 'blue'}`}>
            <img src={this.props.configObj.data.image} alt="" />
          </div>
          <div className="base-infos">
            <span>{this.props.configObj.data.name}</span>
            <div className="health">
              <img className="hp-full" src="./assets/img/other/icon_hp_full.png" alt="Life" />
              <img style={{ height: 50 * (1 - healthPercent) }} className="hp-empty" src="./assets/img/other/icon_hp_empty.png" alt="Life" />
              <span className="hp-current">{Math.floor(this.props.configObj.currentHealth)}</span>
              <span className="hp-max">{this.props.configObj.health}</span>
            </div>
          </div>
        </div>
        <ul className="offensive-stats">
          <li><img src="./assets/img/characteristics/tx_strength.png" alt="" /><span>Strength</span><input type="number" value="0" /></li>
          <li><img src="./assets/img/characteristics/tx_chance.png" alt="" /><span>Chance</span><input type="number" value="0" disabled /></li>
          <li><img src="./assets/img/characteristics/tx_intelligence.png" alt="" /><span>Intelligence</span><input type="number" value="0" /></li>
          <li><img src="./assets/img/characteristics/tx_agility.png" alt="" /><span>Agility</span><input type="number" value="0" /></li>
          <li><img src="./assets/img/characteristics/tx_damagesPercent.png" alt="" /><span>Power</span><input type="number" value="0" /></li>
          <li><img src="./assets/img/characteristics/tx_trapPercent.png" alt="" /><span>Trap Power</span><input type="number" value="0" /></li>
          <hr />
          <li><img src="./assets/img/characteristics/tx_damage.png" alt="" /><span>Damage</span><input type="number" value="0" /></li>
          <li><img src="" alt="" /><span>Neutral da.</span><input type="number" value="0" /></li>
          <li><img src="" alt="" /><span>Earth da.</span><input type="number" value="0" /></li>
          <li><img src="" alt="" /><span>Water da.</span><input type="number" value="0" /></li>
          <li><img src="" alt="" /><span>Fire da.</span><input type="number" value="0" /></li>
          <li><img src="" alt="" /><span>Air da.</span><input type="number" value="0" /></li>
          <li><img src="./assets/img/characteristics/tx_trap.png" alt="" /><span>Trap da.</span><input type="number" value="0" /></li>
          <li><img src="./assets/img/characteristics/tx_push.png" alt="" /><span>Push da.</span><input type="number" value="0" /></li>
          <hr />
          <li><img src="" alt="" /><span>Ranged %</span><input type="number" value="0" /></li>
          <li><img src="" alt="" /><span>Melee %</span><input type="number" value="0" /></li>
          <li><img src="" alt="" /><span>Spell %</span><input type="number" value="0" /></li>
        </ul>
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
