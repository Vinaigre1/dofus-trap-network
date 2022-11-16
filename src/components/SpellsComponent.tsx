import * as React from "react";
import "@assets/scss/Spells.scss";
import SpellComponent from "@components/SpellComponent";
import _SpellData from "@json/Spells.json";
import { SpellDataType } from "@src/@types/SpellDataType";
import { SpellCategory } from "@src/enums";
import Game from "@classes/Game";

const SpellData: SpellDataType = _SpellData as unknown as SpellDataType;

type Props = {
};

class SpellsComponent extends React.Component<Props>
{
  render() {
    const spellCategories: Array<JSX.Element> = [];

    const categoryOrder: Array<SpellCategory> = [
      SpellCategory.AirTrap,
      SpellCategory.FireTrap,
      SpellCategory.EarthTrap,
      SpellCategory.WaterTrap,
      SpellCategory.MalusTrap,
      SpellCategory.Summon,
      SpellCategory.Other
    ];

    for (const cat of categoryOrder) {
      const spells: Array<JSX.Element> = [];
      for (const type in SpellData) {
        console.log(SpellData[type].category, cat);
        if (SpellData[type].category !== cat) continue;

        spells.push(<SpellComponent
          key={`spell-${type}`}
          spell={SpellData[type]}
        />);
      }
      spellCategories.push(
        <div className="spell-category">
          {spells}
        </div>
      );
    }

    return <div className="spells">
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
