import Game from "@classes/Game";
import * as React from "react";
import "@assets/scss/History.scss";
import ActionComponent from "./ActionComponent";
import { ActionType } from "@src/enums";

type Props = {
};

class HistoryComponent extends React.Component<Props>
{
  render() {
    const actions = Game.getActionStack();
    const actionComponents: Array<JSX.Element> = [];

    for (let i: number = actions.waiting.length - 1; i >= 0; i--) {
      actionComponents.push(<ActionComponent
        type={ActionType.Waiting}
        action={actions.waiting[i]}
        key={actions.waiting[i].uuid}
      />);
    }

    if (actions.current) {
      actionComponents.push(<ActionComponent
        type={ActionType.Current}
        action={actions.current}
        key={actions.current.uuid}
      />);
    }

    for (let i: number = actions.completed.length - 1; i >= 0; i--) {
      actionComponents.push(<ActionComponent
        type={ActionType.Completed}
        action={actions.completed[i]}
        key={actions.completed[i].uuid}
      />);
    }

    return <div className="relative-height history">{actionComponents}</div>;
  }
}

export default HistoryComponent;
