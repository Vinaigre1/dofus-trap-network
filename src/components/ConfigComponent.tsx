import Entity from "@classes/Entity";
import Trap from "@classes/Trap";
import { Stats, Team } from "@src/enums";
import * as React from "react";
import { Trans } from "react-i18next";

type Props = {
  configObj: Entity | Trap;
};

type State = {
  entity: Stats;
}

class ConfigComponent extends React.Component<Props, State>
{
  constructor(props: Props) {
    super(props);

    if (this.props.configObj instanceof Entity) {
      this.state = {
        entity: this.props.configObj.stats
      };
    }
  }

  onChange(key: string, value: string) {
    // TODO: prevent modifying when simulation is playing
    const parsed: number = value.length === 0 ? 0 : parseInt(value);
    if (isNaN(parsed)) return;
    this.setState((state) => {
      const new_state = state;
      switch (key) {
        case 'str':       new_state.entity.strength = parsed; break;
        case 'cha':       new_state.entity.chance = parsed; break;
        case 'int':       new_state.entity.intelligence = parsed; break;
        case 'agi':       new_state.entity.agility = parsed; break;
        case 'power':     new_state.entity.power = parsed; break;
        case 'trap':      new_state.entity.powerTrap = parsed; break;
        case 'damage':    new_state.entity.damage = parsed; break;
        case 'daNeutral': new_state.entity.damageNeutral = parsed; break;
        case 'daEarth':   new_state.entity.damageEarth = parsed; break;
        case 'daWater':   new_state.entity.damageWater = parsed; break;
        case 'daFire':    new_state.entity.damageFire = parsed; break;
        case 'daAir':     new_state.entity.damageAir = parsed; break;
        case 'daTrap':    new_state.entity.damageTrap = parsed; break;
        case 'daPush':    new_state.entity.damagePush = parsed; break;
        case 'ranged':    new_state.entity.damageRanged = parsed; break;
        case 'melee':     new_state.entity.damageMelee = parsed; break;
        case 'spell':     new_state.entity.damageSpell = parsed; break;
        default: break;
      }
      return new_state;
    });
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
        <h3><Trans>Offensive characteristics</Trans></h3>
        <ul className="offensive-stats">
          <li><img src="./assets/img/characteristics/tx_strength.png" alt="" /><span><Trans>Strength</Trans></span><input onChange={(e) => { this.onChange('str', e.target.value); }} type="number" value={this.state.entity.strength} /></li>
          <li><img src="./assets/img/characteristics/tx_chance.png" alt="" /><span><Trans>Chance</Trans></span><input onChange={(e) => { this.onChange('cha', e.target.value); }} type="number" value={this.state.entity.chance} disabled /></li>
          <li><img src="./assets/img/characteristics/tx_intelligence.png" alt="" /><span><Trans>Intelligence</Trans></span><input onChange={(e) => { this.onChange('int', e.target.value); }} type="number" value={this.state.entity.intelligence} /></li>
          <li><img src="./assets/img/characteristics/tx_agility.png" alt="" /><span><Trans>Agility</Trans></span><input onChange={(e) => { this.onChange('agi', e.target.value); }} type="number" value={this.state.entity.agility} /></li>
          <li><img src="./assets/img/characteristics/tx_damagesPercent.png" alt="" /><span><Trans>Power</Trans></span><input onChange={(e) => { this.onChange('power', e.target.value); }} type="number" value={this.state.entity.power} /></li>
          <li><img src="./assets/img/characteristics/tx_trapPercent.png" alt="" /><span><Trans>Trap Power</Trans></span><input onChange={(e) => { this.onChange('trap', e.target.value); }} type="number" value={this.state.entity.powerTrap} /></li>
          <hr />
          <li><img src="./assets/img/characteristics/tx_damage.png" alt="" /><span><Trans>Damage</Trans></span><input onChange={(e) => { this.onChange('damage', e.target.value); }} type="number" value={this.state.entity.damage} /></li>
          <li><img src="" alt="" /><span><Trans>Neutral da.</Trans></span><input onChange={(e) => { this.onChange('daNeutral', e.target.value); }} type="number" value={this.state.entity.damageNeutral} /></li>
          <li><img src="" alt="" /><span><Trans>Earth da.</Trans></span><input onChange={(e) => { this.onChange('daEarth', e.target.value); }} type="number" value={this.state.entity.damageEarth} /></li>
          <li><img src="" alt="" /><span><Trans>Water da.</Trans></span><input onChange={(e) => { this.onChange('daWater', e.target.value); }} type="number" value={this.state.entity.damageWater} /></li>
          <li><img src="" alt="" /><span><Trans>Fire da.</Trans></span><input onChange={(e) => { this.onChange('daFire', e.target.value); }} type="number" value={this.state.entity.damageFire} /></li>
          <li><img src="" alt="" /><span><Trans>Air da.</Trans></span><input onChange={(e) => { this.onChange('daAir', e.target.value); }} type="number" value={this.state.entity.damageAir} /></li>
          <li><img src="./assets/img/characteristics/tx_trap.png" alt="" /><span><Trans>Trap da.</Trans></span><input onChange={(e) => { this.onChange('daTrap', e.target.value); }} type="number" value={this.state.entity.damageTrap} /></li>
          <li><img src="./assets/img/characteristics/tx_push.png" alt="" /><span><Trans>Push da.</Trans></span><input onChange={(e) => { this.onChange('daPush', e.target.value); }} type="number" value={this.state.entity.damagePush} /></li>
          <hr />
          <li><img src="" alt="" /><span><Trans>Ranged %</Trans></span><input onChange={(e) => { this.onChange('ranged', e.target.value); }} type="number" value={this.state.entity.damageRanged} /></li>
          <li><img src="" alt="" /><span><Trans>Melee %</Trans></span><input onChange={(e) => { this.onChange('melee', e.target.value); }} type="number" value={this.state.entity.damageMelee} /></li>
          <li><img src="" alt="" /><span><Trans>Spell %</Trans></span><input onChange={(e) => { this.onChange('spell', e.target.value); }} type="number" value={this.state.entity.damageSpell} /></li>
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
