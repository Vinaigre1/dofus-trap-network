import * as React from "react";
import "@assets/scss/Spells.scss";
import SpellComponent from "@components/SpellComponent";
import _SpellData from "@json/Spells.json";
import { Spell, SpellDataType } from "@src/@types/SpellDataType";
import { SpellCategory } from "@src/enums";
import Game from "@classes/Game";

const SpellData: SpellDataType = _SpellData as unknown as SpellDataType;

type Props = {
};

type States = {
  selectedSpell: Spell;
}

class SpellsComponent extends React.Component<Props, States>
{
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedSpell: undefined
    };
  }

  onClick(spell: Spell) {
    Game.selectSpell(spell);
    this.setState((state) => {
      return {
        ...state,
        selectedSpell: spell
      };
    });
  }

  render() {
    const spellCategories: Array<JSX.Element> = [];

    const categoryOrder: Array<SpellCategory> = [
      SpellCategory.AirTrap,
      SpellCategory.FireTrap,
      SpellCategory.EarthTrap,
      SpellCategory.WaterTrap,
      SpellCategory.MalusTrap,
      SpellCategory.Summon,
      SpellCategory.Other,
      SpellCategory.Action
    ];

    for (const cat of categoryOrder) {
      const spells: Array<JSX.Element> = [];
      for (const type in SpellData) {
        if (SpellData[type].category !== cat) continue;

        spells.push(<SpellComponent
          key={`spell-${type}`}
          spell={SpellData[type]}
          onClick={(spell: Spell) => { this.onClick(spell); }}
          selected={this.state.selectedSpell?.name === SpellData[type].name}
        />);
      }
      spellCategories.push(
        <div className="spell-category">
          {spells}
        </div>
      );
    }

    return <div className="spells">
      <div className="spells-padding"></div>
      {spellCategories}
      <div className="controls">
        <button onClick={() => { Game.run(); }}>play</button>
        <button onClick={() => { Game.runOne(); }}>step</button>
        <button onClick={() => { Game.pause(); }}>pause</button>
        <button onClick={() => { Game.resetAll(); }}>stop</button>
      </div>
    </div>;
  }
}

export default SpellsComponent;
