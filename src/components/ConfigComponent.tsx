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
          <div className="team-name">
            <div className="team">
              <img src={this.props.configObj.team === Team.Attacker ? "./assets/img/other/attacker.svg" : "./assets/img/other/defender.svg"} />
            </div>
            <span>{this.props.configObj.data.name}</span>
          </div>
        </div>
        <div className="health">
          <img className="hp-full" src="./assets/img/other/icon_hp_full.png" alt="Life" />
          <img style={{ height: 50 * (1 - healthPercent) }} className="hp-empty" src="./assets/img/other/icon_hp_empty.png" alt="Life" />
          <span className="hp-current">{this.props.configObj.currentHealth}</span>
          <span className="hp-max">{this.props.configObj.health}</span>
        </div>
        <div className="offensive-stats">
          <ul>
            <li><img src="./assets/img/characteristics/strength.svg" alt="" /><span>Strength</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/chance.svg" alt="" /><span>Chance</span><input type="number" value="0" disabled /></li>
            <li><img src="./assets/img/characteristics/intelligence.svg" alt="" /><span>intelligence</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/agility.svg" alt="" /><span>agility</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/power.svg" alt="" /><span>power</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/trap_power.svg" alt="" /><span>powerTrap</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/damage.svg" alt="" /><span>damage</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/earth_damage.svg" alt="" /><span>damageEarth</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/water_damage.svg" alt="" /><span>damageWater</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/fire_damage.svg" alt="" /><span>damageFire</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/air_damage.svg" alt="" /><span>damageAir</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/neutral_damage.svg" alt="" /><span>damageNeutral</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/push_damage.svg" alt="" /><span>damagePush</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/trap_damage.svg" alt="" /><span>damageTrap</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/ranged_damage.svg" alt="" /><span>damageRanged</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/melee_damage.svg" alt="" /><span>damageMelee</span><input type="number" value="0" /></li>
            <li><img src="./assets/img/characteristics/spell_damage.svg" alt="" /><span>damageSpell</span><input type="number" value="0" /></li>
          </ul>
        </div>
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
