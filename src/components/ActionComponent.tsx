import * as React from "react";
import "@assets/scss/Spells.scss";
import { ActionType } from "@src/enums";
import Action from "@classes/Action";
import { Trans } from "react-i18next";

type Props = {
  type: ActionType;
  action: Action;
};

class ActionComponent extends React.Component<Props>
{
  constructor(props) {
    super(props);
  }

  render() {
    const actionClasses = {
      [ActionType.Waiting]: "waiting",
      [ActionType.Current]: "current",
      [ActionType.Completed]: "completed"
    };

    return <div className={`action ${actionClasses[this.props.type]}`}>
      <Trans>
        Action: {{action: this.props.action.type}}; Value: {{value: this.props.action.value}}
      </Trans>
    </div>;
  }
}

export default ActionComponent;
