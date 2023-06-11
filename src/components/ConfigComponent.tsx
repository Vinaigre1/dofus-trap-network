import Entity from "@classes/Entity";
import Game from "@classes/Game";
import Trap from "@classes/Trap";
import { DefensiveStats, OffensiveStats, Team } from "@src/enums";
import * as React from "react";
import { Trans } from "react-i18next";

type Props = {
  configObj: Entity | Trap;
};

type State = {
  entity: {
    off: OffensiveStats;
    def: DefensiveStats;
    moving: boolean;
    health: {
      shield: number;
      max: number;
      current: number;
      initial: {
        shield: number;
        max: number;
        current: number;
      }
    }
  }
}

class ConfigComponent extends React.Component<Props, State>
{
  constructor(props: Props) {
    super(props);

    if (this.props.configObj instanceof Entity) {
      this.state = {
        entity: {
          off: this.props.configObj.offensiveStats,
          def: this.props.configObj.defensiveStats,
          moving: false,
          health: this.props.configObj.health
        }
      };
    }
  }

  onChange(key: string, value: string) {
    if (Game.isRunning) return;

    const parsed: number = value.length === 0 ? 0 : parseInt(value);
    if (isNaN(parsed)) return;
    this.setState((state) => {
      const new_state = state;
      switch (key) {
        case 'shield':
          new_state.entity.health.shield = Math.min(state.entity.health.initial.max, Math.max(0, parsed));
          new_state.entity.health.initial.shield = new_state.entity.health.shield;
          break;
        case 'maxHealth':
          new_state.entity.health.max = Math.max(1, parsed);
          new_state.entity.health.initial.max = new_state.entity.health.max;
          if (new_state.entity.health.max < new_state.entity.health.current) {
            new_state.entity.health.current = new_state.entity.health.max;
            new_state.entity.health.initial.current = new_state.entity.health.max;
          }
          if (new_state.entity.health.max < new_state.entity.health.shield) {
            new_state.entity.health.shield = new_state.entity.health.max;
            new_state.entity.health.initial.shield = new_state.entity.health.max;
          }
          break;
        case 'currentHealth':
          new_state.entity.health.current = Math.max(1, parsed);
          new_state.entity.health.initial.current = new_state.entity.health.current;
          if (new_state.entity.health.current > new_state.entity.health.max) {
            new_state.entity.health.max = new_state.entity.health.current;
            new_state.entity.health.initial.max = new_state.entity.health.current;
          }
          break;
        case 'str':        new_state.entity.off.strength = parsed; break;
        case 'cha':        new_state.entity.off.chance = parsed; break;
        case 'int':        new_state.entity.off.intelligence = parsed; break;
        case 'agi':        new_state.entity.off.agility = parsed; break;
        case 'power':      new_state.entity.off.power = parsed; break;
        case 'trap':       new_state.entity.off.powerTrap = parsed; break;
        case 'damage':     new_state.entity.off.damage = parsed; break;
        case 'daNeutral':  new_state.entity.off.damageNeutral = parsed; break;
        case 'daEarth':    new_state.entity.off.damageEarth = parsed; break;
        case 'daWater':    new_state.entity.off.damageWater = parsed; break;
        case 'daFire':     new_state.entity.off.damageFire = parsed; break;
        case 'daAir':      new_state.entity.off.damageAir = parsed; break;
        case 'daTrap':     new_state.entity.off.damageTrap = parsed; break;
        case 'daPush':     new_state.entity.off.damagePush = parsed; break;
        case 'ranged':     new_state.entity.off.damageRanged = parsed; break;
        case 'melee':      new_state.entity.off.damageMelee = parsed; break;
        case 'spell':      new_state.entity.off.damageSpell = parsed; break;
        case 'final':      new_state.entity.off.damageFinal = parsed; break;
        case 'neutral':    new_state.entity.def.neutral = parsed; break;
        case 'earth':      new_state.entity.def.earth = parsed; break;
        case 'water':      new_state.entity.def.water = parsed; break;
        case 'fire':       new_state.entity.def.fire = parsed; break;
        case 'air':        new_state.entity.def.air = parsed; break;
        case 'resNeutral': new_state.entity.def.resistanceNeutral = parsed; break;
        case 'resEarth':   new_state.entity.def.resistanceEarth = parsed; break;
        case 'resWater':   new_state.entity.def.resistanceWater = parsed; break;
        case 'resFire':    new_state.entity.def.resistanceFire = parsed; break;
        case 'resAir':     new_state.entity.def.resistanceAir = parsed; break;
        case 'resPush':    new_state.entity.def.resistancePush = parsed; break;
        case 'rangedRes':  new_state.entity.def.resistanceRanged = parsed; break;
        case 'meleeRes':   new_state.entity.def.resistanceMelee = parsed; break;
        case 'spellRes':   new_state.entity.def.resistanceSpell = parsed; break;
        default: break;
      }
      return new_state;
    });
  }

  onMoveBtnClick() {
    if (Game.isRunning) return;

    const moving: boolean = !this.state.entity.moving;
    this.setState((state) => {
      return {
        ...state,
        entity: {
          ...state.entity,
          moving
        }
      };
    });

    if (moving && this.props.configObj instanceof Entity) {
      Game.setMovingEntity(this.props.configObj);
    } else {
      Game.setMovingEntity(null);
    }
  }

  render() {
    if (this.props.configObj instanceof Entity) {
      const healthPercent = Math.max(0, Math.min(1, this.props.configObj.health.current / (this.props.configObj.health.max <= 0 ? 1 : this.props.configObj.health.max)));
      return <div>
        <div className="entity-infos">
          <div className={`image team-${this.props.configObj.team === Team.Attacker ? 'red' : 'blue'}`}>
            <img src={this.props.configObj.data.image} alt="" />
          </div>
          <div className="base-infos">
            <span><Trans>{this.props.configObj.data.name}</Trans></span>
            <div className="health">
              {this.state.entity.health.shield > 0 ?
                (<>
                  <img className="armor" src="./assets/img/other/icon_armor.png" alt="Armor" />
                  <img className="hp-full" src="./assets/img/other/icon_shield_full.png" alt="Shield" />
                  <span className="shield">{Math.floor(this.props.configObj.health.shield)}</span>
                </>) :
                <img className="hp-full" src="./assets/img/other/icon_hp_full.png" alt="Life" />
              }
              <img style={{ height: 50 * (1 - healthPercent) }} className="hp-empty" src="./assets/img/other/icon_hp_empty.png" alt="Life" />
              <span className="hp-current">{Math.floor(this.props.configObj.health.current)}</span>
              <span className="hp-max">{this.props.configObj.health.max}</span>
            </div>
            <div className={`btn-move ${this.state.entity.moving ? 'active' : ''}`} onClick={() => { this.onMoveBtnClick(); }}><Trans>Move</Trans></div>
          </div>
        </div>
        <ul className="offensive-stats">
          <li><img src="./assets/img/characteristics/tx_shield.png" alt="" /><span><Trans>Shield</Trans></span><input onChange={(e) => { this.onChange('shield', e.target.value); }} type="number" value={this.state.entity.health.initial.shield} /></li>
          <li><img src="./assets/img/characteristics/tx_vitality.png" alt="" /><span><Trans>Max HP</Trans></span><input onChange={(e) => { this.onChange('maxHealth', e.target.value); }} type="number" value={this.state.entity.health.initial.max} /></li>
          <li><img src="./assets/img/characteristics/tx_vitality.png" alt="" /><span><Trans>Current HP</Trans></span><input onChange={(e) => { this.onChange('currentHealth', e.target.value); }} type="number" value={this.state.entity.health.initial.current} /></li>
        </ul>
        <h3><Trans>Offensive characteristics</Trans></h3>
        <ul className="offensive-stats">
          <li><img src="./assets/img/characteristics/tx_strength.png" alt="" /><span><Trans>Strength</Trans></span><input onChange={(e) => { this.onChange('str', e.target.value); }} type="number" value={this.state.entity.off.strength} /></li>
          <li><img src="./assets/img/characteristics/tx_intelligence.png" alt="" /><span><Trans>Intelligence</Trans></span><input onChange={(e) => { this.onChange('int', e.target.value); }} type="number" value={this.state.entity.off.intelligence} /></li>
          <li><img src="./assets/img/characteristics/tx_chance.png" alt="" /><span><Trans>Chance</Trans></span><input onChange={(e) => { this.onChange('cha', e.target.value); }} type="number" value={this.state.entity.off.chance} /></li>
          <li><img src="./assets/img/characteristics/tx_agility.png" alt="" /><span><Trans>Agility</Trans></span><input onChange={(e) => { this.onChange('agi', e.target.value); }} type="number" value={this.state.entity.off.agility} /></li>
          <li><img src="./assets/img/characteristics/tx_damagesPercent.png" alt="" /><span><Trans>Power</Trans></span><input onChange={(e) => { this.onChange('power', e.target.value); }} type="number" value={this.state.entity.off.power} /></li>
          <li><img src="./assets/img/characteristics/tx_trapPercent.png" alt="" /><span><Trans>Trap Power</Trans></span><input onChange={(e) => { this.onChange('trap', e.target.value); }} type="number" value={this.state.entity.off.powerTrap} /></li>
          <hr />
          <li><img src="./assets/img/characteristics/tx_damage.png" alt="" /><span><Trans>Damage</Trans></span><input onChange={(e) => { this.onChange('damage', e.target.value); }} type="number" value={this.state.entity.off.damage} /></li>
          <li><img src="" alt="" /><span><Trans>Neutral da.</Trans></span><input onChange={(e) => { this.onChange('daNeutral', e.target.value); }} type="number" value={this.state.entity.off.damageNeutral} /></li>
          <li><img src="" alt="" /><span><Trans>Earth da.</Trans></span><input onChange={(e) => { this.onChange('daEarth', e.target.value); }} type="number" value={this.state.entity.off.damageEarth} /></li>
          <li><img src="" alt="" /><span><Trans>Fire da.</Trans></span><input onChange={(e) => { this.onChange('daFire', e.target.value); }} type="number" value={this.state.entity.off.damageFire} /></li>
          <li><img src="" alt="" /><span><Trans>Water da.</Trans></span><input onChange={(e) => { this.onChange('daWater', e.target.value); }} type="number" value={this.state.entity.off.damageWater} /></li>
          <li><img src="" alt="" /><span><Trans>Air da.</Trans></span><input onChange={(e) => { this.onChange('daAir', e.target.value); }} type="number" value={this.state.entity.off.damageAir} /></li>
          <li><img src="./assets/img/characteristics/tx_trap.png" alt="" /><span><Trans>Trap da.</Trans></span><input onChange={(e) => { this.onChange('daTrap', e.target.value); }} type="number" value={this.state.entity.off.damageTrap} /></li>
          <li><img src="./assets/img/characteristics/tx_push.png" alt="" /><span><Trans>Push da.</Trans></span><input onChange={(e) => { this.onChange('daPush', e.target.value); }} type="number" value={this.state.entity.off.damagePush} /></li>
          <hr />
          <li><img src="" alt="" /><span><Trans>Ranged %</Trans></span><input onChange={(e) => { this.onChange('ranged', e.target.value); }} type="number" value={this.state.entity.off.damageRanged} /></li>
          <li><img src="" alt="" /><span><Trans>Melee %</Trans></span><input onChange={(e) => { this.onChange('melee', e.target.value); }} type="number" value={this.state.entity.off.damageMelee} /></li>
          <li><img src="" alt="" /><span><Trans>Spell %</Trans></span><input onChange={(e) => { this.onChange('spell', e.target.value); }} type="number" value={this.state.entity.off.damageSpell} /></li>
          <li><img src="" alt="" /><span><Trans>Final %</Trans></span><input onChange={(e) => { this.onChange('final', e.target.value); }} type="number" value={this.state.entity.off.damageFinal} /></li>
        </ul>
        <h3><Trans>Defensive characteristics</Trans></h3>
        <ul className="offensive-stats">
          <li><img src="./assets/img/characteristics/tx_neutral.png" alt="" /><span><Trans>Neutral %</Trans></span><input onChange={(e) => { this.onChange('neutral', e.target.value); }} type="number" value={this.state.entity.def.neutral} /></li>
          <li><img src="./assets/img/characteristics/tx_strength.png" alt="" /><span><Trans>Earth %</Trans></span><input onChange={(e) => { this.onChange('earth', e.target.value); }} type="number" value={this.state.entity.def.earth} /></li>
          <li><img src="./assets/img/characteristics/tx_intelligence.png" alt="" /><span><Trans>Fire %</Trans></span><input onChange={(e) => { this.onChange('fire', e.target.value); }} type="number" value={this.state.entity.def.fire} /></li>
          <li><img src="./assets/img/characteristics/tx_chance.png" alt="" /><span><Trans>Water %</Trans></span><input onChange={(e) => { this.onChange('water', e.target.value); }} type="number" value={this.state.entity.def.water} /></li>
          <li><img src="./assets/img/characteristics/tx_agility.png" alt="" /><span><Trans>Air %</Trans></span><input onChange={(e) => { this.onChange('air', e.target.value); }} type="number" value={this.state.entity.def.air} /></li>
          <hr />
          <li><img src="" alt="" /><span><Trans>Neutral res.</Trans></span><input onChange={(e) => { this.onChange('resNeutral', e.target.value); }} type="number" value={this.state.entity.def.resistanceNeutral} /></li>
          <li><img src="" alt="" /><span><Trans>Earth res.</Trans></span><input onChange={(e) => { this.onChange('resEarth', e.target.value); }} type="number" value={this.state.entity.def.resistanceEarth} /></li>
          <li><img src="" alt="" /><span><Trans>Fire res.</Trans></span><input onChange={(e) => { this.onChange('resFire', e.target.value); }} type="number" value={this.state.entity.def.resistanceFire} /></li>
          <li><img src="" alt="" /><span><Trans>Water res.</Trans></span><input onChange={(e) => { this.onChange('resWater', e.target.value); }} type="number" value={this.state.entity.def.resistanceWater} /></li>
          <li><img src="" alt="" /><span><Trans>Air res.</Trans></span><input onChange={(e) => { this.onChange('resAir', e.target.value); }} type="number" value={this.state.entity.def.resistanceAir} /></li>
          <li><img src="./assets/img/characteristics/tx_push.png" alt="" /><span><Trans>Push res.</Trans></span><input onChange={(e) => { this.onChange('resPush', e.target.value); }} type="number" value={this.state.entity.def.resistancePush} /></li>
          <hr />
          <li><img src="" alt="" /><span><Trans>Ranged res. %</Trans></span><input onChange={(e) => { this.onChange('rangedRes', e.target.value); }} type="number" value={this.state.entity.def.resistanceRanged} /></li>
          <li><img src="" alt="" /><span><Trans>Melee res. %</Trans></span><input onChange={(e) => { this.onChange('meleeRes', e.target.value); }} type="number" value={this.state.entity.def.resistanceMelee} /></li>
          <li><img src="" alt="" /><span><Trans>Spell res. %</Trans></span><input onChange={(e) => { this.onChange('spellRes', e.target.value); }} type="number" value={this.state.entity.def.resistanceSpell} /></li>
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
