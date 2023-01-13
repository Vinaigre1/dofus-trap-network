import { Stats } from "@src/enums";
import * as React from "react";

type Props = {
  config: Stats;
};

class ConfigComponent extends React.Component<Props>
{
  onChange(e) {
    console.log(e);
  }

  render() {
    const items: Array<JSX.Element> = [];
    
    items.push(<li>vitality: <input type="number" defaultValue={this.props.config.vitality} onChange={(e) => { this.onChange(e); }} /></li>);
    items.push(<li>agility: {this.props.config.agility}</li>);
    items.push(<li>strength: {this.props.config.strength}</li>);

    return <ul>
      {items}
    </ul>;
  }
}

export default ConfigComponent;
