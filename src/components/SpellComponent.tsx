import * as React from "react";
import "@assets/scss/Spells.scss";
import { Spell } from "@src/@types/SpellDataType";
import Game from "@classes/Game";

type Props = {
  spell: Spell
};

class SpellComponent extends React.Component<Props>
{
  onClick() {
    Game.selectSpell(this.props.spell);
  }

  render() {
    return <div className="spell" onClick={() => { this.onClick(); }}>
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
