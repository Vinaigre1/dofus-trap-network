import * as React from "react";
import "@assets/scss/Spells.scss";
import { ActionType, EffectType } from "@src/enums";
import Action from "@classes/Action";
import { Trans } from "react-i18next";

type Props = {
  type: ActionType;
  action: Action;
};

class ActionComponent extends React.Component<Props>
{
  constructor(props: Props) {
    super(props);
  }

  render() {
    const actionClasses = {
      [ActionType.Waiting]: "waiting",
      [ActionType.Current]: "current",
      [ActionType.Completed]: "completed"
    };

    const actionNames = {
      [EffectType.Push]: <Trans>Push</Trans>,
      [EffectType.Pull]: <Trans>Attraction</Trans>,
      [EffectType.WaterDamage]: <Trans>Water damage</Trans>,
      [EffectType.FireDamage]: <Trans>Fire damage</Trans>,
      [EffectType.EarthDamage]: <Trans>Earth damage</Trans>,
      [EffectType.AirDamage]: <Trans>Air damage</Trans>,
      [EffectType.PushDamage]: <Trans>Push damage</Trans>,
      [EffectType.IndirectPushDamage]: <Trans>Indirect push damage</Trans>
    };

    return <div className={`action ${actionClasses[this.props.type]}`}>
      <div className="action-img">
        <img src={this.props.action.spellIcon} alt="" />
      </div>
      <div className="action-infos">
        <div className="action-type">
          {actionNames[this.props.action.type] ?? `Unknown type: ${this.props.action.type}`}
        </div>
        <div className="action-value">
          <Trans>Value: {{ value: this.props.action.value }}</Trans>
        </div>
      </div>
    </div>;
  }
}

export default ActionComponent;
