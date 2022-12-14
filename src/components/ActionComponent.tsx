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
      [EffectType.Push]: <Trans count={this.props.action.value as number}>Pushes back {{ value: this.props.action.value as number }} cells</Trans>,
      [EffectType.Pull]: <Trans count={this.props.action.value as number}>Attracts {{ value: this.props.action.value as number }} cells</Trans>,
      [EffectType.WaterDamage]: <Trans count={this.props.action.value as number}>{{ value: this.props.action.value as number }} water damage</Trans>,
      [EffectType.FireDamage]: <Trans count={this.props.action.value as number}>{{ value: this.props.action.value as number }} fire damage</Trans>,
      [EffectType.EarthDamage]: <Trans count={this.props.action.value as number}>{{ value: this.props.action.value as number }} earth damage</Trans>,
      [EffectType.AirDamage]: <Trans count={this.props.action.value as number}>{{ value: this.props.action.value as number }} air damage</Trans>,
      [EffectType.PushDamage]: <Trans count={this.props.action.value as number}>{{ value: this.props.action.value as number }} push damage</Trans>,
      [EffectType.IndirectPushDamage]: <Trans count={this.props.action.value as number}>{{ value: this.props.action.value as number }} push damage (indirect)</Trans>
    };

    return (
      <div className={`action ${actionClasses[this.props.type]} ${this.state.highlighted ? 'highlighted' : ''} action-${TrapClasses[colorToInt(this.props.action.originTrap.color)]}`} onMouseEnter={() => { this.onMouseEnter(); }} onMouseLeave={() => { this.onMouseLeave(); }} >
        <div className="action-img">
          <img src={this.props.action.originTrap.getSpellIcon()} alt="" width="25px" height="25px" />
        </div>
        <div className="action-infos">
          {actionTexts[this.props.action.type] ?? `?? Value = ${this.props.action.value}`}
        </div>
      </div>
    );
  }
}

export default ActionComponent;
