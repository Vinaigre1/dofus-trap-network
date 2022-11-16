import * as React from "react";
import "@assets/scss/Spells.scss";
import { Spell } from "@src/@types/SpellDataType";

type Props = {
  spell: Spell;
  onClick: Function;
  selected: boolean;
};

class SpellComponent extends React.Component<Props>
{
  render() {
    return <div className={`spell ${this.props.selected ? "selected-spell" : ""}`} onClick={() => { this.props.onClick(this.props.spell); }}>
      <img
        width="45"
        height="45"
        src={this.props.spell.icon}
        alt={this.props.spell.name}
      />
    </div>;
  }
}

export default SpellComponent;
