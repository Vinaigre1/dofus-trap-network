import * as React from "react";
import "@assets/scss/Spells.scss";
import SpellComponent from "@components/SpellComponent";
import _SpellData from "@json/Spells.json";
import { Spell, SpellDataType } from "@src/@types/SpellDataType";
import { SpellCategory } from "@src/enums";
import Game from "@classes/Game";

const SpellData: SpellDataType = _SpellData as unknown as SpellDataType;

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
};

type States = {
  selectedSpell: Spell;
  play: boolean;
};

class SpellsComponent extends React.Component<Props, States>
{
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedSpell: undefined,
      play: false
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

  onPlay() {
    Game.run();
    this.setState((state) => {
      return {
        ...state,
        play: true
      };
    });
  }

  onPause() {
    Game.pause();
    this.setState((state) => {
      return {
        ...state,
        play: false
      };
    });
  }

  onStep() {
    Game.runOne();
    this.setState((state) => {
      return {
        ...state,
        play: false
      };
    });
  }

  onStop() {
    Game.resetAll();
    this.setState((state) => {
      return {
        ...state,
        play: false
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
        <button className={this.state.play ? "pause" : "play"} onClick={() => { this.state.play ? this.onPause() : this.onPlay(); }}>
          <img className="img-play" src="./assets/img/other/play.png" alt="play" draggable="false" />
          <img className="img-pause" src="./assets/img/other/pause.png" alt="pause" draggable="false" />
        </button>
        <button className="step" onClick={() => { this.onStep(); }}>
          <img className="img-step" src="./assets/img/other/step.png" alt="step" draggable="false" />
        </button>
        <button className="stop" onClick={() => { this.onStop(); }}>
          <img className="img-stop" src="./assets/img/other/stop.png"  alt="stop" draggable="false" />
        </button>
      </div>
    </div>;
  }
}

export default SpellsComponent;
