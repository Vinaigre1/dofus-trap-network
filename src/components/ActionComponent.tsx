import * as React from "react";
import "@assets/scss/Spells.scss";
import { ActionType, EffectType, TrapClasses } from "@src/enums";
import Action from "@classes/Action";
import { Trans } from "react-i18next";
import { colorToInt } from "@src/utils/utils";

type Props = {
  type: ActionType;
  action: Action;
};

type States = {
  highlighted: boolean;
};

class ActionComponent extends React.Component<Props, States>
{
  constructor(props: Props) {
    super(props);

    this.state = {
      highlighted: false
    };
  }

  onMouseEnter() {
    this.props.action?.originTrap?.component?.setHighlight(true);
  }

  onMouseLeave() {
    this.props.action?.originTrap?.component?.setHighlight(false);
  }

  setHighlight(highlight: boolean) {
    this.setState((state) => {
      return { ...state, highlighted: highlight };
    });
  }

  render() {
    const actionClasses = {
      [ActionType.Waiting]: "waiting",
      [ActionType.Current]: "current",
      [ActionType.Completed]: "completed"
    };

    const actionTexts = {
      [EffectType.Push]: <Trans count={this.props.action.value}>Pushes back {{ value: this.props.action.value }} cells</Trans>,
      [EffectType.Pull]: <Trans count={this.props.action.value}>Attracts {{ value: this.props.action.value }} cells</Trans>,
      [EffectType.WaterDamage]: <Trans count={this.props.action.value}>{{ value: this.props.action.value }} water damage</Trans>,
      [EffectType.FireDamage]: <Trans count={this.props.action.value}>{{ value: this.props.action.value }} fire damage</Trans>,
      [EffectType.EarthDamage]: <Trans count={this.props.action.value}>{{ value: this.props.action.value }} earth damage</Trans>,
      [EffectType.AirDamage]: <Trans count={this.props.action.value}>{{ value: this.props.action.value }} air damage</Trans>,
      [EffectType.PushDamage]: <Trans count={this.props.action.value}>{{ value: this.props.action.value }} push damage</Trans>,
      [EffectType.IndirectPushDamage]: <Trans count={this.props.action.value}>{{ value: this.props.action.value }} push damage (indirect)</Trans>,
      [EffectType.SpellAsTarget]: <Trans count={this.props.action.effect.min}>Spell {{ value: this.props.action.effect.min }} as target</Trans>,
      [EffectType.SpellAsCaster]: <Trans count={this.props.action.effect.min}>Spell {{ value: this.props.action.effect.min }} as caster</Trans>,
      [EffectType.State]: <Trans count={this.props.action.effect.min}>Add state {{ value: this.props.action.effect.min }}</Trans>,
      [EffectType.RemoveState]: <Trans count={this.props.action.effect.min}>Remove state {{ value: this.props.action.effect.min }}</Trans>
    };

    return (
      <div className={`action ${actionClasses[this.props.type]} ${this.state.highlighted ? 'highlighted' : ''} action-${TrapClasses[colorToInt(this.props.action.originTrap.color)]} ${this.props.action.passedMask ? '' : 'masked'}`} onMouseEnter={() => { this.onMouseEnter(); }} onMouseLeave={() => { this.onMouseLeave(); }} >
        <div className="action-img">
          <img src={this.props.action.originTrap.getSpellIcon()} alt="" width="25px" height="25px" />
        </div>
        <div className="action-infos">
          {actionTexts[this.props.action.type] ?? `type =  ${this.props.action.type}, value = ${this.props.action.value}`}
        </div>
      </div>
    );
  }
}

export default ActionComponent;
