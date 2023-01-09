import * as React from "react";
import "@assets/scss/Spells.scss";
import { ActionType, EffectCategory, EffectType, EffectTypeCategory, StateName, TrapClasses } from "@src/enums";
import Action from "@classes/Action";
import { Trans } from "react-i18next";
import { colorToInt } from "@src/utils/utils";
import SpellData from "@json/Spells";

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
    this.props.action?.target?.component?.setHighlight(true);
  }

  onMouseLeave() {
    this.props.action?.originTrap?.component?.setHighlight(false);
    this.props.action?.target?.component?.setHighlight(false);
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

    const effectClasses = {
      [EffectCategory.Meta]: "effect-meta",
      [EffectCategory.Movement]: "effect-movement",
      [EffectCategory.Damage]: "effect-damage",
      [EffectCategory.State]: "effect-state",
      [EffectCategory.Secondary]: "effect-secondary",
      [EffectCategory.Spell]: "effect-spell",
    };

    const actionTexts = {
      [EffectType.Pull]: { count: this.props.action.value, text: <>Attracts {{ value: this.props.action.value }} cells</> },
      [EffectType.Push]: { count: this.props.action.value, text: <>Pushes back {{ value: this.props.action.value }} cells</> },
      [EffectType.WaterDamage]: { count: this.props.action.value, text: <>{{ value: this.props.action.value }} water damage</> },
      [EffectType.FireDamage]: { count: this.props.action.value, text: <>{{ value: this.props.action.value }} fire damage</> },
      [EffectType.EarthDamage]: { count: this.props.action.value, text: <>{{ value: this.props.action.value }} earth damage</> },
      [EffectType.AirDamage]: { count: this.props.action.value, text: <>{{ value: this.props.action.value }} air damage</> },
      [EffectType.PushDamage]: { count: this.props.action.value, text: <>{{ value: this.props.action.value }} push damage</> },
      [EffectType.IndirectPushDamage]: { count: this.props.action.value, text: <>{{ value: this.props.action.value }} push damage (indirect)</> },
      [EffectType.SpellAsTarget]: { text: <>Spell &apos;{{ value: SpellData[this.props.action.effect.min]?.name }}&apos; casted as target</> },
      [EffectType.SpellAsCaster]: { text: <>Spell &apos;{{ value: SpellData[this.props.action.effect.min]?.name }}&apos; casted as caster</> },
      [EffectType.State]: { text: <>Add state &apos;{{ value: StateName[this.props.action.effect.min] }}&apos;</> },
      [EffectType.RemoveState]: { text: <>Remove state &apos;{{ value: StateName[this.props.action.effect.min] }}&apos;</> },
    };

    return (
      <div className={`action ${actionClasses[this.props.type]} ${effectClasses[EffectTypeCategory[this.props.action.type]]} ${this.state.highlighted ? 'highlighted' : ''} action-${TrapClasses[colorToInt(this.props.action.originTrap.color)]} ${this.props.action.passedMask ? '' : 'masked'}`} onMouseEnter={() => { this.onMouseEnter(); }} onMouseLeave={() => { this.onMouseLeave(); }} >
        <div className="action-img">
          <img src={this.props.action.originTrap.getSpellIcon()} alt="" width="25px" height="25px" />
        </div>
        <div className="action-infos">
          {actionTexts[this.props.action.type]
        ? <Trans count={actionTexts[this.props.action.type].count}>{actionTexts[this.props.action.type].text.props.children}</Trans>
        : `type =  ${this.props.action.type}, value = ${this.props.action.value}`}
        </div>
      </div>
    );
  }
}

export default ActionComponent;
