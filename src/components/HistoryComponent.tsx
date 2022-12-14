import Game from "@classes/Game";
import * as React from "react";
import "@assets/scss/History.scss";
import ActionComponent from "./ActionComponent";
import { ActionType } from "@src/enums";

class HistoryComponent extends React.Component
{
  render() {
    const actions = Game.getActionStack();
    const actionComponents: Array<JSX.Element> = [];

    for (let i: number = 0; i < actions.waiting.length; i++) {
      actionComponents.push(<ActionComponent
        type={ActionType.Waiting}
        action={actions.waiting[i]}
        key={actions.waiting[i].uuid}
        ref={(component) => { if (actions.waiting[i]) actions.waiting[i].component = component; }}
      />);
    }

    if (actions.current) {
      actionComponents.push(<ActionComponent
        type={ActionType.Current}
        action={actions.current}
        key={actions.current.uuid}
        ref={(component) => { if (actions.current) actions.current.component = component; }}
      />);
    }

    for (let i: number = actions.completed.length - 1; i >= 0; i--) {
      actionComponents.push(<ActionComponent
        type={ActionType.Completed}
        action={actions.completed[i]}
        key={actions.completed[i].uuid}
        ref={(component) => { if (actions.completed[i]) actions.completed[i].component = component; }}
      />);
    }

    return <div className="relative-height history">{actionComponents}</div>;
  }
}

export default HistoryComponent;
