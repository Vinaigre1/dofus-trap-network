import Game from "@classes/Game";
import * as React from "react";
import "@assets/scss/History.scss";
import ActionComponent from "./ActionComponent";
import { ActionType, EffectCategory } from "@src/enums";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

type State = {
  hiddenEffects: { [key: number]: boolean };
};

class HistoryComponent extends React.Component<Props, State>
{
  constructor(props: Props) {
    super(props);

    this.state = {
      hiddenEffects: {
        [EffectCategory.Meta]: false,
        [EffectCategory.Movement]: false,
        [EffectCategory.Damage]: false,
        [EffectCategory.State]: false,
        [EffectCategory.Secondary]: false,
        [EffectCategory.Spell]: false,
      }
    };
  }

  onFilter(filter: EffectCategory) {
    this.setState((state) => ({
      ...state,
      hiddenEffects: {
        ...state.hiddenEffects,
        [filter]: !state.hiddenEffects[filter]
      }
    }));
  }

  render() {
    const actions = Game.getActionStack();
    const actionComponents: Array<JSX.Element> = [];
    const hiddenEffectClasses = {
      [EffectCategory.Meta]: "no-meta",
      [EffectCategory.Movement]: "no-movement",
      [EffectCategory.Damage]: "no-damage",
      [EffectCategory.State]: "no-state",
      [EffectCategory.Secondary]: "no-secondary",
      [EffectCategory.Spell]: "no-spell",
    };

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

    const additionalClasses: Array<string> = [];
    for (const [key, value] of Object.entries(this.state.hiddenEffects)) {
      if (value) {
        additionalClasses.push(hiddenEffectClasses[key]);
      }
    }

    return (
      <div className={`relative-height history ${additionalClasses.join(' ')}`}>
        <div className="actions">
          {actionComponents}
        </div>
        <div className="filters">
          <button className={this.state.hiddenEffects[EffectCategory.Damage] ? "active" : ""} onClick={() => { this.onFilter(EffectCategory.Damage); }}><img src="./assets/img/actions/damage.svg" alt="damage" /></button>
          <button className={this.state.hiddenEffects[EffectCategory.Movement] ? "active" : ""} onClick={() => { this.onFilter(EffectCategory.Movement); }}><img src="./assets/img/actions/movement.svg" alt="movement" /></button>
          <button className={this.state.hiddenEffects[EffectCategory.Secondary] ? "active" : ""} onClick={() => { this.onFilter(EffectCategory.Secondary); }}><img src="./assets/img/actions/secondary.svg" alt="secondary" /></button>
          <button className={this.state.hiddenEffects[EffectCategory.State] ? "active" : ""} onClick={() => { this.onFilter(EffectCategory.State); }}><img src="./assets/img/actions/state.svg" alt="state" /></button>
          <button className={this.state.hiddenEffects[EffectCategory.Spell] ? "active" : ""} onClick={() => { this.onFilter(EffectCategory.Spell); }}><img src="./assets/img/actions/spell.svg" alt="spell" /></button>
        </div>
      </div>
    );
  }
}

export default HistoryComponent;
